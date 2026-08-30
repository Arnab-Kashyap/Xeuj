import { Link } from "react-router-dom";

function Features() {
  const features = [
    {
      icon: "♻️",
      title: "Report Waste Issues",
      description:
        "Report garbage dumps and waste-related problems in your area with ease.",
      link: "/report",
    },
    {
      icon: "🛣️",
      title: "Report Road Problems",
      description:
        "Report potholes, damaged roads, and other infrastructure issues.",
      link: "/report",
    },
    {
      icon: "📍",
      title: "Track Complaint",
      description:
        "Monitor your complaint from submission to resolution in real time.",
      link: "/track",
    },
  ];

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-green-700 font-semibold mb-2">
            How Xeuj Helps
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Simple. Smart. Effective.
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Report civic problems, provide their exact location, and
            stay updated until they are resolved.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-green-600 hover:shadow-xl transition duration-300"
            >
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              <div className="mt-6 text-green-700 font-semibold">
                Get started →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;