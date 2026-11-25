import { pibgMessage, principalMessage } from "@/data/programme";
import { AdministrationPage } from "./AdministrationPage";
import { AppreciationPage } from "./AppreciationPage";
import { AwardsPage } from "./AwardsPage";
import { BackCoverPage } from "./BackCoverPage";
import { CommitteePage } from "./CommitteePage";
import { CoverPage } from "./CoverPage";
import { GalleryPage } from "./GalleryPage";
import { IntroductionPage } from "./IntroductionPage";
import { MessagePage } from "./MessagePage";
import { ObjectivesPage } from "./ObjectivesPage";
import { SchedulePage } from "./SchedulePage";

export type BookPageDef = {
  id: string;
  density: "soft" | "hard";
  render: () => React.ReactNode;
};

/** Susunan 12 halaman buku. Urutan di sini = urutan dalam buku. */
export const bookPages: BookPageDef[] = [
  { id: "kulit-hadapan", density: "hard", render: () => <CoverPage /> },
  { id: "alu-aluan", density: "soft", render: () => <MessagePage number={2} {...principalMessage} photoSide="left" /> },
  { id: "pibg", density: "soft", render: () => <MessagePage number={3} {...pibgMessage} photoSide="right" /> },
  { id: "pengenalan", density: "soft", render: () => <IntroductionPage number={4} /> },
  { id: "objektif", density: "soft", render: () => <ObjectivesPage number={5} /> },
  { id: "aturcara", density: "soft", render: () => <SchedulePage number={6} /> },
  { id: "pentadbir", density: "soft", render: () => <AdministrationPage number={7} /> },
  { id: "jawatankuasa", density: "soft", render: () => <CommitteePage number={8} /> },
  { id: "anugerah", density: "soft", render: () => <AwardsPage number={9} /> },
  { id: "penghargaan", density: "soft", render: () => <AppreciationPage number={10} /> },
  { id: "galeri", density: "soft", render: () => <GalleryPage number={11} /> },
  { id: "kulit-belakang", density: "hard", render: () => <BackCoverPage /> },
];
