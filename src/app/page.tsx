"use client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <a href="/dashboard/">
          <Button size={"sm"} onClick={() => "shadcnui"} variant="link">
            {t("hello")} shadcnui!
          </Button>
          <div className="flex flex-col gap-2">
            <Button
              size={"sm"}
              onClick={() => i18n.changeLanguage("ar")}
              variant="link"
            >
              arabic
            </Button>
            <Button
              size={"sm"}
              onClick={() => i18n.changeLanguage("en")}
              variant="link"
            >
              english
            </Button>
          </div>
        </a>
      </main>
    </div>
  );
}
