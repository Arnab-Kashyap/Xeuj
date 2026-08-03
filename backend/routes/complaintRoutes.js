import express from "express";
import upload from "../middleware/upload.js";

import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  getMyComplaints,
  assignDepartment,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", upload.single("image"), createComplaint);

router.get("/", getAllComplaints);

router.get("/user/:clerkId", getMyComplaints);

router.get("/:id", getComplaintById);

router.put("/:id/department", assignDepartment);

router.put("/:id/status", updateComplaintStatus);

router.delete("/:id", deleteComplaint);

export default router;