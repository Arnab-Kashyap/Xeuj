function Hero() {
  return (
    <section className="min-h-screen bg-green-50 pt-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-green-700 font-semibold mb-4">
            Clean City • Smart Reporting
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Report civic issues and build a cleaner future.
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Xeuj helps citizens report waste and road-related problems with
            location, images, and real-time tracking.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-green-700 text-white px-6 py-3 rounded-full">
              Report Issue
            </button>

            <button className="border border-green-700 text-green-700 px-6 py-3 rounded-full">
              Track Complaint
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-sm">
          <div className="h-72 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 font-bold">
            Hero Image Placeholder
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;