"use client";

import { useState } from "react";
import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";

import { setHours, setMinutes, subDays } from "date-fns";

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Annual Planning",
    description: "Strategic planning for next year",
    start: subDays(new Date(), 3),
    end: subDays(new Date(), 2),
    allDay: true,
    color: "sky",
    location: "Main Hall",
  },
  {
    id: "2",
    title: "Team Meeting",
    description: "Weekly sync",
    start: setMinutes(setHours(new Date(), 10), 0),
    end: setMinutes(setHours(new Date(), 11), 30),
    color: "amber",
    location: "Room A",
  },
];

export default function CalendarAdmin() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updated: CalendarEvent) => {
    setEvents(events.map((e) => (e.id === updated.id ? updated : e)));
  };

  const handleEventDelete = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
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
