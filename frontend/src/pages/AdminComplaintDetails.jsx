import { useParams } from "react-router-dom";

function AdminComplaintDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Complaint Details</h1>

        <p className="text-gray-600 mb-4">
          Complaint ID: <span className="font-semibold">{id}</span>
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Title</h3>
            <p>Loading...</p>
          </div>

          <div>
            <h3 className="font-semibold">Category</h3>
            <p>Loading...</p>
          </div>

          <div>
            <h3 className="font-semibold">Location</h3>
            <p>Loading...</p>
          </div>

          <div>
            <h3 className="font-semibold">Description</h3>
            <p>Loading...</p>
          </div>

          <div>
            <h3 className="font-semibold">Status</h3>
            <p>Loading...</p>
          </div>

          <div>
            <h3 className="font-semibold">Department</h3>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminComplaintDetails;