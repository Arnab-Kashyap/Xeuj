import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    gsap.to(scrollIndicatorRef.current, {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="fixed inset-0 w-full h-screen bg-gray-100 overflow-hidden z-0"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/xeuj-hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5"></div>
      </div>

      <div
        ref={contentRef}
        className="relative h-full w-full flex flex-col items-center justify-center px-6"
      >
        <div className="max-w-3xl text-center z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-light text-gray-800 leading-tight mb-6">
            A better city
            <br />
            begins with you.
          </h1>

          <div className="w-16 h-1 bg-gray-400 mx-auto mb-8"></div>

          <p className="text-lg md:text-xl text-gray-600 mb-12 font-light">
            Report road issues and waste problems.
            <br />
            Track progress. See real change.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/report"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-semibold text-center transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 flex items-center justify-center gap-2"
            >
              Report an Issue <span className="text-xl">→</span>
            </Link>

            <Link
              to="/track"
              className="border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-4 rounded-full font-semibold text-center transition duration-300 flex items-center justify-center gap-2"
            >
              Track Complaint <span className="text-xl">📍</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-gray-600 text-xs tracking-widest uppercase font-light">
          Scroll
        </span>
        <div className="w-0.5 h-8 bg-gray-400"></div>
      </div>
    </section>
  );
}

export default Hero;