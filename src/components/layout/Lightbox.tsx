"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery, ui } from "@/data/programme";
import { pad2 } from "@/lib/book";

type Props = {
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/** Paparan foto galeri bersaiz penuh, sokong leret & kekunci anak panah. */
export function Lightbox({ index, onClose, onChange }: Props) {
  const total = gallery.items.length;
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % total);
      if (e.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onChange, total]);

  if (index === null) return null;
  const item = gallery.items[index];

  return (
    <div
      className="fade-in fixed inset-0 z-[55] flex flex-col items-center justify-center bg-[#050d1c]/92 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) onChange(dx < 0 ? (index + 1) % total : (index - 1 + total) % total);
        touchX.current = null;
      }}
    >
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label={ui.close} />
      <button
        type="button"
        onClick={onClose}
        className="absolute top-[max(16px,env(safe-area-inset-top))] right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-ivory hover:bg-white/20"
        aria-label={ui.close}
      >
        <X size={22} />
      </button>

      <figure key={index} className="pop-in relative z-[1] w-full max-w-[880px]">
        <div className="overflow-hidden rounded-lg border-[6px] border-ivory bg-ivory shadow-2xl">
          <img src={item.src} alt={item.caption} className="aspect-[4/3] max-h-[70dvh] w-full object-contain" />
        </div>
        <figcaption className="mt-4 flex items-center justify-between gap-3 text-ivory">
          <div>
            <div className="font-display text-lg sm:text-xl">{item.caption}</div>
            <div className="text-[12px] text-ivory/50">
              {item.year} • {gallery.note}
            </div>
          </div>
          <div className="font-display text-gold tabular-nums">
            {pad2(index + 1)} / {pad2(total)}
          </div>
        </figcaption>
      </figure>

      <div className="relative z-[1] mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => onChange((index - 1 + total) % total)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-ivory hover:bg-white/10"
          aria-label="Foto sebelum"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => onChange((index + 1) % total)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-ivory hover:bg-white/10"
          aria-label="Foto seterusnya"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
