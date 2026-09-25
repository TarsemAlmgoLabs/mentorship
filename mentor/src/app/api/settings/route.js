/// fetch current settings
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import MentorBookedSessions from "@/app/components/mentorBookings";
import Mentor from "@/app/models/Mentors";
import jwt from "jsonwebtoken";

export async function GET(request) {
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
      "6ab539c4a69b17ac18d8533b"||decoded.userId ||
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
      _id:userId,
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



export async function PUT(request) {
  try {
    await connectDB();

    const userId = "6ab539c4a69b17ac18d8533b";

    const body = await request.json();

    const {
      price,
      weeklyAvailability,
    } = body;

    console.log(
      "RECEIVED WEEKLY:",
      JSON.stringify(weeklyAvailability, null, 2)
    );

    // -----------------------------
    // Price validation
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
          message: "Price must be between ₹500 and ₹5,000",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Availability validation
    // -----------------------------

    if (
      !weeklyAvailability ||
      typeof weeklyAvailability !== "object" ||
      Array.isArray(weeklyAvailability)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid weekly availability",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Update
    // -----------------------------

    const mentor = await Mentor.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          price: Number(price),
          weeklyAvailability: weeklyAvailability,
        },
      },
      {
        new: true,
        runValidators: true,
        strict: false,
      }
    ).lean();

    if (!mentor) {
      return NextResponse.json(
        {
          success: false,
          message: "Mentor profile not found",
        },
        { status: 404 }
      );
    }

    console.log(
      "SAVED WEEKLY:",
      JSON.stringify(
        mentor.weeklyAvailability,
        null,
        2
      )
    );

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