import Complaint from "../models/Complaint.js";
import cloudinary from "../config/cloudinary.js";


export const createComplaint = async (req, res) => {
  try {
    console.count("createComplaint");
    const lastComplaint = await Complaint.findOne().sort({
      createdAt: -1,
    });

    console.log(
      "Last Complaint:",
      lastComplaint?.complaintId
    );

    let nextNumber = 1;

    if (
      lastComplaint &&
      lastComplaint.complaintId
    ) {
      const lastNumber = parseInt(
        lastComplaint.complaintId.split("-")[2]
      );

      nextNumber = lastNumber + 1;
    }

    const complaintId = `XEUJ-2026-${String(
      nextNumber
    ).padStart(4, "0")}`;

    console.log(
      "Generated Complaint ID:",
      complaintId
    );

    let imageUrl = "";

    if (req.file) {
      console.log("Uploading image...");

      const uploadedImage = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "xeuj-complaints",
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            )
            .end(req.file.buffer);
        }
      );

      imageUrl = uploadedImage.secure_url;

      console.log(
        "Image uploaded:",
        imageUrl
      );
    }

    let coordinates = {
      latitude: null,
      longitude: null,
    };

    if (req.body.coordinates) {
      try {
        const parsedCoordinates =
          JSON.parse(req.body.coordinates);

        coordinates = {
          latitude: parsedCoordinates.lat,
          longitude: parsedCoordinates.lng,
        };

        console.log(
          "Coordinates:",
          coordinates
        );
      } catch (error) {
        console.error(
          "Invalid coordinates:",
          error
        );
      }
    }

    console.log("Saving complaint...");

    const complaint = await Complaint.create({
      ...req.body,

      complaintId,

      image: imageUrl,

      coordinates,

      timeline: [
        {
          status: "Pending",
        },
      ],
    });

    console.log(
      "Complaint saved successfully:",
      complaint.complaintId
    );

    res.status(201).json({
      success: true,

      message:
        "Complaint submitted successfully",

      complaint,
    });

  } catch (error) {

    console.error(
      "CREATE COMPLAINT ERROR"
    );

    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Complaint ID already exists. Please try again.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllComplaints = async (
  req,
  res
) => {
  try {

    const complaints =
      await Complaint.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      complaints,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyComplaints = async (
  req,
  res
) => {
  try {

    const complaints =
      await Complaint.find({
        clerkId: req.params.clerkId,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      complaints,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComplaintById = async (
  req,
  res
) => {
  try {

    const complaint =
      await Complaint.findById(
        req.params.id
      );

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

export const assignDepartment = async (
  req,
  res
) => {
  try {

    const complaint =
      await Complaint.findById(
        req.params.id
      );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.department =
      req.body.department;

    await complaint.save();

    res.status(200).json({
      success: true,

      message:
        "Department assigned successfully",

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

export const updateComplaintStatus = async (
  req,
  res
) => {
  try {

    const complaint =
      await Complaint.findById(
        req.params.id
      );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.status =
      req.body.status;

    complaint.timeline.push({
      status: req.body.status,
      updatedAt: new Date(),
    });

    await complaint.save();

    res.status(200).json({
      success: true,

      message:
        "Status updated successfully",

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

export const deleteComplaint = async (
  req,
  res
) => {
  try {

    const complaint =
      await Complaint.findByIdAndDelete(
        req.params.id
      );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,

      message:
        "Complaint deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};