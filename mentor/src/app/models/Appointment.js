import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    mentorName: {
      type: String,
      required: true,
      trim: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      default: 60,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
