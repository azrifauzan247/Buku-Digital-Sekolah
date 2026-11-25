import { programme, school } from "@/data/programme";

export function TopBar({ compact }: { compact: boolean }) {
  return (
    <header className="fade-in pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 px-4 pt-[max(10px,env(safe-area-inset-top))] sm:px-6 sm:pt-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <img src={school.logo} alt="" className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
        <div className="min-w-0 leading-tight">
          <div className="truncate font-display text-[14px] font-semibold text-ivory sm:text-[15px]">{school.shortName}</div>
          <div className="truncate text-[10px] uppercase tracking-[0.22em] text-gold-light/80">{programme.bookLabel} Digital</div>
        </div>
      </div>
      {!compact && (
        <div className="hidden flex-1 text-center font-display text-[13px] italic text-ivory/55 lg:block">“{programme.theme}”</div>
      )}
      <span
        className="shrink-0 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light"
        title="Semua kandungan adalah rekaan untuk tujuan demonstrasi"
      >
        Demo
      </span>
    </header>
  );
}
