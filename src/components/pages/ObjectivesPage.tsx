import { CheckCircle2 } from "lucide-react";
import { objectivesTheme, programme } from "@/data/programme";
import { pad2 } from "@/lib/book";
import { Heading, Kicker, PaperPage } from "./primitives";

export function ObjectivesPage({ number }: { number: number }) {
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col">
        <Kicker>{objectivesTheme.kicker}</Kicker>
        <Heading className="mt-2" size={23}>
          {objectivesTheme.heading}
        </Heading>

        <div className="relative mt-3 overflow-hidden rounded-sm bg-gradient-to-br from-darkblue to-navy px-4 py-3.5 text-center text-ivory">
          <div className="absolute inset-[4px] border border-gold/40" />
          <div className="text-[6.8px] uppercase tracking-[0.4em] text-gold-light">{objectivesTheme.themeLabel}</div>
          <p className="gold-text mt-1 font-display text-[15px] font-semibold italic leading-snug">“{programme.theme}”</p>
          <p className="mx-auto mt-1.5 max-w-[250px] text-[8.2px] leading-[1.55] text-ivory/80">{objectivesTheme.themeExplanation}</p>
        </div>

        <div className="mt-3.5 text-[7px] font-semibold uppercase tracking-[0.3em] text-gold-deep">Objektif</div>
        <ol className="mt-1.5 space-y-[7px]">
          {objectivesTheme.objectives.map((o, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="font-display text-[15px] font-bold leading-none text-gold">{pad2(i + 1)}</span>
              <span className="border-l border-gold/40 pl-2.5 text-[9.2px] leading-[1.5] text-navy/85">{o}</span>
            </li>
          ))}
        </ol>

        <div className="mt-auto rounded-sm border border-gold/40 bg-white/60 px-3 py-2.5">
          <div className="font-display text-[11.5px] font-bold text-navy">{objectivesTheme.outcomesHeading}</div>
          <ul className="mt-1.5 space-y-1">
            {objectivesTheme.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-1.5 text-[8.8px] leading-snug text-navy/85">
                <CheckCircle2 size={10} className="mt-[1px] shrink-0 text-gold-deep" />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PaperPage>
  );
}
