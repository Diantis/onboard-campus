// HomePage
// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CalendarEvent, AgendaView } from "@/components/event-calendar";
import { File, Map, Calendar, HeartHandshake, User } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/calendar");
        const data = await res.json();
        const parsed = data.map((e: CalendarEvent) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }));
        setEvents(parsed);
      } catch (err) {
        console.error("Erreur de chargement des événements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventSelect = (event: CalendarEvent) => {
    console.log("Event clicked:", event);
  };

  const features = [
    {
      href: "/services",
      title: t("Home.services"),
      description: t("Home.servicesDescription"),
      icon: HeartHandshake,
      hoverColor:
        "hover:border-pink-400 hover:shadow-pink-100 dark:hover:shadow-pink-900/20",
    },
    {
      href: "/map",
      title: t("Home.mapTitle"),
      description: t("Home.mapDescription"),
      icon: Map,
      hoverColor:
        "hover:border-emerald-400 hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20",
    },
    {
      href: "/chat",
      title: "FAQ",
      description: t("Home.chatDescription"),
      icon: User,
      hoverColor:
        "hover:border-amber-400 hover:shadow-amber-100 dark:hover:shadow-amber-900/20",
    },
    {
      href: "/documents",
      title: "Documents",
      description: t("Home.documentDescription"),
      icon: File,
      hoverColor:
        "hover:border-sky-400 hover:shadow-sky-100 dark:hover:shadow-sky-900/20",
    },
  ];

  return (
    <main className="bg-background flex flex-col overflow-hidden pb-16">
      <section className="px-8 pt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2 flex-shrink-0">
          {features.map(
            ({ href, title, description, icon: Icon, hoverColor }) => (
              <Link
                href={href}
                key={title}
                className={`p-6 rounded-xl border-2 border-transparent ${hoverColor} bg-white dark:bg-zinc-900 shadow hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 flex items-start gap-4`}
              >
                <div className="p-2 rounded-lg bg-muted text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <div className="h-full flex items-center">
                  <ChevronRight className="block sm:hidden" />
                </div>
              </Link>
            ),
          )}
        </div>
        <div className="rounded-xl border-2 bg-white dark:bg-zinc-900 p-6 shadow flex flex-col h-[50vh] overflow-hidden">
          <h2 className="mb-2 text-2xl font-bold flex items-center gap-2">
            <Calendar />
            {t("Home.agendaTitle")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("Home.agendaDescription")}
          </p>

          <div className="overflow-y-auto flex-1 pr-2">
            {loading ? (
              <p className="text-center text-sm text-muted-foreground">
                {t("Home.loading")}
              </p>
            ) : (
              <AgendaView
                currentDate={new Date()}
                events={events}
                onEventSelect={handleEventSelect}
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
