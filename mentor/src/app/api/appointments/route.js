import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorBookedSessions from "@/app/components/mentorBookings";
import Mentor from "@/app/models/Mentors";
import jwt from "jsonwebtoken";
// GET /api/appointments
export async function GET() {
  try {
    await connectDB();

    const appointments = await MentorBookedSessions.find()
      .sort({ date: 1 })
      .lean();

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("GET appointments error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch appointments",
      },
      {
        status: 500,
      }
    );
  }
}

// POST /api/appointments
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const appointment = await MentorBookedSessions.create({
      mentorName: body.mentorName,
      studentName: body.studentName,
      date: body.date,
      duration: body.duration,
      status: body.status,
      topic: body.topic,
    });

    return NextResponse.json(
      {
        message: "Appointment created successfully",
        appointment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST appointment error:", error);

    return NextResponse.json(
      {
        error: "Failed to create appointment",
      },
      {
        status: 500,
      }
    );
  }
}

