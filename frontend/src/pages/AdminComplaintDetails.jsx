import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Cell,
  LabelList,
} from "recharts";
import {
  FileText,
  Clock,
  Loader,
  CheckCheck,
  ArrowRight,
  RefreshCw,
  Search,
  Eye,
  Trash2,
  LayoutGrid,
  ShieldCheck,
  MapPin,
  ChevronDown,
} from "lucide-react";
import ComplaintHeatmap from "../components/ComplaintHeatmap";
import {
  getComplaintAnalytics,
  getAllComplaints,
  assignDepartment,
  updateStatus,
  deleteComplaint,
} from "../services/complaintService";

const STATUSES = ["Pending", "Under Review", "Assigned", "In Progress", "Resolved"];
const CATEGORIES = ["Road", "Waste", "Drainage", "Other"];
const DEPARTMENTS = ["Pending", "PWD", "Municipality"];

const categoryColors = {
  Road: "#31583B",
  Waste: "#C9A24D",
  Drainage: "#7FA9CF",
  Other: "#A3A9A3",
};

const statusDotColors = {
  Pending: "bg-[#C8921A]",
  "Under Review": "bg-[#4F7FAF]",
  Assigned: "bg-[#6E8F76]",
  "In Progress": "bg-[#2F6A9E]",
  Resolved: "bg-[#31583B]",
};

const cardClass = "bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl shadow-sm";

