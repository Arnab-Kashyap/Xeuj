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
  Cell,
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
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
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
      "Are you sure you want to delete this complaint?"
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
    pending: complaints.filter(
      (complaint) => complaint.status === "Pending"
    ).length,
    underReview: complaints.filter(
      (complaint) => complaint.status === "Under Review"
    ).length,
    assigned: complaints.filter(
      (complaint) => complaint.status === "Assigned"
    ).length,
    inProgress: complaints.filter(
      (complaint) => complaint.status === "In Progress"
    ).length,
    resolved: complaints.filter(
      (complaint) => complaint.status === "Resolved"
    ).length,
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title?.toLowerCase().includes(search.toLowerCase()) ||
      complaint.location?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || complaint.category === category;

    const matchesStatus =
      status === "All" || complaint.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const chartData = [
    {
      name: "Pending",
      count: statusCounts.pending,
      color: "#eab308",
    },
    {
      name: "Under Review",
      count: statusCounts.underReview,
      color: "#3b82f6",
    },
    {
      name: "Assigned",
      count: statusCounts.assigned,
      color: "#8b5cf6",
    },
    {
      name: "In Progress",
      count: statusCounts.inProgress,
      color: "#f97316",
    },
    {
      name: "Resolved",
      count: statusCounts.resolved,
      color: "#16a34a",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>

            <p className="mt-4 text-gray-500">
              Loading dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>

              <p className="text-gray-500 mt-1">
                Monitor and manage civic complaints
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">
                  Total Complaints
                </p>

                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {analytics?.total ?? 0}
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-100">
                <p className="text-sm text-blue-600">
                  Road Complaints
                </p>

                <p className="text-3xl font-bold text-blue-700 mt-2">
                  {analytics?.road ?? 0}
                </p>
              </div>

              <div className="bg-green-50 p-5 rounded-xl shadow-sm border border-green-100">
                <p className="text-sm text-green-600">
                  Waste Complaints
                </p>

                <p className="text-3xl font-bold text-green-700 mt-2">
                  {analytics?.waste ?? 0}
                </p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-xl shadow-sm border border-yellow-100">
                <p className="text-sm text-yellow-700">
                  Pending
                </p>

                <p className="text-3xl font-bold text-yellow-700 mt-2">
                  {analytics?.pending ?? 0}
                </p>
              </div>

              <div className="bg-emerald-50 p-5 rounded-xl shadow-sm border border-emerald-100">
                <p className="text-sm text-emerald-600">
                  Resolved
                </p>

                <p className="text-3xl font-bold text-emerald-700 mt-2">
                  {analytics?.resolved ?? 0}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-5">
                  Status Distribution
                </h2>

                <div className="h-[350px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 40,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />

                      <XAxis
                        dataKey="name"
                        angle={-20}
                        textAnchor="end"
                        interval={0}
                      />

                      <YAxis allowDecimals={false} />

                      <Tooltip />

                      <Bar
                        dataKey="count"
                        fill="#16a34a"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-5">
                  Status Overview
                </h2>

                <div className="h-[350px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius={105}
                        label
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                          />
                        ))}
                      </Pie>

                      <Tooltip />

                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-5 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Status Summary
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700 font-medium">
                    Pending
                  </p>

                  <p className="text-2xl font-bold text-yellow-700 mt-1">
                    {statusCounts.pending}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    Under Review
                  </p>

                  <p className="text-2xl font-bold text-blue-700 mt-1">
                    {statusCounts.underReview}
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <p className="text-sm text-purple-700 font-medium">
                    Assigned
                  </p>

                  <p className="text-2xl font-bold text-purple-700 mt-1">
                    {statusCounts.assigned}
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <p className="text-sm text-orange-700 font-medium">
                    In Progress
                  </p>

                  <p className="text-2xl font-bold text-orange-700 mt-1">
                    {statusCounts.inProgress}
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm text-green-700 font-medium">
                    Resolved
                  </p>

                  <p className="text-2xl font-bold text-green-700 mt-1">
                    {statusCounts.resolved}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <ComplaintHeatmap
                complaints={analytics?.complaints || []}
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-5 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Complaints
              </h2>

              <div className="flex flex-col md:flex-row gap-4">
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
                  className="p-3 border rounded-lg bg-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Road">Road</option>
                  <option value="Waste">Waste</option>
                </select>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="p-3 border rounded-lg bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Under Review">
                    Under Review
                  </option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
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
                      <tr
                        key={complaint._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-4 font-medium">
                          {complaint.title}
                        </td>

                        <td className="p-4">
                          {complaint.category}
                        </td>

                        <td className="p-4 max-w-xs">
                          <p className="truncate">
                            {complaint.location}
                          </p>
                        </td>

                        <td className="p-4">
                          <select
                            value={
                              complaint.department || "Pending"
                            }
                            onChange={(e) =>
                              handleDepartmentChange(
                                complaint._id,
                                e.target.value
                              )
                            }
                            className="border rounded px-2 py-1"
                          >
                            <option value="Pending">
                              Pending
                            </option>
                            <option value="PWD">PWD</option>
                            <option value="Municipality">
                              Municipality
                            </option>
                          </select>
                        </td>

                        <td className="p-4">
                          <select
                            value={
                              complaint.status || "Pending"
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                complaint._id,
                                e.target.value
                              )
                            }
                            className="border rounded px-2 py-1"
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Under Review">
                              Under Review
                            </option>

                            <option value="Assigned">
                              Assigned
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Resolved">
                              Resolved
                            </option>
                          </select>
                        </td>

                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/complaint/${complaint._id}`
                                )
                              }
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                              View
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(complaint._id)
                              }
                              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center p-6 text-gray-500"
                      >
                        No complaints found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;