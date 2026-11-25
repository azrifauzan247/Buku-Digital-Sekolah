"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { bookPages } from "@/components/pages";
import { pages, ui } from "@/data/programme";
import { BASE_PAGE_HEIGHT, BASE_PAGE_WIDTH, pad2 } from "@/lib/book";

type Props = {
  open: boolean;
  startIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Mod bacaan: memaparkan satu halaman dengan saiz lebih besar dan boleh
 * ditatal — memudahkan pembacaan teks pada telefon kecil.
 */
export function ReaderModal({ open, startIndex, onClose, onNavigate }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    const measure = () => setWidth(Math.min(window.innerWidth - 24, 760));
    measure();
    window.addEventListener("resize", measure);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(bookPages.length - 1, i + 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  const scale = width / BASE_PAGE_WIDTH;
  const page = bookPages[index];
  const close = () => {
    onNavigate(index);
    onClose();
  };

  return (
    <div className="fade-in fixed inset-0 z-[56] flex flex-col bg-[#050d1c]/95 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Mod bacaan">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 pt-[max(8px,env(safe-area-inset-top))] pb-2 text-ivory sm:px-5">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-30"
          aria-label={ui.previous}
        >
          <ChevronLeft size={22} />
        </button>
        <div className="min-w-0 text-center">
          <div className="text-[10px] uppercase tracking-[0.25em] text-gold-light">Mod Bacaan • {ui.page} {pad2(index + 1)}</div>
          <div className="truncate font-display text-[15px]">{pages[index].title}</div>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(bookPages.length - 1, i + 1))}
            disabled={index === bookPages.length - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-30"
            aria-label={ui.next}
          >
            <ChevronRight size={22} />
          </button>
          <button type="button" onClick={close} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label={ui.close}>
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overscroll-contain py-4">
        <div
          key={index}
          className="fade-in relative mx-auto overflow-hidden rounded-[4px] shadow-2xl"
          style={{ width, height: BASE_PAGE_HEIGHT * scale, ["--page-scale" as string]: scale }}
        >
          <div className="page-canvas" style={{ width: BASE_PAGE_WIDTH, height: BASE_PAGE_HEIGHT }}>
            {page.render()}
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-ivory/40">Tatal untuk membaca • Tutup untuk kembali ke buku</p>
      </div>
    </div>
  );
}