const tooltipStyle = {
  background: "#FAF9F4",
  border: "1px solid #E8EBDF",
  borderRadius: 12,
  color: "#31583B",
  fontSize: 13,
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadDashboard = async () => {
    try {
      const [complaintData, analyticsData] = await Promise.all([
        getAllComplaints(),
        getComplaintAnalytics(),
      ]);
      setComplaints(complaintData.complaints || []);
      setAnalytics(analyticsData.analytics);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboard();
  };

  const handleDepartmentChange = async (id, department) => {
    try {
      await assignDepartment(id, department);
      loadDashboard();
    } catch (error) {
      console.error("Failed to assign department:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus(id, newStatus);
      loadDashboard();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await deleteComplaint(id);
      loadDashboard();
    } catch (error) {
      console.error("Failed to delete complaint:", error);
    }
  };

  const statusCounts = {
    pending: complaints.filter((c) => c.status === "Pending").length,
    underReview: complaints.filter((c) => c.status === "Under Review").length,
    assigned: complaints.filter((c) => c.status === "Assigned").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  const statusChartData = STATUSES.map((name) => ({
    name,
    count: complaints.filter((c) => c.status === name).length,
  }));

  const categoryChartData = CATEGORIES.map((name) => ({
    name,
    count: complaints.filter((c) => c.category === name).length,
    color: categoryColors[name],
  }));

  const filteredComplaints = complaints.filter((complaint) => {
    const term = search.toLowerCase();

    const matchesSearch =
      complaint.title?.toLowerCase().includes(term) ||
      complaint.location?.toLowerCase().includes(term);

    const matchesCategory =
      category === "All" || complaint.category === category;

    const matchesStatus = status === "All" || complaint.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const statCards = [
    {
      label: "Total Complaints",
      value: complaints.length,
      icon: FileText,
      iconBg: "bg-[#E8EBDF]",
      iconColor: "text-[#31583B]",
      filter: "All",
    },
    {
      label: "Pending",
      value: statusCounts.pending,
      icon: Clock,
      iconBg: "bg-[#F6EBCB]",
      iconColor: "text-[#8A5E10]",
      filter: "Pending",
    },
    {
      label: "In Progress",
      value: statusCounts.inProgress,
      icon: Loader,
      iconBg: "bg-[#E3EEF8]",
      iconColor: "text-[#2F6A9E]",
      filter: "In Progress",
    },
    {
      label: "Resolved",
      value: statusCounts.resolved,
      icon: CheckCheck,
      iconBg: "bg-[#E8EBDF]",
      iconColor: "text-[#31583B]",
      filter: "Resolved",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F3EC]">
        <div className="w-10 h-10 border-4 border-[#E8EBDF] border-t-[#31583B] rounded-full animate-spin" />
        <p className="mt-4 text-[#31583B]/80">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EC] px-6 py-8 md:py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <img
            src="/images/xeuj-logo-medium-transparent.png"
            alt="Xeuj"
            className="h-9 w-auto"
          />

          <div className="flex items-center gap-4">
            <p className="hidden sm:block text-xs text-[#31583B]/70 text-right leading-tight">
              Last updated
              <br />
              {lastUpdated
                ? lastUpdated.toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Not yet"}
            </p>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#31583B] border border-[#D9DDD0] bg-[#FAF9F4] hover:border-[#31583B] rounded-lg px-4 py-2 transition disabled:opacity-60"
            >
              <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[#31583B] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[#31583B]/80 text-lg">
            Monitor and manage civic complaints
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.label}
                onClick={() => setStatus(card.filter)}
                className={`${cardClass} group flex items-center gap-4 p-5 text-left hover:shadow-md transition`}
              >
                <div
                  className={`h-12 w-12 shrink-0 rounded-xl flex items-center justify-center ${card.iconBg}`}
                >
                  <Icon size={20} className={card.iconColor} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#31583B]/70">{card.label}</p>
                  <p className="text-3xl font-serif font-light text-[#31583B] mt-1">
                    {card.value}
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="text-[#31583B] shrink-0 transition group-hover:translate-x-1"
                />
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 mb-8">
          <div className={`${cardClass} p-6`}>
            <h2 className="text-2xl font-serif font-light text-[#31583B] mb-6">
              Complaint Status
            </h2>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusChartData}
                  margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="#E8EBDF" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#7C857C", fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis
                    allowDecimals={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#7C857C", fontSize: 12 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#E8EBDF", opacity: 0.5 }}
                    contentStyle={tooltipStyle}
                  />
                  <Bar
                    dataKey="count"
                    fill="#31583B"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={56}
                  >
                    <LabelList
                      dataKey="count"
                      position="top"
                      fill="#31583B"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`${cardClass} p-6`}>
            <h2 className="text-2xl font-serif font-light text-[#31583B] mb-6">
              Complaint Categories
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="h-[220px] w-full sm:w-1/2 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      stroke="#FAF9F4"
                      strokeWidth={2}
                      label={{ fill: "#FAF9F4", fontSize: 12 }}
                      labelLine={false}
                    >
                      {categoryChartData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <ul className="w-full sm:w-1/2 space-y-4 sm:border-l sm:border-[#E8EBDF] sm:pl-6">
                {categoryChartData.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm text-[#31583B]"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </span>
                    <span className="font-medium">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={`${cardClass} p-6 mb-8`}>
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={20} className="text-[#31583B]" />
            <h2 className="text-2xl font-serif font-light text-[#31583B]">
              Complaint Location
            </h2>
          </div>
          <ComplaintHeatmap complaints={analytics?.complaints || []} />
        </div>

        <div className={`${cardClass} overflow-hidden`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6">
            <h2 className="text-2xl font-serif font-light text-[#31583B]">
              Complaints
            </h2>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative md:w-64">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#31583B]"
                />
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#F5F3EC] border border-[#D9DDD0] rounded-lg pl-10 pr-3 py-2.5 text-sm text-[#31583B] placeholder:text-[#9AA19A] focus:outline-none focus:border-[#31583B] transition"
                />
              </div>

              <div className="relative">
                <LayoutGrid
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#31583B] pointer-events-none"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full bg-[#F5F3EC] border border-[#D9DDD0] rounded-lg pl-10 pr-8 py-2.5 text-sm text-[#31583B] focus:outline-none focus:border-[#31583B] cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <ShieldCheck
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#31583B] pointer-events-none"
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="appearance-none w-full bg-[#F5F3EC] border border-[#D9DDD0] rounded-lg pl-10 pr-8 py-2.5 text-sm text-[#31583B] focus:outline-none focus:border-[#31583B] cursor-pointer"
                >
                  <option value="All">All Status</option>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#EEF0E6] text-[#31583B] text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">#</th>
                  <th className="px-6 py-3 text-left font-semibold">Title</th>
                  <th className="px-6 py-3 text-left font-semibold">Category</th>
                  <th className="px-6 py-3 text-left font-semibold">Location</th>
                  <th className="px-6 py-3 text-left font-semibold">Department</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="text-[#31583B]">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((complaint, index) => (
                    <tr
                      key={complaint._id}
                      className="border-t border-[#E8EBDF] hover:bg-[#F5F3EC]/70 transition"
                    >
                      <td className="px-6 py-4 text-[#31583B]/70">{index + 1}</td>

                      <td className="px-6 py-4 font-medium">{complaint.title}</td>

                      <td className="px-6 py-4">{complaint.category}</td>

                      <td className="px-6 py-4 max-w-xs">
                        <p className="truncate">{complaint.location}</p>
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={complaint.department || "Pending"}
                          onChange={(e) =>
                            handleDepartmentChange(complaint._id, e.target.value)
                          }
                          className="bg-transparent border border-[#D9DDD0] rounded-lg px-2.5 py-1.5 text-xs text-[#31583B] focus:outline-none focus:border-[#31583B] cursor-pointer"
                        >
                          {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-6 py-4">
                        <div className="relative inline-flex items-center">
                          <span
                            className={`pointer-events-none absolute left-3 h-2 w-2 rounded-full ${
                              statusDotColors[complaint.status] || statusDotColors.Pending
                            }`}
                          />
                          <select
                            value={complaint.status || "Pending"}
                            onChange={(e) =>
                              handleStatusChange(complaint._id, e.target.value)
                            }
                            className="appearance-none bg-transparent border border-[#D9DDD0] rounded-lg pl-7 pr-7 py-1.5 text-xs font-medium text-[#31583B] focus:outline-none focus:border-[#31583B] cursor-pointer"
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={14}
                            className="pointer-events-none absolute right-2.5 text-[#31583B]/70"
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate(`/admin/complaint/${complaint._id}`)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#31583B] border border-[#D9DDD0] bg-[#FAF9F4] hover:border-[#31583B] rounded-lg px-3 py-1.5 transition"
                          >
                            <Eye size={14} />
                            View
                          </button>

                          <button
                            onClick={() => handleDelete(complaint._id)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#B4433C] border border-[#EBC7C2] bg-[#FBF1EF] hover:bg-[#F6E2DE] rounded-lg px-3 py-1.5 transition"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center px-6 py-10 text-[#31583B]/70">
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;