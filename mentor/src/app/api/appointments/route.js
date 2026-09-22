import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorBookedSessions from "@/app/components/mentorBookings";
import Mentor from "@/app/models/Mentors";
import jwt from "jsonwebtoken";
// GET /api/appointments
export async function GET() {
  try {
    await connectDB();

    const appointments = await Appointment.find()
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


// get all mentors list
export async function GET() {
  try {
    await connectDB();

    const mentors = await Mentor.find({}).lean();

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




// get all upcoming sessions for candidate
export async function GET(request) {
  try {
    await connectDB();

    // Get token from cookie
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

    // Verify token
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
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

    // Current time
    const now = new Date();

    // Get upcoming sessions
    const sessions = await MentorshipSession.find({
      candidateId,
      status: "scheduled",
      sessionDate: {
        $gte: now,
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


// register as admin

export async function POST(request) {
  try {
    await connectDB();

    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
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
        },
        { status: 401 }
      );
    }

    const userId =
      decoded.userId ||
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

    // Verify token
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

    const userId =
      decoded.userId ||
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

    const now = new Date();

    // Fetch mentor's upcoming sessions
    const sessions = await MentorshipSession.find({
      mentorId: mentor._id,
      status: "scheduled",
      sessionDate: {
        $gte: now,
      },
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


/// payment earning dashboard

export async function GET(request) {
  try {
    await connectDB();

    // Get logged-in user token
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // Verify token
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
        },
        { status: 401 }
      );
    }

    const userId =
      decoded.userId ||
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

    // Find mentor
    const mentor = await Mentor.findOne({
      userId,
    }).select("_id");

    if (!mentor) {
      return NextResponse.json(
        {
          success: false,
          message: "Mentor profile not found",
        },
        { status: 404 }
      );
    }

    const mentorId = mentor._id;

    // Current date
    const now = new Date();

    // Start of current month
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // Start of next month
    const startOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );

    // --------------------------------
    // TOTAL EARNINGS
    // --------------------------------

    const totalResult = await MentorshipSession.aggregate([
      {
        $match: {
          mentorId,
          status: "completed",
          paymentStatus: {
            $in: ["paid", "processing"],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const totalEarnings =
      totalResult[0]?.total || 0;

    // --------------------------------
    // THIS MONTH
    // --------------------------------

    const monthlyResult =
      await MentorshipSession.aggregate([
        {
          $match: {
            mentorId,

            status: "completed",

            completedAt: {
              $gte: startOfMonth,
              $lt: startOfNextMonth,
            },

            paymentStatus: {
              $in: ["paid", "processing"],
            },
          },
        },
        {
          $group: {
            _id: null,

            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const thisMonth =
      monthlyResult[0]?.total || 0;

    // --------------------------------
    // PENDING PAYOUT
    // --------------------------------

    const pendingResult =
      await MentorshipSession.aggregate([
        {
          $match: {
            mentorId,

            status: "completed",

            paymentStatus: {
              $in: ["pending", "processing"],
            },
          },
        },
        {
          $group: {
            _id: null,

            total: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const pendingPayout =
      pendingResult[0]?.total || 0;

    // --------------------------------
    // COMPLETED SESSIONS
    // --------------------------------

    const completedSessions =
      await MentorshipSession.countDocuments({
        mentorId,
        status: "completed",
      });

    // --------------------------------
    // CURRENT MONTH DAILY EARNINGS
    // --------------------------------

    const dailyEarnings =
      await MentorshipSession.aggregate([
        {
          $match: {
            mentorId,

            status: "completed",

            completedAt: {
              $gte: startOfMonth,
              $lt: startOfNextMonth,
            },

            paymentStatus: {
              $in: ["paid", "processing"],
            },
          },
        },

        {
          $group: {
            _id: {
              $dayOfMonth: "$completedAt",
            },

            amount: {
              $sum: "$amount",
            },
          },
        },

        {
          $sort: {
            "_id": 1,
          },
        },
      ]);

    const earningsChart = dailyEarnings.map(
      (item) => ({
        day: item._id,
        amount: item.amount,
      })
    );

    return NextResponse.json(
      {
        success: true,

        earnings: {
          totalEarnings,
          thisMonth,
          pendingPayout,
          completedSessions,

          earningsChart,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Mentor earnings error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch mentor earnings",
      },
      { status: 500 }
    );
  }
}





/// fetch all past sessions

export async function GET(request) {
  try {
    await connectDB();

    // Get logged-in user token
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

    // Verify token
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

    const userId =
      decoded.userId ||
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



/// fetch current settings

export async function GET(request) {
  try {
    await connectDB();

    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
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
        },
        { status: 401 }
      );
    }

    const userId =
      decoded.userId ||
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

    const mentor = await Mentor.findOne({
      userId,
    })
      .select("price weeklyAvailability")
      .lean();

    if (!mentor) {
      return NextResponse.json(
        {
          success: false,
          message: "Mentor profile not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      settings: {
        price: mentor.price,
        weeklyAvailability:
          mentor.weeklyAvailability,
      },
    });
  } catch (error) {
    console.error(
      "Get mentor settings error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch mentor settings",
      },
      { status: 500 }
    );
  }
}


// update settings 

export async function PUT(request) {
  try {
    await connectDB();

    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
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
        },
        { status: 401 }
      );
    }

    const userId =
      decoded.userId ||
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
      price,
      weeklyAvailability,
    } = body;

    // -----------------------------
    // Validate price
    // -----------------------------

    if (
      price === undefined ||
      price === null ||
      Number(price) < 500 ||
      Number(price) > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Price must be between ₹500 and ₹5,000",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Validate availability
    // -----------------------------

    if (
      !weeklyAvailability ||
      typeof weeklyAvailability !== "object"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid weekly availability",
        },
        { status: 400 }
      );
    }

    const mentor = await Mentor.findOne({
      userId,
    });

    if (!mentor) {
      return NextResponse.json(
        {
          success: false,
          message: "Mentor profile not found",
        },
        { status: 404 }
      );
    }

    // -----------------------------
    // Update settings
    // -----------------------------

    mentor.price = Number(price);

    mentor.weeklyAvailability =
      weeklyAvailability;

    await mentor.save();

    return NextResponse.json({
      success: true,
      message: "Mentor settings updated successfully",

      settings: {
        price: mentor.price,
        weeklyAvailability:
          mentor.weeklyAvailability,
      },
    });
  } catch (error) {
    console.error(
      "Update mentor settings error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update mentor settings",
      },
      { status: 500 }
    );
  }
}