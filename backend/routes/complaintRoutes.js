import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  assignDepartment,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.get("/:id", getComplaintById);
router.put("/:id/department", assignDepartment);
router.put("/:id/status", updateComplaintStatus);
router.delete("/:id", deleteComplaint);

export default router;