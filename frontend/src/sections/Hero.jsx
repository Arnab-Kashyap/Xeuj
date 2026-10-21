import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
  const introRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useLayoutEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tween = gsap.fromTo(
      intro,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        ease: "power2.out",
        clearProps: "transform",
      }
    );

    return () => tween.kill();
  }, []);

  useEffect(() => {
    const indicator = scrollIndicatorRef.current;
    const content = contentRef.current;
    if (!indicator || !content) return;

    const bounce = gsap.to(indicator, {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const fadeStart = window.innerHeight * 0.4;
      const fadeEnd = window.innerHeight * 0.95;

      if (scrolled > fadeStart) {
        const progress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
        content.style.opacity = Math.max(0, 1 - progress);
      } else {
        content.style.opacity = 1;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      bounce.kill();
    };
  }, []);

  return (
    <section className="sticky top-0 z-0 w-full h-screen bg-[#F5F3EC] overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/xeuj-hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#263D30]/15 via-transparent to-[#263D30]/10" />
      </div>

      <div
        ref={contentRef}
        className="relative h-full w-full flex flex-col items-center justify-center px-6"
      >
        <div ref={introRef} className="max-w-3xl text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-light text-[#202923] leading-tight mb-6">
            A better city
            <br />
            begins with you.
          </h1>

          <div className="w-16 h-1 bg-[#7C857C] mx-auto mb-8" />

          <p className="text-lg md:text-xl text-[#7C857C] mb-12 font-light">
            Report road issues and waste problems.
            <br />
            Track progress. See real change.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/report"
              className="bg-[#31583B] hover:bg-[#263D30] text-[#FAF9F4] px-8 py-4 rounded-full font-semibold text-center transition shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 flex items-center justify-center gap-2"
            >
              Report an Issue <span className="text-xl">→</span>
            </Link>

            <Link
              to="/track"
              className="border-2 border-[#31583B] text-[#31583B] hover:bg-[#31583B] hover:text-[#FAF9F4] px-8 py-4 rounded-full font-semibold text-center transition duration-300 flex items-center justify-center gap-2"
            >
              Track Complaint <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 inset-x-0 flex justify-center z-20 pointer-events-none">
        <div ref={scrollIndicatorRef} className="flex flex-col items-center gap-2">
          <span className="text-[#7C857C] text-xs tracking-widest uppercase font-light">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-[#7C857C] rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-[#7C857C] rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;