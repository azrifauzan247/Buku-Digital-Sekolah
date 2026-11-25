import { Building2, GraduationCap, HandHeart, Users } from "lucide-react";
import { appreciation, type AppreciationGroup } from "@/data/programme";
import { Flourish, Heading, Kicker, PaperPage } from "./primitives";

const ICONS: Record<AppreciationGroup["icon"], React.ComponentType<{ size?: number; className?: string }>> = {
  teachers: GraduationCap,
  parents: Users,
  sponsors: HandHeart,
  organisations: Building2,
};

export function AppreciationPage({ number }: { number: number }) {
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col text-center">
        <Kicker className="justify-center">{appreciation.kicker}</Kicker>
        <Heading className="mt-1.5" size={24}>
          {appreciation.heading}
        </Heading>
        <Flourish className="mx-auto mt-2" width={96} />
        <p className="mx-auto mt-2.5 max-w-[280px] font-display text-[11px] italic leading-[1.6] text-darkblue">“{appreciation.message}”</p>

        <div className="mt-4 grid grid-cols-2 gap-2.5 text-left">
          {appreciation.groups.map((g) => {
            const Icon = ICONS[g.icon];
            return (
              <div key={g.title} className="relative rounded-sm border border-gold/40 bg-white/60 px-3 pt-4 pb-2.5">
                <span className="absolute -top-[11px] left-3 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-navy text-gold ring-2 ring-ivory">
                  <Icon size={11} />
                </span>
                <div className="font-display text-[10.6px] font-bold text-navy">{g.title}</div>
                <ul className="mt-1 space-y-[2px]">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-1.5 text-[8px] leading-snug text-navy/80">
                      <span className="mt-[4px] h-[3px] w-[3px] shrink-0 rotate-45 bg-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-auto">
          <div className="gold-text font-display text-[26px] font-bold italic leading-none">Terima Kasih</div>
          <div className="mt-1 text-[7px] uppercase tracking-[0.3em] text-navy/55">Jasamu dikenang</div>
        </div>
      </div>
    </PaperPage>
  );
}
