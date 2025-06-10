"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { SidebarNav } from "@/components/SidebarNav";

interface LayoutWrapperProps {
  children: React.ReactNode;
  userName: string;
}

export function LayoutWrapper({ children, userName }: LayoutWrapperProps) {
  const pathname = usePathname();
  const hideUI = ["/login", "/register", "/forgot-password"].includes(pathname);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar desktop */}
      {!hideUI && <SidebarNav />}

      <div className={`flex-1 ${!hideUI ? "md:ml-20" : ""}`}>
        {!hideUI && <Header userName={userName} />}
        {children}
      </div>

      {/* Bottom nav mobile */}
      {!hideUI && (
        <div className="md:hidden">
          <BottomNav />
        </div>
      )}
    </div>
  );
}
