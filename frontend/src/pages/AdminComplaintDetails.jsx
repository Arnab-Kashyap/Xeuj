import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplaintById } from "../services/complaintService";

function AdminComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComplaint = async () => {
    try {
      const data = await getComplaintById(id);
      setComplaint(data.complaint);
    } catch (error) {
      console.log(error);
    }
  };

  if (!complaint) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Complaint Details</h1>

        <div className="space-y-4">
          <p><strong>Title:</strong> {complaint.title}</p>

          <p><strong>Category:</strong> {complaint.category}</p>

          <p><strong>Location:</strong> {complaint.location}</p>

          <p><strong>Description:</strong> {complaint.description}</p>

          <p><strong>Status:</strong> {complaint.status}</p>

          <p><strong>Department:</strong> {complaint.department}</p>

          {complaint.image && (
            <img
              src={complaint.image}
              alt="Complaint"
              className="rounded-lg w-full max-h-96 object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintDetails;