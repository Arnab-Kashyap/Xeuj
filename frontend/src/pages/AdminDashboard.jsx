return (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-3xl font-bold mb-6">
      Admin Dashboard
    </h1>

    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Department</th>
          </tr>
        </thead>

        <tbody>
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <tr
                key={complaint._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">{complaint.title}</td>
                <td className="p-4">{complaint.category}</td>
                <td className="p-4">{complaint.location}</td>
                <td className="p-4">{complaint.status}</td>
                <td className="p-4">{complaint.department}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center p-6 text-gray-500"
              >
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);