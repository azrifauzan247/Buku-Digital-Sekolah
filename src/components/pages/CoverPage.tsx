import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { programme, school } from "@/data/programme";
import { Corners, Flourish } from "./primitives";

export function CoverPage() {
  return (
    <div className="cover-surface relative h-full w-full overflow-hidden text-ivory">
      <div className="leather" />
      <div className="pointer-events-none absolute inset-[12px] border border-gold/70" />
      <div className="pointer-events-none absolute inset-[16px] border border-gold/30" />
      <Corners inset={10} size={40} />
      <div className="sheen" />

      <div className="relative flex h-full flex-col items-center px-[34px] pt-[28px] pb-[22px] text-center">
        <img src={school.logo} alt={`Logo ${school.shortName}`} draggable={false} className="h-[46px] w-[46px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]" />
        <div className="mt-2 text-[7.5px] font-semibold uppercase tracking-[0.42em] text-gold-light">{school.fullName}</div>
        <Flourish className="mt-1.5" width={110} />

        <div className="mt-2 text-[7px] uppercase tracking-[0.5em] text-ivory/70">{programme.bookLabel}</div>
        <h1 className="mt-1 font-display text-[25px] font-bold leading-[1.08] text-white">{programme.title}</h1>
        <div className="gold-text font-display text-[34px] font-extrabold leading-none tracking-wide">{programme.year}</div>

        <img src={programme.heroImage} alt="Ilustrasi murid meraikan kejayaan" draggable={false} className="mt-1 w-[228px]" />

        <div className="mt-1.5 rounded-sm border-y border-gold/50 px-3 py-1.5">
          <div className="text-[6.5px] uppercase tracking-[0.4em] text-gold-light/80">Tema</div>
          <p className="whitespace-nowrap font-display text-[11.5px] italic leading-snug text-gold-light">“{programme.theme}”</p>
        </div>

        <div className="mt-auto grid w-full grid-cols-3 gap-1 text-[7.2px] leading-tight text-ivory/90">
          <CoverFact icon={<CalendarDays size={11} />} label={programme.day} value={programme.date} />
          <CoverFact icon={<Clock3 size={11} />} label="Masa" value="8.00 pg – 12.30 tgh" />
          <CoverFact icon={<MapPin size={11} />} label="Tempat" value={programme.venue} />
        </div>
        <div className="mt-2 text-[5.8px] uppercase tracking-[0.3em] text-ivory/45">Kandungan demo rekaan</div>
      </div>
    </div>
  );
}

function CoverFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="flex h-[20px] w-[20px] items-center justify-center rounded-full border border-gold/60 text-gold">{icon}</span>
      <span className="text-[6px] uppercase tracking-[0.25em] text-gold-light/80">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
