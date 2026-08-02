import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { getMyComplaints } from "../services/complaintService";

function TrackComplaint() {
  const { user } = useUser();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchComplaints = async () => {
      try {
        const data = await getMyComplaints(user.id);
        setComplaints(data.complaints);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Track Complaint
        </h1>

        {complaints.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold">
              No complaints found
            </h2>

            <p className="text-gray-500 mt-2">
              Submit your first complaint to start tracking.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {complaint.title}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {complaint.complaintId}
                    </p>

                    <p className="mt-3">
                      <span className="font-medium">
                        Category:
                      </span>{" "}
                      {complaint.category}
                    </p>

                    <p>
                      <span className="font-medium">
                        Location:
                      </span>{" "}
                      {complaint.location}
                    </p>
                  </div>

                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
                    {complaint.status}
                  </span>
                </div>

                <Link
                  to={`/complaints/${complaint._id}`}
                  className="inline-block mt-6 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition"
                >
                  View Tracking
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;