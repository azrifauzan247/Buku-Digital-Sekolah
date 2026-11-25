"use client";

import { useEffect, useState } from "react";
import { BASE_PAGE_WIDTH, PAGE_RATIO } from "@/lib/book";

export type BookSize = {
  pageWidth: number;
  pageHeight: number;
  /** true = paparan dua halaman (desktop / tablet landskap) */
  spread: boolean;
  scale: number;
  isMobile: boolean;
  /** Ruang dikhaskan untuk bar atas & bar kawalan */
  chromeTop: number;
  chromeBottom: number;
  ready: boolean;
};

const INITIAL: BookSize = {
  pageWidth: 360,
  pageHeight: 512,
  spread: false,
  scale: 1,
  isMobile: true,
  chromeTop: 56,
  chromeBottom: 84,
  ready: false,
};

/** Kira saiz halaman supaya buku muat sepenuhnya dalam skrin tanpa limpahan. */
export function computeBookSize(vw: number, vh: number, immersive: boolean): BookSize {
  const isMobile = vw < 768;
  const shortScreen = vh < 560;
  const chromeTop = immersive ? 10 : isMobile || shortScreen ? 52 : 64;
  const chromeBottom = isMobile || shortScreen ? 78 : 92;
  const gutterX = isMobile ? 10 : 40;
  const gutterY = isMobile ? 8 : 16;
  const availW = Math.max(200, vw - gutterX * 2);
  const availH = Math.max(240, vh - chromeTop - chromeBottom - gutterY * 2);

  const singleW = Math.min(availW, availH / PAGE_RATIO);
  const spreadW = Math.min((availW - 24) / 2, availH / PAGE_RATIO);
  // Dua halaman hanya jika skrin cukup lebar dan halaman masih selesa dibaca.
  const spread = vw >= 820 && vw > vh * 1.05 && spreadW >= 280;

  const pageWidth = Math.floor(spread ? spreadW : singleW);
  const pageHeight = Math.floor(pageWidth * PAGE_RATIO);
  return { pageWidth, pageHeight, spread, scale: pageWidth / BASE_PAGE_WIDTH, isMobile, chromeTop, chromeBottom, ready: true };
}

export function useBookSize(immersive: boolean) {
  const [size, setSize] = useState<BookSize>(INITIAL);

  useEffect(() => {
    let timer: number | undefined;
    const measure = () => setSize(computeBookSize(window.innerWidth, window.innerHeight, immersive));
    measure();
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 180);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [immersive]);

  return size;
}
