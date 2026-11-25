import ClientRoot from "@/components/ClientRoot";
import { programme, school } from "@/data/programme";

export default function Home() {
  return (
    <>
      {/* Teks ringkas untuk enjin carian & pembaca skrin sebelum buku dimuatkan */}
      <h1 className="sr-only">
        {programme.bookLabel} Digital {programme.fullTitle} — {school.fullName}
      </h1>
      <ClientRoot />
    </>
  );
}
