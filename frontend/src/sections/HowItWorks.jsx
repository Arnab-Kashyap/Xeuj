import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const contextRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "Report an Issue",
      description: "Capture the problem with a photo and share the details of your complaint.",
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Add Location",
      description: "Tell us where it is so the right team can find it quickly.",
      color: "bg-green-100",
    },
    {
      id: 3,
      title: "Track Progress",
      description: "Check the status of your complaint anytime, anywhere.",
      color: "bg-purple-100",
    },
    {
      id: 4,
      title: "Get Resolution",
      description: "Stay informed when the issue is solved.",
      color: "bg-yellow-100",
    },
  ];

  // Calculate card position based on active step
  const getCardPosition = (index) => {
    const position = (index - activeStep + steps.length) % steps.length;
    
    if (position === 0) {
      // Active card - center
      return { x: 0, scale: 1, opacity: 1, zIndex: 30 };
    } else if (position === 1) {
      // Next card - right
      return { x: 340, scale: 0.8, opacity: 0.6, zIndex: 20 };
    } else if (position === steps.length - 1) {
      // Previous card - left
      return { x: -340, scale: 0.8, opacity: 0.6, zIndex: 20 };
    } else {
      // Far cards - far right
      return { x: 680, scale: 0.6, opacity: 0.3, zIndex: 10 };
    }
  };

  // Animate cards on activeStep change
  useEffect(() => {
    contextRef.current = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const position = getCardPosition(index);
        
        gsap.to(card, {
          x: position.x,
          scale: position.scale,
          opacity: position.opacity,
          zIndex: position.zIndex,
          duration: 0.7,
          ease: "power3.inOut",
        });
      });
    }, carouselRef.current);

    return () => contextRef.current?.revert();
  }, [activeStep]);

  // Handle navigation
  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handleCardClick = (index) => {
    setActiveStep(index);
  };

  const handleIndicatorClick = (index) => {
    setActiveStep(index);
  };

  return (
    <>
    <div className="h-screen"></div>
    
    <section className="w-full bg-gray-50 py-20 md:py-28 z-10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-green-700 text-sm font-semibold tracking-widest uppercase mb-4">
            How Xeuj Works
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-6">
            Four simple steps
            <br />
            to make a <span className="text-green-700">change.</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            From a local problem to a resolved issue — it only takes a few clicks.
            <br />
            Here's how Xeuj works.
          </p>
        </div>

        <div
          ref={carouselRef}
          className="relative w-full h-96 mb-12 flex items-center justify-center overflow-hidden"
        >
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`absolute w-80 h-72 rounded-2xl p-6 shadow-lg cursor-pointer transition-all ${step.color}`}
              onClick={() => handleCardClick(index)}
              style={{ willChange: "transform" }}
            >
              <div className="text-sm font-semibold text-green-700 mb-2">
                STEP {String(step.id).padStart(2, "0")}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {step.description}
              </p>
              <div className="w-full h-40 bg-white/40 rounded-lg flex items-center justify-center text-gray-400 font-semibold">
                Image Placeholder
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full hover:bg-gray-200 transition font-bold text-xl"
          >
            ←
          </button>

          <div className="flex gap-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleIndicatorClick(index)}
                className={`w-12 h-12 rounded-full font-bold transition ${
                  activeStep === index
                    ? "bg-green-700 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {String(step.id).padStart(2, "0")}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full hover:bg-gray-200 transition font-bold text-xl"
          >
            →
          </button>
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