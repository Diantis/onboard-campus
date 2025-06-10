import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle GET request - return all events sorted by start date
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { start: "asc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve events" },
      { status: 500 },
    );
  }
}

// Handle POST request - create a new event
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        start: new Date(body.start),
        end: new Date(body.end),
        allDay: body.allDay,
        location: body.location,
        color: body.color,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("POST error (event creation)", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 },
    );
  }
}

// Handle PUT request - update an existing event
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    const updated = await prisma.event.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    );
  }
}

// Handle DELETE request - delete an event by ID from query params
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    );
  }
}
