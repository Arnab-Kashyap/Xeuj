import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplaintById } from "../services/complaintService";
import LocationMap from "../components/LocationMap";

function AdminComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const data = await getComplaintById(id);
      setComplaint(data.complaint);
    } catch (error) {
      console.error(error);
    }
  };

  if (!complaint) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  const latitude = complaint.coordinates?.latitude;
  const longitude = complaint.coordinates?.longitude;

  const hasCoordinates =
    typeof latitude === "number" &&
    typeof longitude === "number";

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Complaint Details
            </h1>

            <p className="text-gray-500 mt-1">
              {complaint.complaintId}
            </p>
          </div>

          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-medium">
            {complaint.status}
          </span>
        </div>

        <div className="space-y-6">

          {complaint.image && (
            <div>
              <h3 className="font-semibold mb-2">
                Complaint Image
              </h3>

              <img
                src={complaint.image}
                alt="Complaint"
                className="w-full max-h-[450px] object-cover rounded-xl border"
              />
            </div>
          )}

          <div>
            <h3 className="font-semibold text-lg">
              Title
            </h3>

            <p className="mt-1 text-gray-700">
              {complaint.title}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Description
            </h3>

            <p className="mt-1 text-gray-700">
              {complaint.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <h3 className="font-semibold">
                Category
              </h3>

              <p className="mt-1 text-gray-700">
                {complaint.category}
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Department
              </h3>

              <p className="mt-1 text-gray-700">
                {complaint.department}
              </p>
            </div>

          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">
              Reported Location
            </h3>

            <p className="text-gray-700 mb-4">
              {complaint.location}
            </p>

            {hasCoordinates ? (
              <>
                <LocationMap
                  latitude={latitude}
                  longitude={longitude}
                  readOnly={true}
                />

                <div className="mt-3 bg-gray-50 border rounded-lg p-4 text-sm">
                  <p>
                    <span className="font-semibold">
                      Latitude:
                    </span>{" "}
                    {latitude}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Longitude:
                    </span>{" "}
                    {longitude}
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
                Exact coordinates are not available for
                this complaint.
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Status
            </h3>

            <p className="mt-1 text-gray-700">
              {complaint.status}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">
              Complaint Timeline
            </h3>

            {complaint.timeline?.length > 0 ? (
              <div className="space-y-3">
                {complaint.timeline.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-green-600 pl-4 py-2"
                    >
                      <p className="font-medium">
                        {item.status}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          item.updatedAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-gray-500">
                No timeline information available.
              </p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Reported On
            </h3>

            <p className="mt-1 text-gray-700">
              {new Date(
                complaint.createdAt
              ).toLocaleString()}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminComplaintDetails;