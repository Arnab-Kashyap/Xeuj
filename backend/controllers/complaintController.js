import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user");

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("user");

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });
}
};