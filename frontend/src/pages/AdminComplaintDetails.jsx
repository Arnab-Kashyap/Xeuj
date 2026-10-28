import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  CircleDot,
  Clock,
  Droplets,
  MapPin,
  Route,
  Trash2,
} from "lucide-react";
import LocationMap from "../components/LocationMap";
import {
  getComplaintById,
  updateStatus,
  assignDepartment,
  deleteComplaint,
} from "../services/complaintService";
import Reveal from "../components/Reveal";

const STATUSES = ["Pending", "Under Review", "Assigned", "In Progress", "Resolved"];
const DEPARTMENTS = ["Pending", "PWD", "Municipality"];

const timelineSteps = ["Reported", "Assigned", "In Progress", "Resolved"];
const lastStep = timelineSteps.length - 1;
const segmentDuration = 1.5;

const statusToStep = {
  pending: 0,
  "under review": 0,
  assigned: 1,
  "in progress": 2,
  resolved: 3,
};

const categoryConfig = {
  road: { label: "Road", icon: Route },
  waste: { label: "Waste", icon: Trash2 },
  drainage: { label: "Drainage", icon: Droplets },
  other: { label: "Other", icon: CircleDot },
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Not available";

const cardClass = "bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl shadow-sm";

function DetailField({ label, icon: Icon, children }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-[#31583B]/60 mb-2">
        {label}
      </p>
      <div className="flex items-start gap-2 text-base text-[#31583B]">
        {Icon && <Icon size={17} className="mt-1 shrink-0" />}
        <span className="break-words">{children}</span>
      </div>
    </div>
  );
}

function StepDot({ index, currentStep }) {
  const isDone = index <= currentStep;
  const isCurrent = index === currentStep && currentStep < lastStep;

  return (
    <div data-step={index} className="relative h-10 w-10 shrink-0">
      {isCurrent && (
        <span className="timeline-pulse absolute inset-0 rounded-full bg-[#31583B]/40" />
      )}
      <div
        className={`timeline-dot relative flex h-10 w-10 items-center justify-center rounded-full border ${
          isDone
            ? "bg-[#31583B] border-[#31583B] text-[#FAF9F4]"
            : "bg-[#FAF9F4] border-[#B9C2B5] text-[#7C857C]"
        }`}
      >
        {isDone ? <Check size={18} /> : <Clock size={18} />}
      </div>
    </div>
  );
}

function AdminComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState("");

  const timelineRef = useRef(null);
  const fillXRef = useRef(null);
  const fillYRef = useRef(null);

  const loadComplaint = async () => {
    const data = await getComplaintById(id);
    setComplaint(data.complaint);
  };

  useEffect(() => {
    const fetchComplaint = async () => {
      setLoading(true);
      setError(false);

      try {
        await loadComplaint();
      } catch (err) {
        console.error("Failed to fetch complaint:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const runAction = async (action, failureMessage) => {
    setSaving(true);
    setActionError("");

    try {
      await action();
      await loadComplaint();
    } catch (err) {
      console.error(failureMessage, err);
      setActionError(failureMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = (newStatus) =>
    runAction(() => updateStatus(id, newStatus), "Could not update the status.");

  const handleDepartmentChange = (department) =>
    runAction(
      () => assignDepartment(id, department),
      "Could not assign the department."
    );

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    setSaving(true);
    setActionError("");

    try {
      await deleteComplaint(id);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Failed to delete complaint:", err);
      setActionError("Could not delete the complaint.");
      setSaving(false);
    }
  };

  const statusKey = complaint?.status?.toLowerCase();
  const currentStep = statusToStep[statusKey] ?? 0;

  useLayoutEffect(() => {
    if (loading || !complaint) return;

    const scope = timelineRef.current;
    const fillX = fillXRef.current;
    const fillY = fillYRef.current;
    if (!scope || !fillX || !fillY) return;

    const fraction = currentStep / lastStep;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(fillX, { scaleX: fraction });
        gsap.set(fillY, { scaleY: fraction });
        return;
      }

      const startDelay = 0.3;
      const timeline = gsap.timeline({ delay: startDelay });

      timeline.fromTo(
        fillX,
        { scaleX: 0 },
        { scaleX: fraction, duration: currentStep * segmentDuration, ease: "none" },
        0
      );

      timeline.fromTo(
        fillY,
        { scaleY: 0 },
        { scaleY: fraction, duration: currentStep * segmentDuration, ease: "none" },
        0
      );

      for (let i = 0; i <= currentStep; i++) {
        const dots = scope.querySelectorAll(`[data-step="${i}"] .timeline-dot`);
        timeline.fromTo(
          dots,
          { scale: 0.5 },
          { scale: 1, duration: 0.6, ease: "back.out(2)" },
          i * segmentDuration
        );
      }

      if (currentStep < lastStep) {
        const pulses = scope.querySelectorAll(`[data-step="${currentStep}"] .timeline-pulse`);
        gsap.fromTo(
          pulses,
          { scale: 1, opacity: 0.7 },
          {
            scale: 2.2,
            opacity: 0,
            duration: 1.6,
            repeat: -1,
            ease: "power1.out",
            delay: startDelay + currentStep * segmentDuration + 0.6,
          }
        );
      }
    }, scope);

    return () => ctx.revert();
  }, [loading, complaint, currentStep]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F3EC]">
        <div className="w-10 h-10 border-4 border-[#E8EBDF] border-t-[#31583B] rounded-full animate-spin" />
        <p className="mt-4 text-[#31583B]/80">Loading complaint...</p>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3EC] px-6">
        <div className="bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl p-8 text-center max-w-md">
          <h2 className="text-xl font-serif font-light text-[#31583B]">
            We could not load this complaint.
          </h2>
          <p className="text-[#31583B]/80 mt-2">
            It may have been removed, or the server is unavailable.
          </p>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#31583B] hover:text-[#202923] transition mt-6"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const categoryKey = complaint.category?.toLowerCase();
  const category = categoryConfig[categoryKey] || {
    label: complaint.category || "Report",
    icon: CircleDot,
  };
  const CategoryIcon = category.icon;

  const hasCoordinates =
    complaint.coordinates?.lat != null && complaint.coordinates?.lng != null;

  const trackHeightMobile = `${lastStep * 6}rem`;

  return (
    <div className="min-h-screen bg-[#F5F3EC] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#31583B] hover:text-[#202923] transition mb-10"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-[#31583B]" />
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#31583B]">
                  Complaint Review
                </p>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-light text-[#31583B] mb-3 break-words">
                {complaint.title}
              </h1>
              <p className="text-[#31583B]/80 text-lg">
                Review this report, update its status and assign the right department.
              </p>
            </div>

            <span className="self-start inline-flex rounded-full bg-[#E8EBDF] px-4 py-2 text-xs font-medium tracking-wide text-[#31583B] whitespace-nowrap">
              ID: {complaint.complaintId}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={`${cardClass} p-6 md:p-8`}>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 md:items-end">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#31583B]/60 mb-2">
                  Update status
                </p>
                <div className="relative">
                  <select
                    value={complaint.status || "Pending"}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={saving}
                    className="appearance-none w-full bg-[#F5F3EC] border border-[#D9DDD0] rounded-lg px-4 py-2.5 pr-10 text-sm text-[#31583B] focus:outline-none focus:border-[#31583B] cursor-pointer disabled:opacity-60"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#31583B]"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-[#31583B]/60 mb-2">
                  Assign department
                </p>
                <div className="relative">
                  <select
                    value={complaint.department || "Pending"}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    disabled={saving}
                    className="appearance-none w-full bg-[#F5F3EC] border border-[#D9DDD0] rounded-lg px-4 py-2.5 pr-10 text-sm text-[#31583B] focus:outline-none focus:border-[#31583B] cursor-pointer disabled:opacity-60"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#31583B]"
                  />
                </div>
              </div>

              <button
                onClick={handleDelete}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#B4433C] border border-[#EBC7C2] bg-[#FBF1EF] hover:bg-[#F6E2DE] rounded-lg px-4 py-2.5 transition disabled:opacity-60"
              >
                <Trash2 size={15} />
                Delete complaint
              </button>
            </div>

            <div className="mt-4 min-h-[20px]">
              {saving && (
                <p className="text-sm text-[#31583B]/70">Saving changes...</p>
              )}
              {actionError && (
                <p className="text-sm text-[#B4433C]">{actionError}</p>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className={`${cardClass} mt-8 p-6 md:p-8`}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-80 h-60 md:h-64 shrink-0 rounded-xl overflow-hidden bg-[#E8EBDF] flex items-center justify-center">
                {complaint.image ? (
                  <img
                    src={complaint.image}
                    alt={complaint.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MapPin size={32} className="text-[#31583B]" />
                )}
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 md:border-l md:border-[#E8EBDF] md:pl-10">
                <DetailField label="Category" icon={CategoryIcon}>
                  {category.label}
                </DetailField>

                <DetailField label="Location" icon={MapPin}>
                  {complaint.location || "Not specified"}
                </DetailField>

                <DetailField label="Department" icon={Building2}>
                  {complaint.department || "Not yet assigned"}
                </DetailField>

                <DetailField label="Reported on" icon={Calendar}>
                  {formatDateTime(complaint.createdAt)}
                </DetailField>

                <DetailField label="Last updated" icon={Clock}>
                  {formatDateTime(complaint.updatedAt)}
                </DetailField>

                <DetailField label="Coordinates">
                  {hasCoordinates
                    ? `${complaint.coordinates.lat.toFixed(5)}, ${complaint.coordinates.lng.toFixed(5)}`
                    : "Not available"}
                </DetailField>

                <div className="sm:col-span-2">
                  <DetailField label="Description">
                    {complaint.description || "No description provided."}
                  </DetailField>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {hasCoordinates && (
          <Reveal delay={0.2}>
            <div className={`${cardClass} mt-8 p-6 md:p-8`}>
              <h2 className="text-2xl font-serif font-light text-[#31583B] mb-6">
                Exact Location
              </h2>
              <LocationMap
                latitude={complaint.coordinates.lat}
                longitude={complaint.coordinates.lng}
                readOnly
                onLocationChange={() => {}}
              />
            </div>
          </Reveal>
        )}

        <Reveal delay={0.25}>
          <div className={`${cardClass} mt-8 p-6 md:p-8`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-10">
              <h2 className="text-2xl font-serif font-light text-[#31583B]">
                Progress Timeline
              </h2>
              <p className="text-sm text-[#31583B]/80">
                Current status:{" "}
                <span className="font-medium text-[#31583B]">
                  {complaint.status || "Pending"}
                </span>
              </p>
            </div>

            <div ref={timelineRef}>
              <div className="hidden md:block relative">
                <div className="absolute top-[19px] left-[12.5%] right-[12.5%] h-[2px] bg-[#D9DDD0]" />
                <div
                  ref={fillXRef}
                  className="absolute top-[19px] left-[12.5%] right-[12.5%] h-[2px] bg-[#31583B] origin-left"
                  style={{ transform: "scaleX(0)" }}
                />

                <div className="relative grid grid-cols-4">
                  {timelineSteps.map((step, index) => {
                    const isDone = index <= currentStep;
                    const subLabel =
                      index === 0
                        ? formatDate(complaint.createdAt)
                        : isDone
                        ? "Completed"
                        : "Pending";

                    return (
                      <div key={step} className="flex flex-col items-center text-center px-2">
                        <StepDot index={index} currentStep={currentStep} />
                        <h3
                          className={`mt-4 font-medium ${
                            isDone ? "text-[#31583B]" : "text-[#7C857C]"
                          }`}
                        >
                          {step}
                        </h3>
                        <p className="text-sm text-[#31583B]/70 mt-1">{subLabel}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:hidden relative">
                <div
                  className="absolute left-5 top-5 w-[2px] -translate-x-px bg-[#D9DDD0]"
                  style={{ height: trackHeightMobile }}
                />
                <div
                  ref={fillYRef}
                  className="absolute left-5 top-5 w-[2px] -translate-x-px bg-[#31583B] origin-top"
                  style={{ height: trackHeightMobile, transform: "scaleY(0)" }}
                />

                <div className="relative">
                  {timelineSteps.map((step, index) => {
                    const isDone = index <= currentStep;
                    const subLabel =
                      index === 0
                        ? formatDate(complaint.createdAt)
                        : isDone
                        ? "Completed"
                        : "Pending";

                    return (
                      <div key={step} className="flex items-start gap-4 h-24">
                        <StepDot index={index} currentStep={currentStep} />
                        <div className="pt-1">
                          <h3
                            className={`font-medium ${
                              isDone ? "text-[#31583B]" : "text-[#7C857C]"
                            }`}
                          >
                            {step}
                          </h3>
                          <p className="text-sm text-[#31583B]/70 mt-1">{subLabel}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default AdminComplaintDetails;