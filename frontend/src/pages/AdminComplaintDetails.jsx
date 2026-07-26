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

        <div className="space-y-5">
          {complaint.image && (
            <img
              src={complaint.image}
              alt="Complaint"
              className="w-full h-80 object-cover rounded-lg"
            />
          )}

          <div>
            <h3 className="font-semibold">Title</h3>
            <p>{complaint.title}</p>
          </div>

          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{complaint.description}</p>
          </div>

          <div>
            <h3 className="font-semibold">Category</h3>
            <p>{complaint.category}</p>
          </div>

          <div>
            <h3 className="font-semibold">Location</h3>
            <p>{complaint.location}</p>
          </div>

          <div>
            <h3 className="font-semibold">Department</h3>
            <p>{complaint.department}</p>
          </div>

          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{complaint.status}</p>
          </div>

          <div>
            <h3 className="font-semibold">Reported On</h3>
            <p>{new Date(complaint.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintDetails;
