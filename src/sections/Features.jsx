function Features() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl">
            Report Waste Issues
          </div>

          <div className="p-6 border rounded-xl">
            Report Road Problems
          </div>

          <div className="p-6 border rounded-xl">
            Track Complaint Status
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;