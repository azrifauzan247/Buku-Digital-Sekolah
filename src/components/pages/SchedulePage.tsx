import { Award } from "lucide-react";
import { programme, schedule } from "@/data/programme";
import { cn } from "@/lib/book";
import { Heading, Kicker, PaperPage } from "./primitives";

export function SchedulePage({ number }: { number: number }) {
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col">
        <div className="text-center">
          <Kicker className="justify-center">{schedule.kicker}</Kicker>
          <Heading className="mt-1.5" size={23}>
            {schedule.heading}
          </Heading>
          <div className="mx-auto mt-1.5 inline-flex items-center gap-2 rounded-full bg-navy px-3 py-[3px] text-[7.2px] tracking-[0.1em] text-gold-light">
            {programme.day}, {programme.date} <span className="text-gold">•</span> {programme.venue}
          </div>
        </div>

        <ol className="relative mt-3 flex-1">
          <span className="absolute top-2 bottom-3 left-[61px] w-px bg-gradient-to-b from-gold via-gold/60 to-gold/10" aria-hidden />
          {schedule.items.map((item) => (
            <li key={item.time} className="relative flex items-start gap-0 py-[6.4px]">
              <span className="w-[50px] shrink-0 pt-[1px] text-right font-display text-[9.6px] font-bold leading-tight text-darkblue">
                {item.time}
              </span>
              <span
                className={cn(
                  "relative z-10 mx-[7px] mt-[2px] flex h-[9px] w-[9px] shrink-0 rotate-45 border",
                  item.highlight ? "border-gold bg-gold" : "border-gold bg-ivory",
                )}
              />
              <span
                className={cn(
                  "min-w-0 flex-1",
                  item.highlight && "-my-[3px] rounded-sm bg-navy px-2 py-[4px] text-ivory shadow-[0_6px_14px_-8px_rgba(16,36,71,0.8)]",
                )}
              >
                <span className={cn("flex items-center gap-1 text-[9.6px] font-semibold leading-tight", item.highlight ? "text-gold-light" : "text-navy")}>
                  {item.highlight && <Award size={10} />}
                  {item.title}
                </span>
                {item.description && (
                  <span className={cn("block text-[7.8px] leading-snug", item.highlight ? "text-ivory/80" : "text-navy/60")}>
                    {item.description}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-center text-[6.8px] italic text-navy/50">{schedule.note}</p>
      </div>
    </PaperPage>
  );
}
