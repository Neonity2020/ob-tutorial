import { MadeWithDyad } from "@/components/made-with-dyad";
import { LandingPageContent } from "@/components/landing-page-content";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
      <main className="flex flex-col gap-8 row-start-1 items-center justify-center w-full">
        <LandingPageContent />
      </main>
      <MadeWithDyad />
    </div>
  );
}