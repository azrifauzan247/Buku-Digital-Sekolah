"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, Volume1, Volume2, VolumeX } from "lucide-react";
import { ui } from "@/data/programme";
import { cn } from "@/lib/book";
import { useAudio } from "./AudioProvider";

/** Butang muzik (senyap/hidup) + panel kelantangan. */
export function MusicControl({ compact }: { compact?: boolean }) {
  const { isPlaying, muted, volume, available, sfxEnabled, toggleMute, setVolume, setSfxEnabled } = useAudio();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [open]);

  const VolIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div ref={wrapRef} className="relative flex items-center">
      <button
        type="button"
        onClick={toggleMute}
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-full transition",
          !available ? "text-ivory/40" : muted ? "text-ivory/70 hover:bg-white/10" : "text-gold hover:bg-white/10",
        )}
        aria-label={muted ? ui.unmute : ui.mute}
        title={!available ? ui.musicMissing : muted ? ui.unmute : ui.mute}
      >
        {isPlaying ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden>
            {[0, 0.25, 0.5, 0.15].map((d, i) => (
              <span key={i} className="eq-bar h-full" style={{ animationDelay: `${-d}s`, animationDuration: `${0.8 + i * 0.15}s` }} />
            ))}
          </span>
        ) : muted ? (
          <VolumeX size={19} />
        ) : (
          <Music2 size={19} />
        )}
        {!available && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-400" />}
      </button>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn("flex h-11 items-center justify-center rounded-full text-ivory/70 transition hover:bg-white/10 hover:text-ivory", compact ? "w-7" : "w-8")}
        aria-label={ui.volume}
        aria-expanded={open}
        title={ui.volume}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className={cn("transition", open && "rotate-180")}>
          <path d="M1 3.5 L5 7 L9 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className={cn("popover pop-in absolute bottom-[calc(100%+14px)] w-[248px] rounded-2xl p-4 text-ivory", compact ? "-right-12" : "left-1/2 -translate-x-1/2")}>
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">{ui.music}</div>
            <span className={cn("text-[11px]", isPlaying ? "text-emerald-300" : "text-ivory/50")}>{isPlaying ? "Sedang dimainkan" : muted ? "Disenyapkan" : "Dijeda"}</span>
          </div>
          {!available && <p className="mt-2 rounded-lg bg-red-500/15 p-2 text-[11px] leading-snug text-red-100">{ui.musicMissing}</p>}
          <div className="mt-3 flex items-center gap-3">
            <button type="button" onClick={toggleMute} className="text-gold" aria-label={muted ? ui.unmute : ui.mute}>
              <VolIcon size={18} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume flex-1"
              style={{ ["--fill" as string]: `${volume * 100}%` }}
              aria-label={ui.volume}
            />
            <span className="w-8 text-right text-[11px] tabular-nums text-ivory/70">{Math.round(volume * 100)}</span>
          </div>
          <label className="mt-3 flex cursor-pointer items-center justify-between border-t border-white/10 pt-3 text-[12px] text-ivory/85">
            {ui.flipSound}
            <input type="checkbox" checked={sfxEnabled} onChange={(e) => setSfxEnabled(e.target.checked)} className="h-4 w-4 accent-[#D9B45B]" />
          </label>
          <p className="mt-2 text-[10px] leading-snug text-ivory/45">{ui.musicCredit}</p>
        </div>
      )}
    </div>
  );
}
