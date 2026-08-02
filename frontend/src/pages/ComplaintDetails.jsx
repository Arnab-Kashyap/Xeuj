import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplaintById } from "../services/complaintService";

const steps = [
  "Pending",
  "Under Review",
  "Assigned",
  "In Progress",
  "Resolved",
];

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const data = await getComplaintById(id);
        setComplaint(data.complaint);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaint();
  }, [id]);

  if (!complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  const currentStep = steps.indexOf(complaint.status);

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-3xl font-bold">
          {complaint.title}
        </h1>

        <p className="text-gray-500 mt-2">
          {complaint.complaintId}
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mt-8 mb-10">

          <div className="grid md:grid-cols-2 gap-4">

            <p>
              <span className="font-semibold">
                Category:
              </span>{" "}
              {complaint.category}
            </p>

            <p>
              <span className="font-semibold">
                Department:
              </span>{" "}
              {complaint.department}
            </p>

            <p>
              <span className="font-semibold">
                Status:
              </span>{" "}
              {complaint.status}
            </p>

            <p>
              <span className="font-semibold">
                Location:
              </span>{" "}
              {complaint.location}
            </p>

          </div>

          <div className="mt-6">

            <h2 className="font-semibold mb-2">
              Description
            </h2>

            <p className="text-gray-600">
              {complaint.description}
            </p>

          </div>

        </div>

        <h2 className="text-2xl font-bold mb-8">
          Progress Timeline
        </h2>

        <div className="space-y-8">

          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-5"
            >
              <div className="flex flex-col items-center">

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index <= currentStep
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                >
                  ✓
                </div>

                {index !== steps.length - 1 && (
                  <div
                    className={`w-1 h-16 ${
                      index < currentStep
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  />
                )}

              </div>

              <div>

                <h3 className="font-semibold text-lg">
                  {step}
                </h3>

                <p className="text-gray-500">
                  {index <= currentStep
                    ? "Completed"
                    : "Waiting"}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default ComplaintDetails;