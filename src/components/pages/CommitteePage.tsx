import { committee } from "@/data/programme";
import { Heading, Kicker, PaperPage } from "./primitives";

export function CommitteePage({ number }: { number: number }) {
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col">
        <div className="text-center">
          <Kicker className="justify-center">{committee.kicker}</Kicker>
          <Heading className="mt-1.5" size={22}>
            {committee.heading}
          </Heading>
        </div>

        {/* Carta organisasi */}
        <div className="mt-3 flex flex-col items-center">
          <RoleBox role={committee.advisor.role} name={committee.advisor.name} dark />
          <span className="h-2.5 w-px bg-gold" />
          <RoleBox role={committee.core[0].role} name={committee.core[0].name} dark />
          <span className="h-2.5 w-px bg-gold" />
          <RoleBox role={committee.core[1].role} name={committee.core[1].name} />
          <span className="h-2.5 w-px bg-gold" />
          <div className="relative grid w-full grid-cols-2 gap-2 pt-2.5">
            <span className="absolute top-0 left-1/4 right-1/4 h-px bg-gold" />
            <span className="absolute top-0 left-1/4 h-2.5 w-px bg-gold" />
            <span className="absolute top-0 right-1/4 h-2.5 w-px bg-gold" />
            <RoleBox role={committee.core[2].role} name={committee.core[2].name} />
            <RoleBox role={committee.core[3].role} name={committee.core[3].name} />
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-2">
          <span className="gold-rule flex-1" />
          <span className="font-display text-[10px] font-semibold italic text-darkblue">Ahli Jawatankuasa Kecil</span>
          <span className="gold-rule flex-1" />
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2">
          {committee.groups.map((g) => (
            <div key={g.title} className="rounded-sm border border-gold/35 bg-white/55 px-2.5 py-2">
              <div className="flex items-center gap-1.5 text-[7.4px] font-bold uppercase tracking-[0.14em] text-gold-deep">
                <span className="h-[5px] w-[5px] rotate-45 bg-gold" />
                {g.title}
              </div>
              <ul className="mt-1 space-y-[2px] text-[8px] leading-snug text-navy/85">
                {g.members.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-auto text-center text-[6.6px] uppercase tracking-[0.2em] text-navy/45">Semua nama adalah rekaan (demo)</div>
      </div>
    </PaperPage>
  );
}

function RoleBox({ role, name, dark }: { role: string; name: string; dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "w-full max-w-[210px] rounded-sm bg-navy px-3 py-[5px] text-center shadow-[0_6px_14px_-8px_rgba(16,36,71,0.8)]"
          : "w-full max-w-[210px] rounded-sm border border-gold/50 bg-ivory px-3 py-[5px] text-center"
      }
    >
      <div className={dark ? "text-[6.4px] uppercase tracking-[0.22em] text-gold-light" : "text-[6.4px] uppercase tracking-[0.22em] text-gold-deep"}>{role}</div>
      <div className={dark ? "text-[8.4px] font-semibold leading-tight text-ivory" : "text-[8.4px] font-semibold leading-tight text-navy"}>{name}</div>
    </div>
  );
}
