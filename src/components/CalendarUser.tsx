"use client";

import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";

import { addDays } from "date-fns";

const userEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Product Launch",
    description: "Big day!",
    start: addDays(new Date(), 1),
    end: addDays(new Date(), 2),
    allDay: true,
    color: "emerald",
  },
];

export default function CalendarUser() {
  return (
    <EventCalendar
      events={userEvents}
      onEventAdd={() => {}}
      onEventUpdate={() => {}}
      onEventDelete={() => {}}
      editable={false}
    />
  );
}
