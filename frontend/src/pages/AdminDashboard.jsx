import { useEffect, useState } from "react";
import { getAllComplaints } from "../services/complaintService";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      setComplaints(data.complaints);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid gap-5">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold">
              {complaint.title}
            </h2>

            <p className="mt-2">
              {complaint.description}
            </p>

            <p className="mt-3">
              <strong>Category:</strong> {complaint.category}
            </p>

            <p>
              <strong>Location:</strong> {complaint.location}
            </p>

            <p>
              <strong>Status:</strong> {complaint.status}
            </p>

            <p>
              <strong>Department:</strong> {complaint.department}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;