
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorshipSession from "@/app/models/Appointment";
import Mentor from "@/app/models/Mentors";
import jwt from "jsonwebtoken";
// get all upcoming sessions for candidate
export async function GET(request) {
  try {
    await connectDB();

    // Get token from cookie
    // const token = request.cookies.get("accessToken")?.value;

    // if (!token) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Unauthorized",
    //       sessions: [],
    //     },
    //     { status: 401 }
    //   );
    // }

    // Verify token
    // let decoded;

    // try {
    //   decoded = jwt.verify(token, process.env.JWT_SECRET);
    // } catch (error) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Invalid or expired token",
    //       sessions: [],
    //     },
    //     { status: 401 }
    //   );
    // }

    const candidateId =
      "6a3b62c917b1afdc92752da1"|| decoded.candidateId ||
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

    // Current time
   const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Get upcoming sessions
    const sessions = await MentorshipSession.find({
      candidateId,
      status: "scheduled",
      sessionDate: {
        $gte: startOfToday,
      },
    })
      .sort({ sessionDate: 1 })
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

      status: "Upcoming",

      sessionLink: session.sessionLink || null,
    }));

    console.log(formattedSessions)

    return NextResponse.json({
      success: true,
      sessions: formattedSessions,
    });
  } catch (error) {
    console.error("Upcoming mentorship sessions error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch upcoming sessions",
        sessions: [],
      },
      { status: 500 }
    );
  }
}
