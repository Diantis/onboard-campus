"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function Header({ userName }: { userName: string }) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md shadow-sm border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-1 sm:gap-4">
        <Image
          src="/Logo_Campus.png"
          width={72}
          height={72}
          alt="Logo Campus"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-muted shadow sm:mr-2"
          priority
        />
        <div className="h-12 w-px bg-muted hidden sm:block" />

        <Link
          href="/profil"
          className="hidden sm:flex flex-col p-4 rounded-xl hover:border-2 hover:border-amber-400"
        >
          <div className="flex gap-1">
            <span className="text-md text-foreground">
              {t("Header.Welcome")},
            </span>
            <span className="text-base font-semibold text-foreground">
              {userName}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("Header.description")}
          </p>
        </Link>
      </div>

      {/* Desktop buttons */}
      <div className="hidden sm:flex items-center gap-4">
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
          className="px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base"
        >
          {t("Header.Logout")}
        </Button>
      </div>

      {/* Mobile dropdown */}
      <div className="sm:hidden">
        <DropdownMenu onOpenChange={(open) => setIsMenuOpen(open)}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 px-2">
              <span className="text-md text-foreground">
                {t("Header.Welcome")},
              </span>
              <span className="text-md font-semibold text-foreground">
                {userName}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 mt-[3px] ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profil">{t("Profil.title")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                fetch("/api/logout", { method: "POST" }).then(() => {
                  window.location.href = "/login";
                });
              }}
            >
              {t("Header.Logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
