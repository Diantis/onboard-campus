"use client";

import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";
import { useState, useEffect } from "react";

export default function CalendarUser() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => {
        if (!res.ok)
          throw new Error("Erreur lors du chargement des événements");
        return res.json();
      })
      .then((data: CalendarEvent[]) => {
        const formatted = data.map((e) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }));
        setEvents(formatted);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <EventCalendar
      events={events}
      onEventAdd={() => {}}
      onEventUpdate={() => {}}
      onEventDelete={() => {}}
      editable={false}
    />
  );
}
