function Features() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              Report Waste Issues
            </h3>
            <p className="text-gray-600">
              Report garbage and cleanliness issues in your area.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              Report Road Problems
            </h3>
            <p className="text-gray-600">
              Report potholes, damaged roads, and traffic-related issues.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="text-xl font-semibold mb-2">
              Track Complaint Status
            </h3>
            <p className="text-gray-600">
              Monitor complaint progress from submission to resolution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;