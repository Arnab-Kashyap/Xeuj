import { useState } from "react";
import Input from "../components/Input";
import { createComplaint } from "../services/complaintService";

function ReportIssue() {
 const [formData, setFormData] = useState({
  title: "",
  category: "Waste",
  description: "",
  location: "",
  image: "",
});
 
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createComplaint(formData);

      alert(response.message);

      setFormData({
        user: "",
        title: "",
        category: "Waste",
        description: "",
        location: "",
        image: "",
      });
    } catch (error) {
      console.log(error.response?.data);
      console.log(error);

      alert(error.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Report an Issue</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium">Issue Title</label>

            <Input
              type="text"
              name="title"
              placeholder="Enter issue title"
              value={formData.title}
              onChange={handleChange}
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
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>

            <Input
              type="text"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Upload Image</label>

            <input type="file" className="w-full p-3 border rounded-lg" />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportIssue;
