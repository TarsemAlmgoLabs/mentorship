import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorshipSession from "@/app/models/Appointment";
import Mentor from "@/app/models/Mentors";
import jwt from "jsonwebtoken";


// register as mentor

export async function POST(request) {
  try {
    await connectDB();

    // const token = request.cookies.get("accessToken")?.value;

    // if (!token) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Unauthorized",
    //     },
    //     { status: 401 }
    //   );
    // }

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
    //     },
    //     { status: 401 }
    //   );
    // }

    const userId =
      "6ab267ecd2a723238a1fc01f"||decoded.userId ||
      decoded.candidateId ||
      decoded.id;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID not found",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      name,
      role,
      company,
      initials,
      expertise,
      skills,
      experience,
      price,
      weeklyAvailability,
    } = body;

    if (
      !name ||
      !role ||
      !company ||
      !expertise ||
      !experience ||
      !price
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required mentor details are missing",
        },
        { status: 400 }
      );
    }

    // Check if already registered
    const existingMentor = await Mentor.findOne({
      userId,
    });

    if (existingMentor) {
      return NextResponse.json(
        {
          success: false,
          message: "You are already registered as a mentor",
        },
        { status: 409 }
      );
    }

    const mentor = await Mentor.create({
      userId,

      name,
      role,
      company,

      initials:
        initials ||
        name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),

      expertise,

      skills: skills || [],

      experience,

      price: Number(price),

      weeklyAvailability:
        weeklyAvailability || {},

      mentorStatus: "pending",

      rating: "0",

      sessions: "0",

      availability: "Available",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Mentor registration submitted successfully",
        mentor,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Mentor registration error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register as mentor",
      },
      { status: 500 }
    );
  }
}





/// fetch all upcoming sessions for mentor
export async function GET(request) {
  try {
    await connectDB();

    // Get login token
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
      "6ab267ecd2a723238a1fc01f"|| decoded.userId ||
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

    // Find mentor belonging to logged-in user
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

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // Fetch mentor's upcoming sessions
    const sessions = await MentorshipSession.find({
      mentorId: mentor._id,
      status: "scheduled",
      // sessionDate: {
      //   $gte: startOfToday,
      // },
    })
      .sort({ sessionDate: 1 })
      .lean();

    const formattedSessions = sessions.map((session) => ({
      id: session._id.toString(),

      candidateId: session.candidateId?.toString(),

      mentorId: session.mentorId?.toString(),

      // Candidate details
      candidateName:
        session.candidate?.name || "Candidate",

      candidateInitials:
        session.candidate?.initials || "C",

      candidateRole:
        session.candidate?.role || "",

      topic: session.topic,

      date: new Date(
        session.sessionDate
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      time: session.sessionTime,

      duration: `${session.duration} min`,

      status: "Upcoming",

      sessionLink:
        session.sessionLink || null,
    }));

    return NextResponse.json(
      {
        success: true,
        sessions: formattedSessions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Mentor upcoming sessions error:",
      error
    );

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









