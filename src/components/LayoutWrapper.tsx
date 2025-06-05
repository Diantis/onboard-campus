"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideUI = ["/login", "/register"].includes(pathname);

  return (
    <>
      {!hideUI && <Header userName="machin" />}
      {children}
      {!hideUI && <BottomNav />}
    </>
  );
}
