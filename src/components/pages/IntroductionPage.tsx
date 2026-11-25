import { introduction, programme } from "@/data/programme";
import { Flourish, Heading, Kicker, PaperPage } from "./primitives";

export function IntroductionPage({ number }: { number: number }) {
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col">
        <Kicker>{introduction.kicker}</Kicker>
        <Heading className="mt-2" size={23}>
          {introduction.heading}
        </Heading>
        <Flourish className="mt-2" width={84} />

        <div className="relative mt-3 h-[92px] overflow-hidden rounded-sm">
          <img src="/images/gallery/anugerah.svg" alt="Ilustrasi majlis anugerah" draggable={false} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
          <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between text-ivory">
            <span className="font-display text-[11px] italic">{programme.venue}</span>
            <span className="text-[7px] uppercase tracking-[0.2em] text-gold-light">
              {programme.day}, {programme.date}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-[7px] text-justify text-[9.4px] leading-[1.62] text-navy/85">
          {introduction.paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "drop-cap" : undefined}>
              {p}
            </p>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-3 gap-2">
          {introduction.stats.map((s) => (
            <div key={s.label} className="relative overflow-hidden rounded-sm bg-navy px-2 py-2.5 text-center">
              <div className="absolute inset-[3px] border border-gold/30" />
              <div className="gold-text font-display text-[20px] font-bold leading-none">{s.value}</div>
              <div className="mt-1 text-[6.8px] uppercase tracking-[0.14em] text-ivory/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </PaperPage>
  );
}
