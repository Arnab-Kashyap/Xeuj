import Card from "../components/Card";

function Dashboard() {
  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          My Complaints
        </h1>

        <div className="grid gap-4">

          <Card>
            <h3 className="font-semibold text-lg">
              Garbage Dump Near Market
            </h3>

            <p className="text-gray-600 mt-2">
              Waste Issue
            </p>

            <span className="inline-block mt-3 px-3 py-1 bg-yellow-100 rounded-full text-sm">
              Under Review
            </span>
          </Card>

          <Card>
            <h3 className="font-semibold text-lg">
              Road Pothole
            </h3>

            <p className="text-gray-600 mt-2">
              Road Issue
            </p>

            <span className="inline-block mt-3 px-3 py-1 bg-green-100 rounded-full text-sm">
              Resolved
            </span>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;