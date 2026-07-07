import { Link } from "react-router-dom";

function Features() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/report"
            className="p-6 border rounded-xl hover:border-green-700 hover:shadow-md transition block"
          >
            <h3 className="text-xl font-semibold mb-2">
              Report Waste Issues
            </h3>

            <p className="text-gray-600">
              Easily report garbage dumps and waste-related problems in your area.
            </p>
          </Link>

          <Link
            to="/report"
            className="p-6 border rounded-xl hover:border-green-700 hover:shadow-md transition block"
          >
            <h3 className="text-xl font-semibold mb-2">
              Report Road Problems
            </h3>

            <p className="text-gray-600">
              Report potholes, damaged roads, and other infrastructure issues.
            </p>
          </Link>

          <Link
            to="/track"
            className="p-6 border rounded-xl hover:border-green-700 hover:shadow-md transition block"
          >
            <h3 className="text-xl font-semibold mb-2">
              Track Complaint Status
            </h3>

            <p className="text-gray-600">
              Monitor your complaint from submission to resolution.
            </p>
          </Link>

        </div>
      </div>
    </section>
  );
}

export default Features;