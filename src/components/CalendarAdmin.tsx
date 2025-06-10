"use client";

import { useState, useEffect } from "react";
import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";

export default function CalendarAdmin() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Fetch calendar events from the API when the component mounts
    fetch("/api/calendar")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load calendar events");
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

  // Add a new event to the calendar
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

  // Update an existing event
  const handleEventUpdate = (updated: CalendarEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  // Remove an event by ID
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
