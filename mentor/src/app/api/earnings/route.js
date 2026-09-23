import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorBookedSessions from "@/app/components/mentorBookings";
import Mentor from "@/app/models/Mentors";
import jwt from "jsonwebtoken";
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

