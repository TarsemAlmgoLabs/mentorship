import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorBookedSessions from "@/app/components/mentorBookings";
import Mentor from "@/app/models/Mentors";
import jwt from "jsonwebtoken";

// fetch all past sessions
export async function GET(request) {
  try {
    await connectDB();

    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          sessions: [],
        },
        { status: 401 }
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
          sessions: [],
        },
        { status: 401 }
      );
    }

    const candidateId =
      decoded.candidateId ||
      decoded.userId ||
      decoded.id;

    if (!candidateId) {
      return NextResponse.json(
        {
          success: false,
          message: "Candidate ID not found",
          sessions: [],
        },
        { status: 401 }
      );
    }

    const sessions = await MentorshipSession.find({
      candidateId,
      status: "completed",
    })
      .sort({ sessionDate: -1, createdAt: -1 })
      .lean();

    const formattedSessions = sessions.map((session) => ({
      id: session._id.toString(),

      mentorId: session.mentorId?.toString(),

      name: session.mentor.name,

      role: session.mentor.role,

      company: session.mentor.company,

      initials: session.mentor.initials,

      topic: session.topic,

      date: new Date(session.sessionDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),

      time: session.sessionTime,

      duration: `${session.duration} min`,

      status: "Completed",
    }));

    return NextResponse.json({
      success: true,
      sessions: formattedSessions,
    });
  } catch (error) {
    console.error("Past mentorship sessions error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch past sessions",
        sessions: [],
      },
      { status: 500 }
    );
  }
}






