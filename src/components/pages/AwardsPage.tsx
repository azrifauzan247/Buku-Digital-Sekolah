import { CalendarCheck, Crown, HeartHandshake, Medal, Trophy } from "lucide-react";
import { awards, type AwardCategory } from "@/data/programme";
import { DemoTag, Heading, Kicker, PaperPage } from "./primitives";

const ICONS: Record<AwardCategory["icon"], React.ComponentType<{ size?: number; className?: string }>> = {
  medal: Medal,
  calendar: CalendarCheck,
  heart: HeartHandshake,
  trophy: Trophy,
  crown: Crown,
};

export function AwardsPage({ number }: { number: number }) {
  const regular = awards.categories.filter((c) => !c.featured);
  const featured = awards.categories.find((c) => c.featured);
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Kicker>{awards.kicker}</Kicker>
            <Heading className="mt-1.5" size={22}>
              {awards.heading}
            </Heading>
          </div>
          <DemoTag className="mt-1 shrink-0">Nama demo</DemoTag>
        </div>
        <p className="mt-1 text-[7.4px] italic text-navy/55">{awards.demoNote}</p>

        <div className="mt-2.5 space-y-[7px]">
          {regular.map((cat) => {
            const Icon = ICONS[cat.icon];
            return (
              <div key={cat.title} className="flex gap-2.5 border-b border-gold/25 pb-[7px] last:border-0">
                <span className="relative flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold-deep text-navy shadow-[0_3px_8px_-3px_rgba(168,129,47,0.9)]">
                  <Icon size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[10.6px] font-bold leading-tight text-navy">{cat.title}</div>
                  <div className="text-[7px] uppercase tracking-[0.12em] text-gold-deep">{cat.description}</div>
                  <ul className="mt-[3px] space-y-[1px]">
                    {cat.recipients.map((r) => (
                      <li key={r.name} className="flex items-baseline justify-between gap-2 text-[8.4px] text-navy/85">
                        <span className="truncate">{r.name}</span>
                        <span className="shrink-0 text-[7.4px] text-navy/50">{r.className}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {featured && (
          <div className="relative mt-auto overflow-hidden rounded-sm bg-gradient-to-br from-darkblue to-navy px-3 py-2.5 text-ivory">
            <div className="absolute inset-[3px] border border-gold/40" />
            <div className="relative flex gap-2.5">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-gold bg-navy text-gold">
                <Crown size={15} />
              </span>
              <div>
                <div className="gold-text font-display text-[11.5px] font-bold">{featured.title}</div>
                <div className="text-[9px] font-semibold text-white">
                  {featured.recipients[0].name} <span className="font-normal text-ivory/60">· {featured.recipients[0].className}</span>
                </div>
                {featured.recipients[0].note && <p className="mt-0.5 text-[7.6px] leading-snug text-ivory/75">{featured.recipients[0].note}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </PaperPage>
  );
}
