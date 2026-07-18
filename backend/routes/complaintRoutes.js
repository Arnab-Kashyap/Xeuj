import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  assignDepartment,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.get("/:id", getComplaintById);
router.put("/:id/department", assignDepartment);
router.put("/:id/status", updateComplaintStatus);

export default router;