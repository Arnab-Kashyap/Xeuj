import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HowItWorks() {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.from(stepsRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 0.5,
      },
    });

    linesRef.current.forEach((line) => {
      if (line) {
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.5,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const steps = [
    {
      number: "1",
      title: "Report",
      description: "Submit road or waste issues in just a few seconds.",
    },
    {
      number: "2",
      title: "Track",
      description: "Get real-time updates on the status of your complaint.",
    },
    {
      number: "3",
      title: "Forwarded",
      description: "Your complaint is verified and forwarded to the right department.",
    },
    {
      number: "4",
      title: "Resolved",
      description: "Issues are resolved and you help build a better city for all.",
    },
  ];

  return (
    <>
    <div className="h-screen"></div>
    
    <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-28 z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-green-700 text-sm font-semibold tracking-widest uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900">
            Simple steps. Real impact.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) stepsRef.current[index] = el;
              }}
              className="flex flex-col items-center"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 border-2 border-green-300 mb-6 text-3xl font-bold text-green-700">
                {step.number}
              </div>

              {index < steps.length - 1 && (
                <div
                  ref={(el) => {
                    if (el) linesRef.current[index] = el;
                  }}
                  className="hidden md:block absolute w-12 h-0.5 bg-green-300 -right-6 top-10"
                ></div>
              )}

              <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <p className="text-3xl font-bold text-green-700 mb-2">1,254+</p>
            <p className="text-sm text-gray-600">Issues Reported</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <p className="text-3xl font-bold text-green-700 mb-2">980+</p>
            <p className="text-sm text-gray-600">Resolved</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <p className="text-3xl font-bold text-green-700 mb-2">2.3</p>
            <p className="text-sm text-gray-600">Avg. Days to Resolve</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <p className="text-3xl font-bold text-green-700 mb-2">12K+</p>
            <p className="text-sm text-gray-600">Active Citizens</p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default HowItWorks;