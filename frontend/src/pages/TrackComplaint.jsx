import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  MapPin,
  Building2,
  ArrowRight,
  ArrowLeft,
  ListFilter,
  CircleDot,
} from "lucide-react";
import { getMyComplaints } from "../services/complaintService";
import Reveal from "../components/Reveal";

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "road", label: "Road damage" },
  { value: "waste", label: "Waste" },
  { value: "drainage", label: "Drainage" },
  { value: "other", label: "Other" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "assigned", label: "Assigned" },
  { value: "in progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

const statusColors = {
  pending: "text-[#9A6B12]",
  assigned: "text-[#31583B]",
  "in progress": "text-[#2F6A9E]",
  resolved: "text-[#263D30]",
};

const getStatusColor = (status) =>
  statusColors[status?.toLowerCase()] || "text-[#31583B]";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

function SelectField({ icon: Icon, value, onChange, options }) {
  return (
    <div className="relative">
      <Icon
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#31583B] pointer-events-none"
      />
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none bg-[#FAF9F4] border border-[#D9DDD0] rounded-xl pl-11 pr-10 py-3.5 text-sm text-[#31583B] focus:outline-none focus:border-[#31583B] transition cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#31583B] pointer-events-none"
      />
    </div>
  );
}

function TrackComplaint() {
  const { user } = useUser();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    if (!user) return;

    const fetchComplaints = async () => {
      try {
        const data = await getMyComplaints(user.id);
        setComplaints(data.complaints || []);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [user]);

  const filteredComplaints = useMemo(() => {
    const term = search.trim().toLowerCase();

    return complaints.filter((complaint) => {
      const matchesSearch =
        !term ||
        [complaint.complaintId, complaint.title, complaint.location].some((value) =>
          value?.toLowerCase().includes(term)
        );

      const matchesCategory =
        category === "all" || complaint.category?.toLowerCase() === category;

      const matchesStatus =
        status === "all" || complaint.status?.toLowerCase() === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [complaints, search, category, status]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3EC] px-6">
        <div className="bg-[#FAF9F4] border border-[#E8EBDF] p-8 rounded-2xl text-center">
          <h2 className="text-xl font-serif font-light text-[#31583B]">
            Please login to track your complaints.
          </h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3EC]">
        <p className="text-[#31583B]/80">Loading complaints...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EC] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#31583B] hover:text-[#202923] transition mb-10"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#31583B] mb-4">
            Track Complaints
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[#31583B] mb-3">
            Track your reports
          </h1>
          <p className="text-[#31583B]/80 text-lg mb-10">
            Check the status of your submitted complaints and stay updated on the progress.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4 mb-8">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#31583B]"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by complaint ID, title or location..."
                className="w-full bg-[#FAF9F4] border border-[#D9DDD0] rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#31583B] placeholder:text-[#9AA19A] focus:outline-none focus:border-[#31583B] transition"
              />
            </div>

            <div className="md:w-56">
              <SelectField
                icon={ListFilter}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categoryOptions}
              />
            </div>

            <div className="md:w-56">
              <SelectField
                icon={CircleDot}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={statusOptions}
              />
            </div>
          </div>
        </Reveal>

        {complaints.length === 0 ? (
          <Reveal delay={0.15}>
            <div className="bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl p-10 text-center">
              <h2 className="text-xl font-serif font-light text-[#31583B]">
                No complaints found
              </h2>
              <p className="text-[#31583B]/80 mt-2">
                Submit your first complaint to start tracking.
              </p>
            </div>
          </Reveal>
        ) : filteredComplaints.length === 0 ? (
          <Reveal delay={0.15}>
            <div className="bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl p-10 text-center">
              <h2 className="text-xl font-serif font-light text-[#31583B]">
                No complaints match your filters
              </h2>
              <p className="text-[#31583B]/80 mt-2">
                Try a different search term, category, or status.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-5">
            {filteredComplaints.map((complaint, index) => (
              <Reveal key={complaint._id} delay={index * 0.1}>
                <Link
                  to={`/complaints/${complaint._id}`}
                  className="group block bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl p-5 md:p-6 hover:shadow-md transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="w-full md:w-56 h-44 rounded-xl overflow-hidden bg-[#E8EBDF] shrink-0 flex items-center justify-center">
                      {complaint.image ? (
                        <img
                          src={complaint.image}
                          alt={complaint.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <MapPin size={28} className="text-[#31583B]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium tracking-wide text-[#31583B]/70">
                        #{complaint.complaintId}
                      </p>
                      <h2 className="text-2xl font-serif font-light text-[#31583B] mt-1">
                        {complaint.title}
                      </h2>

                      <div className="mt-3 space-y-2 text-sm text-[#31583B]/80">
                        <p className="flex items-center gap-2">
                          <MapPin size={15} className="shrink-0" />
                          <span className="truncate">{complaint.location}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <Building2 size={15} className="shrink-0" />
                          {complaint.department || "Not yet assigned"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 md:border-l md:border-[#E8EBDF] md:pl-6 md:w-72 shrink-0">
                      <div>
                        <p className={`text-sm font-medium ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </p>
                        <p className="text-sm text-[#31583B]/70 mt-1">
                          {formatDate(complaint.createdAt)}
                        </p>
                      </div>

                      <ArrowRight
                        size={20}
                        className="text-[#31583B] shrink-0 transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;