import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorBookedSessions from "@/app/components/mentorBookings";
import Mentors from "@/app/models/Mentors";
import jwt from "jsonwebtoken";
// get all mentors list
export async function GET() {
  try {
    await connectDB();

    const mentors = await Mentors.find({}).lean();

    return NextResponse.json(
      {
        success: true,
        mentors,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get mentors error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch mentors",
        mentors: [],
      },
      { status: 500 }
    );
  }
}