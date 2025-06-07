// src/components/Header.tsx

"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export function Header({ userName }: { userName: string }) {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src="/Logo_Campus.png"
          width={72}
          height={72}
          alt="Logo Campus"
          className="rounded-full object-cover border-2 border-muted shadow mr-2"
          priority
        />
        <div className="h-12 w-px bg-muted" />
        <Link
          href={"/profil"}
          className="flex flex-col p-4 rounded-xl hover:border-2 hover:border-amber-400"
        >
          <div className="flex gap-1">
            <span className="text-md text-foreground">
              {t("Header.Welcome")},
            </span>
            <span className="text-base font-semibold text-foreground flex gap-1">
              {userName}
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            {t("Header.description")}
          </p>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Recherche"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
        <Button
          onClick={() => {
            fetch("/api/logout", { method: "POST" }).then(() => {
              window.location.href = "/login";
            });
          }}
        >
          {t("Header.Logout")}
        </Button>
      </div>
    </header>
  );
}
