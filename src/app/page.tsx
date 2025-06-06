"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CalendarEvent, AgendaView } from "@/components/event-calendar";
import {
  GraduationCap,
  Map,
  Calendar,
  HeartHandshake,
  User,
} from "lucide-react";

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
      title: "Services du campus",
      description:
        "Accède rapidement à la restauration, vie associative, et plus encore.",
      icon: GraduationCap,
    },
    {
      title: "Plan interactif",
      description:
        "Explore les bâtiments, les salles et les points d’intérêt facilement.",
      icon: Map,
    },
    {
      title: "Aides & accompagnement",
      description:
        "Santé, social, tutorat : retrouve tout ce qui peut t’aider dès le début.",
      icon: HeartHandshake,
    },
    {
      title: "Profil étudiant",
      description:
        "Gère ton profil, tes préférences et toutes tes démarches utiles.",
      icon: User,
    },
  ];

  return (
    <main className="bg-background flex flex-col overflow-hidden">
      <section className="px-8 pt-8 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2 flex-shrink-0">
          {features.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="p-6 rounded-xl border bg-white dark:bg-zinc-900 shadow flex items-start gap-4"
            >
              <div className="p-2 rounded-lg bg-muted text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border bg-white dark:bg-zinc-900 p-6 shadow flex flex-col h-[50vh] overflow-hidden">
          <h2 className="mb-2 text-2xl font-bold flex items-center gap-2">
            <Calendar />
            {t("Home.agenda")}
          </h2>
          <p className="text-muted-foreground mb-4">
            Reste informé sur les ateliers, forums et activités d’accueil à
            venir.
          </p>

          <div className="overflow-y-auto flex-1 pr-2">
            {loading ? (
              <p className="text-center text-sm text-muted-foreground">
                Chargement des événements...
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
