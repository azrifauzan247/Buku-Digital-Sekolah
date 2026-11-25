import { administration } from "@/data/programme";
import { Flourish, Heading, Kicker, PaperPage } from "./primitives";

export function AdministrationPage({ number }: { number: number }) {
  const [head, ...others] = administration.people;
  return (
    <PaperPage number={number}>
      <div className="flex h-full flex-col">
        <div className="text-center">
          <Kicker className="justify-center">{administration.kicker}</Kicker>
          <Heading className="mt-1.5" size={23}>
            {administration.heading}
          </Heading>
          <p className="mx-auto mt-1 max-w-[250px] text-[8.2px] leading-snug text-navy/65">{administration.intro}</p>
          <Flourish className="mx-auto mt-1.5" width={80} />
        </div>

        <div className="mt-2.5 flex justify-center">
          <PersonCard name={head.name} role={head.role} photo={head.photo} large />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {others.map((p) => (
            <PersonCard key={p.name} name={p.name} role={p.role} photo={p.photo} />
          ))}
        </div>
        <div className="mt-auto text-center text-[6.6px] uppercase tracking-[0.2em] text-navy/45">Foto pemegang tempat • Nama rekaan</div>
      </div>
    </PaperPage>
  );
}

function PersonCard({ name, role, photo, large }: { name: string; role: string; photo?: string; large?: boolean }) {
  return (
    <figure className={large ? "flex w-[170px] flex-col items-center text-center" : "flex flex-col items-center text-center"}>
      <div className={large ? "relative h-[118px] w-[94px]" : "relative h-[92px] w-[74px]"}>
        <div className="absolute -inset-[3px] rounded-[3px] border border-gold/70" />
        <div className="h-full w-full overflow-hidden rounded-[2px] bg-softgrey shadow-[0_6px_14px_-6px_rgba(16,36,71,0.55)]">
          <img src={photo} alt={`Foto ${name}`} draggable={false} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="mt-2 rounded-full bg-navy px-2 py-[2px] text-[6.4px] font-semibold uppercase tracking-[0.12em] text-gold-light">{role}</div>
      <figcaption className={large ? "mt-1 text-[9.4px] font-semibold leading-tight text-navy" : "mt-1 text-[7.8px] font-semibold leading-tight text-navy"}>
        {name}
      </figcaption>
    </figure>
  );
}
