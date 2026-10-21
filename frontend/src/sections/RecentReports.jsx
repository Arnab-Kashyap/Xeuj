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
  Send,
  RefreshCw,
  Layers,
} from "lucide-react";
import Reveal from "../components/Reveal";

const API_URL = "http://localhost:5000/api/complaints/recent?limit=3";

const statusConfig = {
  pending: {
    label: "Pending",
    badge: "bg-[#FFF6E0] text-[#9A6B12] border border-[#F2DDA6]",
    icon: Clock,
  },
  assigned: {
    label: "Assigned",
    badge: "bg-[#E8EEF5] text-[#2F4E6E] border border-[#CFDCEA]",
    icon: Send,
  },
  in_progress: {
    label: "In Progress",
    badge: "bg-[#EEF1E4] text-[#4F6B3A] border border-[#D8DFC5]",
    icon: RefreshCw,
  },
  resolved: {
    label: "Resolved",
    badge: "bg-[#E4EEE6] text-[#31583B] border border-[#C9DCCD]",
    icon: CheckCircle,
  },
};

const categoryConfig = {
  road: { label: "Road Damage", icon: AlertTriangle },
  road_damage: { label: "Road Damage", icon: AlertTriangle },
  waste: { label: "Waste", icon: Trash2 },
  public_safety: { label: "Public Safety", icon: Shield },
  drainage: { label: "Drainage", icon: Droplet },
  street_light: { label: "Street Light", icon: Lightbulb },
};

const getStatusInfo = (status) => {
  const key = status?.toLowerCase().replace(/\s+/g, "_");
  return (
    statusConfig[key] || {
      label: status || "Unknown",
      badge: "bg-[#E8EBDF] text-[#7C857C] border border-[#D8DCC9]",
      icon: Clock,
    }
  );
};

const getCategoryInfo = (category) => {
  const key = category?.toLowerCase().replace(/\s+/g, "_");
  return categoryConfig[key] || { label: category || "Report", icon: Layers };
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `Reported ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `Reported ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffMins > 0) return `Reported ${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  return "Just now";
};

function RecentReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecentReports = async () => {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setReports(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch reports:", error);
          setReports([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecentReports();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#F5F3EC] py-20 md:py-28 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center py-12">
            <p className="text-[#7C857C]">Loading reports...</p>
          </div>
        </div>
      </section>
    );
  }

  if (reports.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#F5F3EC] py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-start justify-between gap-6 mb-16">
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
              to="/track"
              className="text-[#31583B] font-medium text-sm hover:text-[#202923] transition flex items-center gap-2 whitespace-nowrap"
            >
              View all reports
              <span className="text-lg">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report, index) => {
            const category = getCategoryInfo(report.category);
            const status = getStatusInfo(report.status);
            const CategoryIcon = category.icon;
            const StatusIcon = status.icon;

            return (
              <Reveal key={report._id} delay={index * 0.12}>
                <div className="group bg-[#FAF9F4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-[#E8EBDF]">
                  <div className="relative h-56 overflow-hidden bg-[#E8EBDF]">
                    {report.imageUrl ? (
                      <img
                        src={report.imageUrl}
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#7C857C]">
                        No image available
                      </div>
                    )}

                    <div className="absolute top-4 right-4">
                      <div
                        className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${status.badge}`}
                      >
                        <StatusIcon size={14} />
                        <span className="text-xs font-semibold">{status.label}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryIcon size={18} className="text-[#31583B]" />
                      <span className="text-xs font-semibold text-[#31583B] uppercase tracking-wide">
                        {category.label}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#202923] mb-3 line-clamp-2">
                      {report.title}
                    </h3>

                    <div className="flex items-start gap-2 mb-4">
                      <MapPin size={16} className="text-[#7C857C] mt-0.5 shrink-0" />
                      <p className="text-sm text-[#7C857C] line-clamp-2">
                        {report.location || "Location not specified"}
                      </p>
                    </div>

                    <p className="text-xs text-[#7C857C]">{formatDate(report.createdAt)}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default RecentReports;