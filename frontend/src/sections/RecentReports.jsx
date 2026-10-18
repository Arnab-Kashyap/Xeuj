import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Trash2,
  Shield,
  Droplet,
  Lightbulb,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

function RecentReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentReports();
  }, []);

  const fetchRecentReports = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/reports/recent?limit=3");
      const data = await response.json();
      setReports(data || []);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "resolved":
        return {
          badge: "bg-[#E8F5E9] text-[#31583B] border border-[#C8E6C9]",
          icon: CheckCircle,
        };
      case "in_progress":
        return {
          badge: "bg-[#E3F2FD] text-[#1976D2] border border-[#BBDEFB]",
          icon: Clock,
        };
      case "submitted":
        return {
          badge: "bg-[#FFF3E0] text-[#F57C00] border border-[#FFE0B2]",
          icon: CheckCircle,
        };
      case "under_review":
        return {
          badge: "bg-[#FFF9C4] text-[#F9A825] border border-[#FFEE58]",
          icon: AlertCircle,
        };
      default:
        return {
          badge: "bg-[#E8EBDF] text-[#7C857C] border border-[#D8DCC9]",
          icon: AlertCircle,
        };
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "road_damage": AlertTriangle,
      "pothole": AlertTriangle,
      "waste": Trash2,
      "garbage": Trash2,
      "public_safety": Shield,
      "drainage": Droplet,
      "street_light": Lightbulb,
    };
    return icons[category?.toLowerCase()] || AlertTriangle;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      "road_damage": "Road Damage",
      "pothole": "Pothole",
      "waste": "Waste",
      "garbage": "Garbage",
      "public_safety": "Public Safety",
      "drainage": "Drainage",
      "street_light": "Street Light",
    };
    return labels[category?.toLowerCase()] || category || "Report";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `Reported ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0) return `Reported ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffMins > 0) return `Reported ${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  if (loading) {
    return (
      <section className="w-full bg-[#F5F3EC] py-20 md:py-28 z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center py-12">
            <p className="text-[#7C857C]">Loading reports...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!reports || reports.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#F5F3EC] py-20 md:py-28 z-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between mb-16">
          <div>
            <p className="text-[#31583B] text-xs font-semibold tracking-widest uppercase mb-3">
              Recent Reports
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#202923]">
              What's being
              <br />
              reported?
            </h2>
            <p className="text-[#7C857C] max-w-md text-lg mt-4">
              Real issues from your community. Reported by people, for a cleaner and safer city.
            </p>
          </div>

          <Link
            to="/reports"
            className="text-[#31583B] font-medium text-sm hover:text-[#202923] transition flex items-center gap-2 whitespace-nowrap"
          >
            View all reports
            <span className="text-lg">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report) => {
            const CategoryIcon = getCategoryIcon(report.category);
            const statusColor = getStatusColor(report.status);
            const StatusIcon = statusColor.icon;

            return (
              <div
                key={report._id || report.id}
                className="group bg-[#FAF9F4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-[#E8EBDF]"
              >
                <div className="relative h-56 overflow-hidden bg-[#E8EBDF]">
                  {report.imageUrl ? (
                    <img
                      src={report.imageUrl}
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#7C857C]">
                      No image available
                    </div>
                  )}

                  <div className="absolute top-4 right-4">
                    <div
                      className={`px-3 py-2 rounded-full flex items-center gap-1 ${
                        statusColor.badge
                      }`}
                    >
                      <StatusIcon size={16} />
                      <span className="text-xs font-semibold">
                        {report.status === "under_review"
                          ? "Under review"
                          : report.status === "in_progress"
                          ? "In Progress"
                          : report.status?.charAt(0).toUpperCase() +
                            report.status?.slice(1).replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CategoryIcon size={18} className="text-[#31583B]" />
                    <span className="text-xs font-semibold text-[#31583B] uppercase tracking-wide">
                      {getCategoryLabel(report.category)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#202923] mb-3 line-clamp-2">
                    {report.title}
                  </h3>

                  <div className="flex items-start gap-2 mb-4">
                    <MapPin size={16} className="text-[#7C857C] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-[#7C857C]">
                        {report.location?.area || report.location || "Location not specified"}
                      </p>
                      <p className="text-xs text-[#7C857C] mt-0.5">
                        {report.location?.city || "Assam"}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#7C857C]">{formatDate(report.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RecentReports;