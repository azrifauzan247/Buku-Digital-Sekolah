"use client";

import { useState } from "react";
import { BookOpen, CalendarDays, MapPin, Music2 } from "lucide-react";
import { DEMO_NOTICE, programme, school, ui } from "@/data/programme";

type Props = {
  onStart: (withMusic: boolean) => void;
};

/** Paparan sambutan apabila pelayar menyekat autoplay audio. */
export function WelcomeOverlay({ onStart }: Props) {
  const [leaving, setLeaving] = useState(false);
  const go = (withMusic: boolean) => {
    if (leaving) return;
    setLeaving(true);
    onStart(withMusic);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-5 py-8 transition-opacity duration-700 ${leaving ? "pointer-events-none opacity-0" : "opacity-100"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="absolute inset-0 bg-[#06102a]/70 backdrop-blur-md" />
      <div className="rise-in relative w-full max-w-[440px] overflow-hidden rounded-[22px] border border-gold/40 bg-gradient-to-b from-darkblue/95 to-navy/95 px-7 pt-8 pb-7 text-center text-ivory shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="sheen" />
        <div className="pointer-events-none absolute inset-[8px] rounded-[16px] border border-gold/20" />
        <img src={school.logo} alt={`Logo ${school.shortName}`} className="relative mx-auto h-20 w-20 drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]" />
        <div className="relative mt-4 text-[11px] uppercase tracking-[0.4em] text-gold-light">{ui.welcomeTitle}</div>
        <h1 id="welcome-title" className="relative mt-2 font-display text-[26px] font-bold leading-tight sm:text-[30px]">
          {programme.title} <span className="gold-text">{programme.year}</span>
        </h1>
        <p className="relative mt-2 font-display text-[15px] italic text-gold-light/90">“{programme.theme}”</p>

        <div className="relative mx-auto mt-5 flex max-w-[320px] flex-col gap-1.5 text-[13px] text-ivory/80">
          <span className="flex items-center justify-center gap-2">
            <CalendarDays size={15} className="text-gold" /> {programme.day}, {programme.date}
          </span>
          <span className="flex items-center justify-center gap-2">
            <MapPin size={15} className="text-gold" /> {programme.venue}, {school.shortName}
          </span>
        </div>

        <button
          type="button"
          onClick={() => go(true)}
          autoFocus
          className="group relative mt-7 inline-flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light px-8 text-[15px] font-semibold uppercase tracking-[0.22em] text-navy shadow-[0_10px_30px_-8px_rgba(217,180,91,0.7)] transition hover:brightness-110 active:scale-[0.98]"
        >
          <BookOpen size={20} className="transition group-hover:-rotate-6" />
          {ui.startReading}
        </button>
        <div className="relative mt-3 flex items-center justify-center gap-1.5 text-[12px] text-ivory/55">
          <Music2 size={13} /> {ui.welcomeHint}
        </div>
        <button type="button" onClick={() => go(false)} className="relative mt-2 text-[12px] text-ivory/50 underline-offset-4 hover:text-ivory hover:underline">
          Baca tanpa muzik
        </button>
        <p className="relative mt-5 text-[10.5px] text-ivory/35">{DEMO_NOTICE}</p>
      </div>
    </div>
  );
}
