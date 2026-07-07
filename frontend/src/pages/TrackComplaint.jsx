function TrackComplaint() {
  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold mb-6">
          Track Complaint
        </h1>

        <input
          type="text"
          placeholder="Enter Complaint ID"
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button className="w-full bg-green-700 text-white py-3 rounded-lg">
          Track Status
        </button>

        <div className="mt-6 p-4 border rounded-lg">
          <p><strong>Status:</strong> Submitted</p>
          <p><strong>Issue Type:</strong> Waste</p>
          <p><strong>Location:</strong> Guwahati</p>
        </div>
      </div>
    </div>
  );
}

export default TrackComplaint;