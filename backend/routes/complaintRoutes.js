import {
  createComplaint,
  getAllComplaints,
  getMyComplaints,
  getComplaintById,
  assignDepartment,
  updateComplaintStatus,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.get("/user/:userId", getMyComplaints);
router.get("/:id", getComplaintById);
router.put("/:id/department", assignDepartment);
router.put("/:id/status", updateComplaintStatus);
router.delete("/:id", deleteComplaint);

export default router;