import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { getMyComplaints } from "../services/complaintService";
import LocationMap from "../components/LocationMap";

function TrackComplaint() {
  const { user } = useUser();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchComplaints = async () => {
      try {
        const data = await getMyComplaints(user.id);
        setComplaints(data.complaints || []);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <h2 className="text-xl font-semibold">
            Please login to track your complaints.
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <h2 className="text-xl font-semibold">Loading complaints...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Track Complaint</h1>

        {complaints.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <h2 className="text-xl font-semibold">No complaints found</h2>

            <p className="text-gray-500 mt-2">
              Submit your first complaint to start tracking.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {complaints.map((complaint) => {
              const latitude = complaint.coordinates?.latitude;

              const longitude = complaint.coordinates?.longitude;

              const hasCoordinates =
                typeof latitude === "number" && typeof longitude === "number";

              return (
                <div
                  key={complaint._id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold">
                          {complaint.title}
                        </h2>

                        <p className="text-gray-500 mt-1">
                          {complaint.complaintId}
                        </p>

                        <p className="mt-4">
                          <span className="font-medium">Category:</span>{" "}
                          {complaint.category}
                        </p>

                        <p className="mt-1">
                          <span className="font-medium">Location:</span>{" "}
                          {complaint.location}
                        </p>

                        <p className="mt-1">
                          <span className="font-medium">Department:</span>{" "}
                          {complaint.department}
                        </p>
                      </div>

                      <span className="self-start bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
                        {complaint.status}
                      </span>
                    </div>

                    {complaint.description && (
                      <div className="mt-5">
                        <h3 className="font-medium">Description</h3>

                        <p className="text-gray-600 mt-1">
                          {complaint.description}
                        </p>
                      </div>
                    )}

                    {complaint.image && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Uploaded Image</h3>

                        <img
                          src={complaint.image}
                          alt={complaint.title}
                          className="w-full max-w-lg h-64 object-cover rounded-xl border"
                        />
                      </div>
                    )}

                    {hasCoordinates && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-3">Complaint Location</h3>

                        <LocationMap
                          latitude={latitude}
                          longitude={longitude}
                          readOnly={true}
                        />

                        <div className="mt-3 text-sm text-gray-500">
                          <p>Latitude: {latitude}</p>

                          <p>Longitude: {longitude}</p>
                        </div>
                      </div>
                    )}

                    <Link
                      to={`/complaints/${complaint._id}`}
                      className="inline-block mt-6 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg transition"
                    >
                      View Tracking
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;
