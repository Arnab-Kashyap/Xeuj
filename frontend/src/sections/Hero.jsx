import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-green-50 px-6 py-20 md:py-28">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Smart Civic Issue Reporting
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Report issues.
            <span className="block text-green-700">
              Improve your city.
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
            Xeuj helps citizens report waste and road-related problems with
            precise locations, images, and real-time complaint tracking.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/report"
              className="bg-green-700 hover:bg-green-800 text-white px-7 py-3.5 rounded-xl font-semibold text-center transition shadow-md hover:shadow-lg"
            >
              Report an Issue
            </Link>

            <Link
              to="/track"
              className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-7 py-3.5 rounded-xl font-semibold text-center transition"
            >
              Track Complaint
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-green-700 font-bold">✓</span>
              Easy Reporting
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-700 font-bold">✓</span>
              Exact Location
            </div>

            <div className="flex items-center gap-2">
              <span className="text-green-700 font-bold">✓</span>
              Live Tracking
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-green-100">
            <div className="bg-green-100 rounded-2xl h-80 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-green-700 rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                <span className="text-white text-3xl font-bold">
                  X
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Clean City
              </h2>

              <p className="mt-2 text-gray-600">
                Smart reporting for a better community.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-5 py-4 border border-gray-100">
            <p className="text-xs text-gray-500">
              Complaint Status
            </p>

            <p className="text-green-700 font-bold mt-1">
              ● In Progress
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;