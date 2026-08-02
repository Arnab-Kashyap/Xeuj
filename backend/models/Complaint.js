import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    complaintId: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Road", "Waste"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    coordinates: {
      latitude: {
        type: Number,
        default: null,
      },

      longitude: {
        type: Number,
        default: null,
      },
    },

    image: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      enum: ["Pending", "PWD", "Municipality"],
      default: "Pending",
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Under Review",
        "Assigned",
        "In Progress",
        "Resolved",
      ],
      default: "Pending",
    },

    timeline: [
      {
        status: {
          type: String,
          required: true,
        },

        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Complaint", complaintSchema);