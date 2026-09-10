import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ComplaintHeatmap from "../components/ComplaintHeatmap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";

import {
  getComplaintAnalytics,
  getAllComplaints,
  assignDepartment,
  updateStatus,
  deleteComplaint,
} from "../services/complaintService";

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchComplaints();
    fetchAnalytics();
  }, []);

  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();
      setComplaints(data.complaints);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const data = await getComplaintAnalytics();
      setAnalytics(data.analytics);
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
      fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmDelete) return;

    try {
      await deleteComplaint(id);
      fetchComplaints();
      fetchAnalytics();
    } catch (error) {
      console.log(error);
    }
  };
  const statusCounts = {
    pending: complaints.filter((complaint) => complaint.status === "Pending")
      .length,

    underReview: complaints.filter(
      (complaint) => complaint.status === "Under Review",
    ).length,

    assigned: complaints.filter((complaint) => complaint.status === "Assigned")
      .length,

    inProgress: complaints.filter(
      (complaint) => complaint.status === "In Progress",
    ).length,

    resolved: complaints.filter((complaint) => complaint.status === "Resolved")
      .length,
  };
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500">Total Complaints</h3>
          <p className="text-3xl font-bold">{analytics?.total ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-5 mb-8">
          <h2 className="text-xl font-bold mb-5">
            <div className="bg-white rounded-xl shadow p-5 mb-8">
              <h2 className="text-xl font-bold mb-5">Status Distribution</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Pending", count: statusCounts.pending },
                        {
                          name: "Under Review",
                          count: statusCounts.underReview,
                        },
                        { name: "Assigned", count: statusCounts.assigned },
                        { name: "In Progress", count: statusCounts.inProgress },
                        { name: "Resolved", count: statusCounts.resolved },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Pending", value: statusCounts.pending },
                          {
                            name: "Under Review",
                            value: statusCounts.underReview,
                          },
                          { name: "Assigned", value: statusCounts.assigned },
                          {
                            name: "In Progress",
                            value: statusCounts.inProgress,
                          },
                          { name: "Resolved", value: statusCounts.resolved },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-yellow-100 p-4 rounded-lg">
              <p className="text-gray-600">Pending</p>
              <p className="text-2xl font-bold">{statusCounts.pending}</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-gray-600">Under Review</p>
              <p className="text-2xl font-bold">{statusCounts.underReview}</p>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-gray-600">Assigned</p>
              <p className="text-2xl font-bold">{statusCounts.assigned}</p>
            </div>

            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-gray-600">In Progress</p>
              <p className="text-2xl font-bold">{statusCounts.inProgress}</p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-gray-600">Resolved</p>
              <p className="text-2xl font-bold">{statusCounts.resolved}</p>
            </div>
          </div>
        </div>

        <ComplaintHeatmap complaints={analytics?.complaints || []} />

        <div className="bg-blue-100 p-5 rounded-xl shadow">
          <h3>Road Complaints</h3>
          <p className="text-3xl font-bold">{analytics?.road ?? 0}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h3>Waste Complaints</h3>
          <p className="text-3xl font-bold">{analytics?.waste ?? 0}</p>
        </div>

        <div className="bg-yellow-100 p-5 rounded-xl shadow">
          <h3>Pending</h3>
          <p className="text-3xl font-bold">{analytics?.pending ?? 0}</p>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <h3>Resolved</h3>
          <p className="text-3xl font-bold">{analytics?.resolved ?? 0}</p>
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
              <th className="p-4 text-left">Actions</th>
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

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/complaint/${complaint._id}`)
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(complaint._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
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
