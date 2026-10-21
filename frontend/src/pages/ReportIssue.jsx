import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { MapPin, LocateFixed, ImagePlus, ArrowRight, ArrowLeft } from "lucide-react";
import { createComplaint } from "../services/complaintService";
import LocationMap from "../components/LocationMap";
import Reveal from "../components/Reveal";

const DEFAULT_COORDINATES = { lat: 26.1445, lng: 91.7362 };
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_DESCRIPTION = 500;

const categories = [
  { value: "Road", label: "Road damage" },
  { value: "Waste", label: "Waste" },
  { value: "Drainage", label: "Drainage" },
  { value: "Other", label: "Other" },
];

const initialForm = {
  title: "",
  category: "Road",
  description: "",
  location: "",
};

const inputClass =
  "w-full bg-[#F5F3EC] border border-[#D9DDD0] rounded-xl px-4 py-3 text-[#31583B] placeholder:text-[#9AA19A] focus:outline-none focus:border-[#31583B] transition";


function Field({ label, required, children }) {
  return (
    <div>
      <p className="text-sm font-medium text-[#31583B] mb-2">
        {label} {required && <span className="text-[#B4553C]">*</span>}
      </p>
      {children}
    </div>
  );
}

const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
};

function ReportIssue() {
  const { user } = useUser();

  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [coordinates, setCoordinates] = useState(DEFAULT_COORDINATES);
  const [locationLoading, setLocationLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image must be 5MB or smaller.");
      e.target.value = "";
      return;
    }

    setImage(file);
  };

  const handleLocationSearch = async (e) => {
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, location: value }));

    if (value.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value
        )}&limit=5&addressdetails=1`
      );

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Location search error:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectLocation = (result) => {
    setCoordinates({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    });

    setFormData((prev) => ({ ...prev, location: result.display_name }));
    setSearchResults([]);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setCoordinates({ lat, lng });

        const location = await reverseGeocode(lat, lng);
        setFormData((prev) => ({ ...prev, location }));
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === 1) {
          alert("Location permission was denied. Please allow location access.");
        } else if (error.code === 2) {
          alert("Unable to detect your location.");
        } else if (error.code === 3) {
          alert("Location request timed out.");
        } else {
          alert("Something went wrong while getting your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.location) {
      alert("Please select or detect a location.");
      return;
    }

    const data = new FormData();

    data.append("clerkId", user.id);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append(
      "coordinates",
      JSON.stringify({
        lat: coordinates.lat,
        lng: coordinates.lng,
      })
    );

    if (image) {
      data.append("image", image);
    }

    try {
      setSubmitting(true);

      const response = await createComplaint(data);

      alert(
        `Complaint submitted successfully!\n\nComplaint ID: ${response.complaint.complaintId}`
      );

      setFormData(initialForm);
      setCoordinates(DEFAULT_COORDINATES);
      setImage(null);
      setSearchResults([]);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to submit complaint");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EC] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#31583B] border border-[#D9DDD0] bg-[#FAF9F4] hover:border-[#31583B] rounded-full px-4 py-2 mb-10 transition"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#31583B] mb-4">
            Civic Reporting
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-light text-[#31583B] mb-3">
            Report an issue.
          </h1>
          <p className="text-[#31583B]/80 text-lg mb-12">
            Help us keep your community clean, safe and better for everyone.
          </p>
        </Reveal>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 items-start"
        >
          <Reveal delay={0.15}>
            <div className="bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl p-8 space-y-7">
              <Field label="Issue title" required>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Large pothole near main road"
                  required
                  className={inputClass}
                />
              </Field>

              <Field label="Category" required>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => {
                    const active = formData.category === cat.value;

                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => handleCategorySelect(cat.value)}
                        className={`px-5 py-2.5 rounded-full text-sm border transition ${
                          active
                            ? "bg-[#31583B] border-[#31583B] text-[#FAF9F4]"
                            : "bg-transparent border-[#D9DDD0] text-[#31583B] hover:border-[#31583B]"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <Field label="Description" required>
                <div className="relative">
                  <textarea
                    name="description"
                    rows={5}
                    maxLength={MAX_DESCRIPTION}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue in detail..."
                    required
                    className={`${inputClass} resize-none pb-8`}
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-[#7C857C]">
                    {formData.description.length}/{MAX_DESCRIPTION}
                  </span>
                </div>
              </Field>

              <div className="border-t border-[#E8EBDF] pt-7">
                <Field label="Add a photo (optional)">
                  <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#D9DDD0] rounded-xl py-10 px-6 cursor-pointer hover:border-[#31583B] transition text-center">
                    <ImagePlus size={22} className="text-[#31583B]" />
                    <span className="text-sm text-[#31583B]">
                      {image ? image.name : "Click to upload a photo"}
                    </span>
                    <span className="text-xs text-[#7C857C]">JPG, PNG (Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </Field>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#31583B] hover:bg-[#263D30] text-[#FAF9F4] py-4 rounded-xl font-medium transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? "Submitting..." : "Submit Report"}
                <ArrowRight size={18} />
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl p-8 space-y-6">
              <h2 className="text-base font-medium text-[#31583B]">Location</h2>

              <div className="relative">
                <MapPin
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#31583B]"
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleLocationSearch}
                  placeholder="Search for a location..."
                  className={`${inputClass} pl-11`}
                />

                {searchResults.length > 0 && (
                  <div className="absolute z-[1000] w-full bg-[#FAF9F4] border border-[#E8EBDF] rounded-xl shadow-lg mt-2 overflow-hidden">
                    {searchResults.map((result) => (
                      <button
                        key={result.place_id}
                        type="button"
                        onClick={() => handleSelectLocation(result)}
                        className="block w-full text-left px-4 py-3 text-sm text-[#31583B] hover:bg-[#F5F3EC] border-b border-[#E8EBDF] last:border-b-0"
                      >
                        {result.display_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {searchLoading && (
                <p className="text-sm text-[#7C857C] -mt-3">Searching locations...</p>
              )}

              <div className="relative rounded-2xl overflow-hidden">
                <LocationMap
                  latitude={coordinates.lat}
                  longitude={coordinates.lng}
                  onLocationChange={(lat, lng, locationName) => {
                    setCoordinates({ lat, lng });
                    setFormData((prev) => ({ ...prev, location: locationName }));
                  }}
                />

                <button
                  type="button"
                  onClick={handleCurrentLocation}
                  disabled={locationLoading}
                  className="absolute bottom-4 right-4 z-[1000] flex items-center gap-2 bg-[#FAF9F4] border border-[#E8EBDF] rounded-full px-4 py-2 text-sm text-[#31583B] shadow-sm hover:border-[#31583B] transition disabled:opacity-60"
                >
                  <LocateFixed size={16} />
                  {locationLoading ? "Detecting..." : "Use my location"}
                </button>
              </div>

              <div className="bg-[#E8EBDF] rounded-xl p-5 flex gap-4">
                <MapPin size={18} className="text-[#31583B] mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[#31583B]/70 mb-1">
                    Selected location
                  </p>
                  <p className="text-sm text-[#31583B] break-words">
                    {formData.location || "No location selected"}
                  </p>
                  <p className="text-xs text-[#7C857C] mt-2">
                    Latitude: {coordinates.lat.toFixed(4)} | Longitude:{" "}
                    {coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;