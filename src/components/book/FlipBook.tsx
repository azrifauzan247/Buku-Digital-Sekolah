"use client";

import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { bookPages } from "@/components/pages";
import type { BookSize } from "@/hooks/useBookSize";
import { BookPage } from "./BookPage";

export type FlipBookHandle = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
};

type Props = {
  size: BookSize;
  current: number;
  startPage: number;
  onPageChange: (index: number) => void;
  onFlipStart: () => void;
};

type PageFlipApi = {
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  flip: (page: number, corner?: "top" | "bottom") => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
  getState: () => string;
};

const TOTAL = bookPages.length;

/**
 * Buku flip realistik berasaskan StPageFlip (react-pageflip).
 * - Desktop: dua halaman, kulit hadapan & belakang tunggal (hard cover).
 * - Mudah alih: satu halaman, sokong leret & ketik.
 */
export const FlipBook = forwardRef<FlipBookHandle, Props>(function FlipBook({ size, current, startPage, onPageChange, onFlipStart }, ref) {
  const bookRef = useRef<{ pageFlip: () => PageFlipApi | undefined } | null>(null);
  const api = () => bookRef.current?.pageFlip();

  useImperativeHandle(ref, () => ({
    next: () => api()?.flipNext("bottom"),
    prev: () => api()?.flipPrev("bottom"),
    goTo: (index: number) => {
      const pf = api();
      if (!pf) return;
      const target = Math.max(0, Math.min(TOTAL - 1, index));
      if (target === pf.getCurrentPageIndex()) return;
      pf.flip(target, "bottom");
    },
  }));

  // Penting: anak & prop stabil supaya StPageFlip tidak dimuat semula pada setiap render.
  const pages = useMemo(
    () =>
      bookPages.map((p) => (
        <BookPage key={p.id} density={p.density} className={p.density === "hard" ? "--cover" : undefined}>
          {p.render()}
        </BookPage>
      )),
    [],
  );

  const { pageWidth: w, pageHeight: h, spread, scale } = size;
  const blockWidth = spread ? w * 2 : w;
  const bookStyle = useMemo(() => ({ width: blockWidth, height: h }), [blockWidth, h]);

  // StPageFlip mengabaikan ketikan pantas pada skrin sentuh — kesan ketikan sendiri.
  const tapRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return (tapRef.current = null);
    const t = e.touches[0];
    tapRef.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = tapRef.current;
    tapRef.current = null;
    if (!start || (e.target as HTMLElement).closest("button, a")) return;
    const t = e.changedTouches[0];
    const moved = Math.hypot(t.clientX - start.x, t.clientY - start.y);
    if (moved > 12 || Date.now() - start.t > 240) return;
    const pf = bookRef.current?.pageFlip();
    if (!pf || pf.getState() !== "read") return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    if (t.clientX - rect.left > rect.width / 2) pf.flipNext("bottom");
    else pf.flipPrev("bottom");
  }, []);

  const handleFlip = useCallback((e: { data: number }) => onPageChange(e.data), [onPageChange]);
  const handleState = useCallback(
    (e: { data: string }) => {
      if (e.data === "flipping") onFlipStart();
    },
    [onFlipStart],
  );

  // Kedudukan: buku tertutup dipusatkan, buku terbuka di tengah.
  const last = TOTAL - 1;
  const closedFront = spread && current === 0;
  const closedBack = spread && current === last;
  const shift = closedFront ? -w / 2 : closedBack ? w / 2 : 0;

  // Ketebalan helaian di kiri/kanan (ilusi 3D)
  const readSheets = Math.min(4, Math.ceil(current / 2));
  const remainingSheets = Math.min(4, Math.ceil((last - current) / 2));
  const stackLeft = spread ? (closedFront ? 0 : readSheets) : 0;
  const stackRight = spread ? (closedBack ? 0 : remainingSheets) : Math.min(3, Math.ceil((last - current) / 3));

  const baseLeft = closedFront ? w : 0;
  const baseRight = closedBack ? w : 0;

  return (
    <div
      className="book-shift relative"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ width: blockWidth, height: h, transform: `translateX(${shift}px)`, ["--page-scale" as string]: scale }}>
      {/* Lapisan helaian (ketebalan buku) */}
      {Array.from({ length: stackRight }).map((_, i) => (
        <div
          key={`r${i}`}
          className="page-stack"
          style={{ left: spread ? w + (i + 1) * 1.6 : (i + 1) * 1.8, top: (i + 1) * 1.1, width: w, height: h, zIndex: -1 - i }}
        />
      ))}
      {Array.from({ length: stackLeft }).map((_, i) => (
        <div key={`l${i}`} className="page-stack" style={{ left: -(i + 1) * 1.6, top: (i + 1) * 1.1, width: w, height: h, zIndex: -1 - i }} />
      ))}
      <div className="book-base" style={{ left: baseLeft, right: baseRight, zIndex: -10 }} />

      <HTMLFlipBook
        ref={bookRef}
        className="flip-book"
        style={bookStyle}
        width={w}
        height={h}
        size="fixed"
        minWidth={200}
        maxWidth={1200}
        minHeight={280}
        maxHeight={1700}
        startPage={startPage}
        drawShadow
        maxShadowOpacity={0.45}
        flippingTime={900}
        usePortrait={!spread}
        startZIndex={2}
        autoSize={false}
        showCover
        mobileScrollSupport={false}
        clickEventForward
        useMouseEvents
        swipeDistance={24}
        showPageCorners
        disableFlipByClick={false}
        renderOnlyPageLengthChange
        onFlip={handleFlip}
        onChangeState={handleState}
      >
        {pages}
      </HTMLFlipBook>
    </div>
  );
});
