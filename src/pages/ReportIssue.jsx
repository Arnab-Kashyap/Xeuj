function ReportIssue() {
  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold mb-6">
          Report an Issue
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Issue Title
            </label>
            <input
              type="text"
              placeholder="Enter issue title"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Issue Type
            </label>
            <select className="w-full p-3 border rounded-lg">
              <option>Waste</option>
              <option>Road</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Describe the issue"
              className="w-full p-3 border rounded-lg"
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              className="w-full p-3 border rounded-lg"
            />
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