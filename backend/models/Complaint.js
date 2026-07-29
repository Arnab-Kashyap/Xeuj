import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["Pending", "Under Review", "Assigned", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Complaint", complaintSchema);
