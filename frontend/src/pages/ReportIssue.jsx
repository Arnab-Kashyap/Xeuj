import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Input from "../components/Input";
import { createComplaint } from "../services/complaintService";
import LocationMap from "../components/LocationMap";

function ReportIssue() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    category: "Waste",
    description: "",
    location: "",
  });

  const [image, setImage] = useState(null);

  const [coordinates, setCoordinates] = useState({
    lat: 26.1445,
    lng: 91.7362,
  });

  const [locationLoading, setLocationLoading] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Search location
  const handleLocationSearch = async (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      location: value,
    }));

    if (value.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          value,
        )}&limit=5&addressdetails=1`,
      );

      const data = await response.json();

      setSearchResults(data);
    } catch (error) {
      console.error("Location search error:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  // Select searched location
  const handleSelectLocation = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);

    setCoordinates({
      lat,
      lng,
    });

    setFormData((prev) => ({
      ...prev,
      location: result.display_name,
    }));

    setSearchResults([]);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    const handleMapLocationChange = async (lat, lng) => {
  console.log("Map location changed:", lat, lng);


  setCoordinates({
    lat,
    lng,
  });

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );

    const data = await response.json();

    console.log("Selected location:", data);

    setFormData((prev) => ({
      ...prev,
      location:
        data.display_name ||
        `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    }));
  } catch (error) {
    console.error("Reverse geocoding failed:", error);

    setFormData((prev) => ({
      ...prev,
      location: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    }));
  }
};

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        console.log("Current Location:", lat, lng);

        setCoordinates({
          lat,
          lng,
        });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          );

          const data = await response.json();

          setFormData((prev) => ({
            ...prev,
            location: data.display_name || `${lat}, ${lng}`,
          }));
        } catch (error) {
          console.error("Reverse geocoding error:", error);

          setFormData((prev) => ({
            ...prev,
            location: `${lat}, ${lng}`,
          }));
        } finally {
          setLocationLoading(false);
        }
      },

      (error) => {
        console.error("Location error:", error);

        setLocationLoading(false);

        if (error.code === 1) {
          alert(
            "Location permission was denied. Please allow location access.",
          );
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
      },
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
      }),
    );

    if (image) {
      data.append("image", image);
    }

    try {
      const response = await createComplaint(data);

      alert(
        `Complaint submitted successfully!\n\nComplaint ID: ${response.complaint.complaintId}`,
      );

      setFormData({
        title: "",
        category: "Waste",
        description: "",
        location: "",
      });

      setCoordinates({
        lat: 26.1445,
        lng: 91.7362,
      });

      setImage(null);
      setSearchResults([]);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Report an Issue</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block mb-2 font-medium">Issue Title</label>

            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter issue title"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Issue Type</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Waste">Waste</option>
              <option value="Road">Road</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>

            <div className="relative">
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleLocationSearch}
                placeholder="Search for a location..."
              />

              {searchResults.length > 0 && (
                <div className="absolute z-[1000] w-full bg-white border rounded-lg shadow-lg mt-1">
                  {searchResults.map((result) => (
                    <button
                      type="button"
                      key={result.place_id}
                      onClick={() => handleSelectLocation(result)}
                      className="block w-full text-left px-4 py-3 hover:bg-green-50 border-b last:border-b-0"
                    >
                      <p className="text-sm">{result.display_name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {searchLoading && (
              <p className="text-sm text-gray-500 mt-2">
                Searching locations...
              </p>
            )}

            <button
              type="button"
              onClick={handleCurrentLocation}
              disabled={locationLoading}
              className="mt-3 w-full border border-green-700 text-green-700 py-3 rounded-lg hover:bg-green-50 transition disabled:opacity-50"
            >
              {locationLoading
                ? "Detecting Location..."
                : "📍 Use Current Location"}
            </button>

            <div className="mt-4">
              <LocationMap
                latitude={coordinates.lat}
                longitude={coordinates.lng}
                onLocationChange={(lat, lng, locationName) => {
                  setCoordinates({
                    lat,
                    lng,
                  });

                  setFormData((prev) => ({
                    ...prev,
                    location: locationName,
                  }));
                }}
              />
            </div>

            <div className="mt-3 text-sm text-gray-500">
              <p>Latitude: {coordinates.lat}</p>

              <p>Longitude: {coordinates.lng}</p>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Upload Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;
