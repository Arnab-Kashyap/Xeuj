import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  assignDepartment,
  updateStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.get("/:id", getComplaintById);
router.put("/:id/department", assignDepartment);
router.put("/:id/status", updateStatus);
router.delete("/:id", deleteComplaint);

export default router;