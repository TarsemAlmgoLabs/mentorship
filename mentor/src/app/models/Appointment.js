import mongoose from "mongoose";

const mentorshipSessionSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      index: true,
    },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      index: true,
    },

    // Mentor snapshot so old sessions remain correct
    mentor: {
      name: {
        type: String,
      },

      role: {
        type: String,
      },

      company: {
        type: String,
      },

      initials: {
        type: String,
      },
    },

    topic: {
      type: String,
    },

    sessionDate: {
      type: Date,
    },

    sessionTime: {
      type: String,
    },

    duration: {
      type: Number,
      default: 30,
    },

    amount: {
      type: Number,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "processing", "paid"],
      default: "pending",
      index: true,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "mentorship_sessions",
  }
);

const MentorshipSession =
  mongoose.models.MentorshipSession ||
  mongoose.model("MentorshipSession", mentorshipSessionSchema);

export default MentorshipSession;