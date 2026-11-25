"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Home, List, Maximize, Minimize, ZoomIn } from "lucide-react";
import { MusicControl } from "@/components/audio/MusicControl";
import { pages, ui } from "@/data/programme";
import { cn, pad2 } from "@/lib/book";

type Props = {
  current: number;
  spread: boolean;
  compact: boolean;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onHome: () => void;
  onGoTo: (index: number) => void;
  onToggleToc: () => void;
  onZoom: () => void;
  onToggleFullscreen: () => void;
};

const TOTAL = pages.length;

export function pageLabel(current: number, spread: boolean) {
  if (!spread || current === 0 || current === TOTAL - 1) return pad2(current + 1);
  const left = current % 2 === 1 ? current : current - 1;
  return `${pad2(left + 1)}–${pad2(Math.min(TOTAL, left + 2))}`;
}

export function ControlBar(props: Props) {
  const { current, spread, compact, isFullscreen } = props;
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const atStart = current === 0;
  const atEnd = current >= TOTAL - 1;

  useEffect(() => {
    if (!pickerOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!pickerRef.current?.contains(e.target as Node)) setPickerOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [pickerOpen]);

  const iconBtn = "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ivory/85 transition hover:bg-white/10 hover:text-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ivory/85";

  return (
    <nav
      className="glass rise-in pointer-events-auto flex items-center gap-0.5 rounded-full px-1.5 py-1 sm:gap-1 sm:px-2"
      aria-label="Kawalan buku"
      style={{ animationDelay: "0.4s" }}
    >
      {!compact && (
        <button type="button" className={iconBtn} onClick={props.onHome} disabled={atStart} aria-label={ui.cover} title={ui.cover}>
          <Home size={18} />
        </button>
      )}
      <button type="button" className={iconBtn} onClick={props.onPrev} disabled={atStart} aria-label={ui.previous} title={`${ui.previous} (←)`}>
        <ChevronLeft size={22} />
      </button>

      <div ref={pickerRef} className="relative">
        <button
          type="button"
          onClick={() => setPickerOpen((v) => !v)}
          className={cn("flex h-11 items-center", compact ? "min-w-[78px] px-2.5" : "min-w-[92px] px-3", "justify-center gap-1.5 rounded-full border border-gold/30 bg-navy/60 font-display text-ivory transition hover:border-gold/70")}
          aria-label={`${ui.goToPage} — sekarang ${pageLabel(current, spread)} daripada ${TOTAL}`}
          aria-expanded={pickerOpen}
        >
          <span className="text-[15px] font-semibold tabular-nums text-gold">{pageLabel(current, spread)}</span>
          <span className="text-[12px] text-ivory/50">/ {pad2(TOTAL)}</span>
        </button>
        {pickerOpen && (
          <div className="popover pop-in absolute bottom-[calc(100%+14px)] left-1/2 w-[244px] -translate-x-1/2 rounded-2xl p-3">
            <div className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">{ui.goToPage}</div>
            <div className="grid grid-cols-4 gap-1.5">
              {pages.map((p, i) => (
                <button
                  key={p.number}
                  type="button"
                  title={p.title}
                  onClick={() => {
                    props.onGoTo(i);
                    setPickerOpen(false);
                  }}
                  className={cn(
                    "h-10 rounded-lg font-display text-[14px] font-semibold tabular-nums transition",
                    isVisible(i, current, spread) ? "bg-gold text-navy" : "bg-white/5 text-ivory hover:bg-white/15",
                  )}
                >
                  {pad2(p.number)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button type="button" className={iconBtn} onClick={props.onNext} disabled={atEnd} aria-label={ui.next} title={`${ui.next} (→)`}>
        <ChevronRight size={22} />
      </button>

      <span className="mx-0.5 h-6 w-px bg-white/15 sm:mx-1" aria-hidden />

      <MusicControl compact={compact} />
      {!compact && (
        <button type="button" className={iconBtn} onClick={props.onZoom} aria-label="Mod bacaan (besarkan teks)" title="Mod bacaan (besarkan teks)">
          <ZoomIn size={18} />
        </button>
      )}
      {!compact && (
        <button
          type="button"
          className={iconBtn}
          onClick={props.onToggleFullscreen}
          aria-label={isFullscreen ? ui.exitFullscreen : ui.fullscreen}
          title={isFullscreen ? ui.exitFullscreen : ui.fullscreen}
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      )}
      <button type="button" className={iconBtn} onClick={props.onToggleToc} aria-label={ui.contents} title={ui.contents}>
        {compact ? <List size={19} /> : <BookOpen size={18} />}
      </button>
    </nav>
  );
}

export function isVisible(i: number, current: number, spread: boolean) {
  if (!spread || current === 0 || current === TOTAL - 1) return i === current;
  const left = current % 2 === 1 ? current : current - 1;
  return i === left || i === left + 1;
}
