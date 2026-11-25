import { school, ui } from "@/data/programme";

export function LoadingScreen({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  return (
    <div className="fade-in fixed inset-0 z-[70] flex flex-col items-center justify-center text-ivory" role="status" aria-live="polite">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0" aria-hidden>
          <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(217,180,91,0.15)" strokeWidth="2" />
          <path d="M60 4 A56 56 0 0 1 116 60" fill="none" stroke="#D9B45B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <img src={school.logo} alt="" className="absolute inset-3 h-[88px] w-[88px] drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]" />
      </div>
      <div className="mt-6 font-display text-lg tracking-wide text-gold-light">{school.shortName}</div>
      <div className="mt-1 text-[12px] tracking-[0.15em] text-ivory/60">{ui.loading}</div>
      <div className="mt-5 h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold-light to-gold transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 text-[11px] tabular-nums text-ivory/40">{pct}%</div>
    </div>
  );
}
