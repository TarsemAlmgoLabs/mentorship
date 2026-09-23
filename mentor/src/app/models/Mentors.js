import mongoose from "mongoose";

const dayAvailabilitySchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      default: false,
    },

    startTime: {
      type: String,
      default: null,
    },

    endTime: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  }
);

const mentorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    initials: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    expertise: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      required: true,
    },

    rating: {
      type: String,
      default: "0",
    },

    sessions: {
      type: String,
      default: "0",
    },

    price: {
      type: Number,
      required: true,
    },

    weeklyAvailability: {
      monday: {
        type: dayAvailabilitySchema,
        default: () => ({}),
      },

      tuesday: {
        type: dayAvailabilitySchema,
        default: () => ({}),
      },

      wednesday: {
        type: dayAvailabilitySchema,
        default: () => ({}),
      },

      thursday: {
        type: dayAvailabilitySchema,
        default: () => ({}),
      },

      friday: {
        type: dayAvailabilitySchema,
        default: () => ({}),
      },

      saturday: {
        type: dayAvailabilitySchema,
        default: () => ({}),
      },

      sunday: {
        type: dayAvailabilitySchema,
        default: () => ({}),
      },
    },

    mentorStatus: {
      type: String,
      enum: ["pending", "active", "rejected"],
      default: "pending",
      index: true,
    },

    availability: {
      type: String,
      default: "Unavailable",
    },
  },
  {
    timestamps: true,
    collection: "mentors",
  }
);

const Mentors =
  mongoose.models.Mentor ||
  mongoose.model("Mentors", mentorSchema);

export default Mentors;