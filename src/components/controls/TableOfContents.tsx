"use client";

import { useEffect } from "react";
import { Home, Maximize, Minimize, X, ZoomIn } from "lucide-react";
import { DEMO_NOTICE, pages, programme, school, ui } from "@/data/programme";
import { cn, pad2 } from "@/lib/book";
import { isVisible } from "./ControlBar";

type Props = {
  open: boolean;
  current: number;
  spread: boolean;
  onClose: () => void;
  onGoTo: (index: number) => void;
  onZoom: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

/** Panel Isi Kandungan dengan navigasi terus ke halaman. */
export function TableOfContents({ open, current, spread, onClose, onGoTo, onZoom, isFullscreen, onToggleFullscreen }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={ui.contents}>
      <button type="button" className="fade-in absolute inset-0 bg-[#050d1c]/60 backdrop-blur-[2px]" onClick={onClose} aria-label={ui.close} />
      <aside className="slide-in-right absolute top-0 right-0 flex h-full w-full max-w-[380px] flex-col border-l border-gold/30 bg-gradient-to-b from-darkblue to-navy text-ivory shadow-2xl">
        <header className="relative px-6 pt-6 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full text-ivory/70 hover:bg-white/10 hover:text-ivory"
            aria-label={ui.close}
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <img src={school.logo} alt="" className="h-11 w-11" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold-light">{school.shortName}</div>
              <h2 className="font-display text-2xl font-bold">{ui.contents}</h2>
            </div>
          </div>
          <p className="mt-3 font-display text-[13px] italic text-gold-light/90">{programme.fullTitle}</p>
          <div className="gold-rule mt-4" />
        </header>

        <ol className="flex-1 overflow-y-auto px-3 pb-4">
          {pages.map((p, i) => {
            const active = isVisible(i, current, spread);
            return (
              <li key={p.number}>
                <button
                  type="button"
                  onClick={() => {
                    onGoTo(i);
                    onClose();
                  }}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-left transition",
                    active ? "bg-gold/15" : "hover:bg-white/5",
                  )}
                >
                  <span className={cn("w-8 font-display text-xl font-bold tabular-nums", active ? "text-gold" : "text-gold/60 group-hover:text-gold")}>
                    {pad2(p.number)}
                  </span>
                  <span className="min-w-0 flex-1 border-b border-dashed border-white/10 pb-1.5">
                    <span className="block truncate text-[14.5px] font-medium text-ivory">{p.title}</span>
                    <span className="block truncate text-[11.5px] text-ivory/50">{p.subtitle}</span>
                  </span>
                  {active && <span className="h-2 w-2 rotate-45 bg-gold" />}
                </button>
              </li>
            );
          })}
        </ol>

        <footer className="border-t border-white/10 px-6 py-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onGoTo(0);
                onClose();
              }}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-gold/50 text-[13px] font-medium text-gold-light hover:bg-gold/10"
            >
              <Home size={16} /> {ui.cover}
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onZoom();
              }}
              className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-gold text-[13px] font-semibold text-navy hover:bg-gold-light"
            >
              <ZoomIn size={16} /> Mod bacaan
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onToggleFullscreen();
            }}
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 text-[13px] text-ivory/85 hover:bg-white/5"
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />} {isFullscreen ? ui.exitFullscreen : ui.fullscreen}
          </button>
          <p className="mt-3 text-center text-[10.5px] text-ivory/40">{DEMO_NOTICE}</p>
        </footer>
      </aside>
    </div>
  );
}
