import { useState } from "react";
import { trackComplaint } from "../services/complaintService";

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!complaintId) return;

    try {
      const data = await trackComplaint(complaintId);
      setComplaint(data.complaint);
      setError("");
    } catch (err) {
      setComplaint(null);
      setError("Complaint not found.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6">Track Complaint</h1>

        <input
          type="text"
          placeholder="Enter Complaint ID"
          value={complaintId}
          onChange={(e) => setComplaintId(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleTrack}
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
        >
          Track Status
        </button>

        {error && (
          <p className="text-red-600 mt-4 text-center">{error}</p>
        )}

        {complaint && (
          <div className="mt-6 p-5 border rounded-lg space-y-2">
            <p>
              <strong>Title:</strong> {complaint.title}
            </p>

            <p>
              <strong>Category:</strong> {complaint.category}
            </p>

            <p>
              <strong>Location:</strong> {complaint.location}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {complaint.department || "Pending"}
            </p>

            <p>
              <strong>Status:</strong> {complaint.status}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {complaint.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;