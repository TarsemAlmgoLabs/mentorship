import mongoose from "mongoose";

const mentorshipSessionSchema = new mongoose.Schema(
  {
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
      index: true,
    },

    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
      required: true,
      index: true,
    },

    // Mentor snapshot so old sessions remain correct
    mentor: {
      name: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      initials: {
        type: String,
        required: true,
      },
    },

    topic: {
      type: String,
      required: true,
    },

    sessionDate: {
      type: Date,
      required: true,
    },

    sessionTime: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      default: 45,
    },

    candidate: {
      name: {
        type: String,
        required: true,
      },

      initials: {
        type: String,
        required: true,
      },

      role: {
        type: String,
        default: "",
      },
    },

    amount: {
      type: Number,
      required: true,
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