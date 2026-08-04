import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Input from "../components/Input";
import { createComplaint } from "../services/complaintService";

function ReportIssue() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    title: "",
    category: "Waste",
    description: "",
    location: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("clerkId", user.id);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("location", formData.location);

    if (image) {
      data.append("image", image);
    }

    try {
      const response = await createComplaint(data);

      alert(
        `Complaint submitted successfully!\n\nComplaint ID: ${response.complaint.complaintId}`
      );

      setFormData({
        title: "",
        category: "Waste",
        description: "",
        location: "",
      });

      setImage(null);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">

        <h1 className="text-3xl font-bold mb-6">
          Report an Issue
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-2 font-medium">
              Issue Title
            </label>

            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter issue title"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Issue Type
            </label>

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
            <label className="block mb-2 font-medium">
              Description
            </label>

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
            <label className="block mb-2 font-medium">
              Location
            </label>

            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Upload Image
            </label>

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