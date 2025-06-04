"use client";

import { useState, useEffect } from "react";
import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";

export default function CalendarAdmin() {
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

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents((prev) => [
      ...prev,
      {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      },
    ]);
  };

  const handleEventUpdate = (updated: CalendarEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleEventDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <EventCalendar
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  );
}
