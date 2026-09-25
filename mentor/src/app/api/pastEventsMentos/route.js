/// fetch all past sessions
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorshipSession from "@/app/models/Appointment";
import Mentor from "@/app/models/Mentors";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await connectDB();

    // Get logged-in user token
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
    //   decoded = jwt.verify(
    //     token,
    //     process.env.JWT_SECRET
    //   );
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

    const userId =
      "6ab267ecd2a723238a1fc01f" || decoded.userId ||
      decoded.candidateId ||
      decoded.id;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID not found",
          sessions: [],
        },
        { status: 401 }
      );
    }

    // Find mentor profile
    const mentor = await Mentor.findOne({
      userId,
    }).select("_id");

    if (!mentor) {
      return NextResponse.json(
        {
          success: false,
          message: "Mentor profile not found",
          sessions: [],
        },
        { status: 404 }
      );
    }

    const mentorId = mentor._id;

    // Current date
    const now = new Date();

    // Current month start
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // Next month start
    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    // --------------------------------
    // PAST SESSIONS
    // --------------------------------

    const sessions = await MentorshipSession.find({
      mentorId,
      status: "completed",
    })
      .sort({
        completedAt: -1,
        sessionDate: -1,
      })
      .lean();

    // --------------------------------
    // TOTAL SESSIONS
    // --------------------------------

    const totalSessions = sessions.length;

    // --------------------------------
    // THIS MONTH
    // --------------------------------

    const thisMonth = sessions.filter((session) => {
      const date = session.completedAt
        ? new Date(session.completedAt)
        : new Date(session.sessionDate);

      return (
        date >= startOfMonth &&
        date < startOfNextMonth
      );
    }).length;

    // --------------------------------
    // TOTAL EARNED
    // --------------------------------

    const totalEarned = sessions.reduce(
      (total, session) => {
        return total + (Number(session.amount) || 0);
      },
      0
    );

    // --------------------------------
    // FORMAT SESSIONS
    // --------------------------------

    const formattedSessions = sessions.map(
      (session) => ({
        id: session._id.toString(),

        candidateId:
          session.candidateId?.toString(),

        candidateName:
          session.candidate?.name ||
          "Candidate",

        candidateInitials:
          session.candidate?.initials ||
          "C",

        candidateRole:
          session.candidate?.role ||
          "",

        topic: session.topic,

        date: new Date(
          session.sessionDate
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

        duration: `${session.duration} min`,

        status: "Completed",

        amount: Number(session.amount) || 0,

        paymentStatus:
          session.paymentStatus || "pending",
      })
    );

    return NextResponse.json(
      {
        success: true,

        summary: {
          totalSessions,
          thisMonth,
          totalEarned,
        },

        sessions: formattedSessions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Mentor past sessions error:",
      error
    );

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
