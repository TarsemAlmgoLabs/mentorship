import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorshipSession from "@/app/models/Appointment";
import jwt from "jsonwebtoken";
// GET /api/appointments
export async function GET() {
  try {
    await connectDB();

    const appointments = await MentorshipSession.find()
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

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      candidateId,
      mentorId,

      mentor,
      topic,

      sessionDate,
      sessionTime,
      duration,

      candidate,

      amount,
    } = body;

    // Basic validation
    if (
      !candidateId ||
      !mentorId ||
      !mentor ||
      !topic ||
      !sessionDate ||
      !sessionTime ||
      amount === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing",
        },
        {
          status: 400,
        }
      );
    }

    const appointment = await MentorshipSession.create({
      candidateId,
      mentorId,

      mentor: {
        name: mentor.name,
        role: mentor.role,
        company: mentor.company,
        initials: mentor.initials,
      },

      topic,

      sessionDate: new Date(sessionDate),

      sessionTime,

      duration: duration || 45,

      amount,

      paymentStatus: "pending",

      status: "scheduled",
    });

    return NextResponse.json(
      {
        success: true,
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
        success: false,
        message: "Failed to create appointment",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
