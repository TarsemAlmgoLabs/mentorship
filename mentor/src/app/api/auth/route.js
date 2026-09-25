import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import connectDB from "@/app/lib/db";

export async function GET(request) {
  try {
    await connectDB();

    // 1. Read cookie
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication token missing",
        },
        { status: 401 }
      );
    }

    // 2. Verify token
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 401 }
      );
    }

    // 3. Get user ID
    const userId =
      decoded.userId ||
      decoded.candidateId ||
      decoded.id ||
      decoded._id;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID not found in token",
        },
        { status: 401 }
      );
    }

    // 4. Connect to test DB
    const testDB = mongoose.connection.useDb("test");

    // 5. Find user
    const user = await testDB.collection("users").findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    // 6. Authenticated
    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Auth verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
      },
      { status: 500 }
    );
  }
}