import { useEffect, useState } from "react";
import {
  getAllComplaints,
  assignDepartment,
  updateStatus,
} from "../services/complaintService";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      setComplaints(data.complaints);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDepartmentChange = async (id, department) => {
    try {
      await assignDepartment(id, department);
      fetchComplaints();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status);
      fetchComplaints();
    } catch (error) {
      console.log(error);
    }
  };

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending",
  ).length;

  const progressComplaints = complaints.filter(
    (complaint) => complaint.status === "In Progress",
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved",
  ).length;

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title?.toLowerCase().includes(search.toLowerCase()) ||
      complaint.location?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || complaint.category === category;

    const matchesStatus = status === "All" || complaint.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Complaints</h3>
          <p className="text-3xl font-bold">{totalComplaints}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <h3>Pending</h3>
          <p className="text-3xl font-bold">{pendingComplaints}</p>
        </div>

        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h3>In Progress</h3>
          <p className="text-3xl font-bold">{progressComplaints}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h3>Resolved</h3>
          <p className="text-3xl font-bold">{resolvedComplaints}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-600"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="All">All Categories</option>
          <option value="Road">Road</option>
          <option value="Waste">Waste</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Under Review">Under Review</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((complaint) => (
                <tr key={complaint._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{complaint.title}</td>

                  <td className="p-4">{complaint.category}</td>

                  <td className="p-4">{complaint.location}</td>

                  <td className="p-4">
                    <select
                      value={complaint.department || "Pending"}
                      onChange={(e) =>
                        handleDepartmentChange(complaint._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="PWD">PWD</option>
                      <option value="Municipality">Municipality</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <select
                      value={complaint.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(complaint._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No complaints found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
