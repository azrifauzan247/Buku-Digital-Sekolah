import { Quote } from "lucide-react";
import type { Person } from "@/data/programme";
import { cn } from "@/lib/book";
import { ArchPhoto, Heading, Kicker, PaperPage } from "./primitives";

type Props = {
  number: number;
  kicker: string;
  heading: string;
  person: Person;
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
  quote?: string;
  /** Kedudukan foto: kiri (default) atau kanan */
  photoSide?: "left" | "right";
};

/** Templat ucapan boleh guna semula (Guru Besar, YDP PIBG, dsb.). */
export function MessagePage({ number, kicker, heading, person, greeting, paragraphs, closing, signature, quote, photoSide = "left" }: Props) {
  const right = photoSide === "right";
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col">
        <div className={cn("flex items-end gap-4", right && "flex-row-reverse text-right")}>
          <ArchPhoto src={person.photo ?? ""} alt={`Foto ${person.name}`} className="h-[98px] w-[76px] shrink-0" />
          <div className={cn("pb-1", right && "flex flex-col items-end")}>
            <Kicker>{kicker}</Kicker>
            <Heading className="mt-1.5" size={22}>
              {heading}
            </Heading>
            <div className={cn("mt-2 h-[2px] w-10 bg-gold", right && "ml-auto")} />
            <div className="mt-2 text-[7px] uppercase tracking-[0.18em] text-navy/55">Foto pemegang tempat</div>
          </div>
        </div>

        <p className="mt-3.5 font-display text-[10.5px] font-semibold italic text-darkblue">{greeting}</p>
        <div className="mt-1.5 space-y-[7px] text-justify text-[9.4px] leading-[1.58] text-navy/85">
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "drop-cap" : undefined}>
              {p}
            </p>
          ))}
        </div>

        {quote && (
          <div className="relative mt-3 rounded-sm border-l-2 border-gold bg-gold/10 py-2 pr-2 pl-6">
            <Quote size={12} className="absolute top-2 left-2 text-gold-deep" />
            <p className="font-display text-[10.5px] italic leading-snug text-darkblue">{quote}</p>
          </div>
        )}

        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="text-[9px] text-navy/70">{closing}</div>
            <div className="font-display text-[20px] italic leading-none text-darkblue/80" style={{ fontWeight: 500 }}>
              {signature}
            </div>
            <div className="mt-1 h-px w-28 bg-navy/25" />
            <div className="mt-1 text-[9px] font-semibold text-navy">{person.name}</div>
            <div className="text-[7.6px] uppercase tracking-[0.12em] text-gold-deep">{person.role}</div>
          </div>
        </div>
      </div>
    </PaperPage>
  );
}
