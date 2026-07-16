import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.get("/:id", getComplaintById);

export default router;