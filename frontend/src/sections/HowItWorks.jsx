import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const carouselRef = useRef(null);
  const cardsRef = useRef([]);
  const activeStepRef = useRef(0);
  const animatingRef = useRef(false);
  const timelineRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "Report an Issue",
      description:
        "Capture the problem with a photo and share the details of your complaint.",
      bgColor: "bg-[#FAF9F4]",
      borderColor: "border-[#E8EBDF]",
    },
    {
      id: 2,
      title: "Add Location",
      description:
        "Tell us where it is so the right team can find it quickly.",
      bgColor: "bg-[#FAF9F4]",
      borderColor: "border-[#E8EBDF]",
    },
    {
      id: 3,
      title: "Track Progress",
      description:
        "Check the status of your complaint anytime, anywhere.",
      bgColor: "bg-[#FAF9F4]",
      borderColor: "border-[#E8EBDF]",
    },
    {
      id: 4,
      title: "Get Resolution",
      description:
        "Stay informed when the issue is solved.",
      bgColor: "bg-[#FAF9F4]",
      borderColor: "border-[#E8EBDF]",
    },
  ];

  const getCardPosition = useCallback(
    (index, currentStep) => {
      const total = steps.length;
      const position = (index - currentStep + total) % total;

      if (position === 0) {
        return { x: 0, scale: 1, opacity: 1, zIndex: 30 };
      }

      if (position === 1) {
        return { x: 340, scale: 0.8, opacity: 0.6, zIndex: 20 };
      }

      if (position === total - 1) {
        return { x: -340, scale: 0.8, opacity: 0.6, zIndex: 20 };
      }

      return { x: 680, scale: 0.6, opacity: 0.3, zIndex: 10 };
    },
    [steps.length]
  );

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, index) => {
      if (!card) return;

      gsap.set(card, getCardPosition(index, 0));
    });

    return () => {
      timelineRef.current?.kill();

      cards.forEach((card) => {
        if (card) gsap.killTweensOf(card);
      });
    };
  }, [getCardPosition]);

  const goToStep = useCallback(
    (direction) => {
      if (animatingRef.current) return;

      const total = steps.length;
      const previousStep = activeStepRef.current;

      const nextStep =
        direction === "next"
          ? (previousStep + 1) % total
          : (previousStep - 1 + total) % total;

      animatingRef.current = true;

      timelineRef.current?.kill();

      const cards = cardsRef.current;
      const exitIndex =
        direction === "next"
          ? (previousStep - 1 + total) % total
          : (previousStep + 2) % total;

      const timeline = gsap.timeline({
        onComplete: () => {
          activeStepRef.current = nextStep;
          setActiveStep(nextStep);
          animatingRef.current = false;
          timelineRef.current = null;
        },
      });

      timelineRef.current = timeline;

      cards.forEach((card, index) => {
        if (!card) return;

        gsap.killTweensOf(card);

        const target = getCardPosition(index, nextStep);

        if (index === exitIndex) {
          const exitX = direction === "next" ? -680 : 1020;
          const resetX = direction === "next" ? 1020 : -680;

          timeline
            .to(
              card,
              {
                x: exitX,
                opacity: 0,
                duration: 0.35,
                ease: "none",
              },
              0
            )
            .set(card, {
              x: resetX,
              scale: 0.6,
              opacity: 0,
              zIndex: 10,
            })
            .to(card, {
              x: target.x,
              scale: target.scale,
              opacity: target.opacity,
              zIndex: target.zIndex,
              duration: 0.35,
              ease: "none",
            });
        } else {
          timeline.to(
            card,
            {
              x: target.x,
              scale: target.scale,
              opacity: target.opacity,
              zIndex: target.zIndex,
              duration: 0.7,
              ease: "none",
            },
            0
          );
        }
      });
    },
    [getCardPosition, steps.length]
  );

  const handlePrev = () => goToStep("prev");

  const handleNext = () => goToStep("next");

  const handleCardClick = (index) => {
    if (index === activeStepRef.current || animatingRef.current) return;

    const total = steps.length;
    const current = activeStepRef.current;

    if (index === (current + 1) % total) {
      goToStep("next");
    } else if (index === (current - 1 + total) % total) {
      goToStep("prev");
    } else {
      animatingRef.current = true;
      timelineRef.current?.kill();

      const timeline = gsap.timeline({
        onComplete: () => {
          activeStepRef.current = index;
          setActiveStep(index);
          animatingRef.current = false;
          timelineRef.current = null;
        },
      });

      timelineRef.current = timeline;

      cardsRef.current.forEach((card, cardIndex) => {
        if (!card) return;

        gsap.killTweensOf(card);

        const target = getCardPosition(cardIndex, index);

        timeline.to(
          card,
          {
            x: target.x,
            scale: target.scale,
            opacity: target.opacity,
            zIndex: target.zIndex,
            duration: 0.7,
            ease: "power3.inOut",
          },
          0
        );
      });
    }
  };

  const handleIndicatorClick = handleCardClick;

  return (
    <>
      <div className="h-screen"></div>

      <section className="w-full bg-[#E8EBDF] py-20 md:py-28 z-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#31583B] text-sm font-semibold tracking-widest uppercase mb-4">
              How Xeuj Works
            </p>

            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#202923] mb-6">
              Four simple steps
              <br />
              to make a <span className="text-[#31583B]">change.</span>
            </h2>

            <p className="text-[#7C857C] max-w-2xl mx-auto text-lg">
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
                className={`absolute w-80 h-72 rounded-2xl p-6 shadow-sm cursor-pointer border ${step.bgColor} ${step.borderColor}`}
                onClick={() => handleCardClick(index)}
                style={{ willChange: "transform" }}
              >
                <div className="text-sm font-semibold text-[#31583B] mb-2">
                  STEP {String(step.id).padStart(2, "0")}
                </div>

                <h3 className="text-2xl font-bold text-[#202923] mb-3">
                  {step.title}
                </h3>

                <p className="text-[#7C857C] text-sm leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="w-full h-40 bg-[#F5F3EC] rounded-lg flex items-center justify-center text-[#7C857C] font-semibold border border-[#E8EBDF]">
                  Image Placeholder
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-8">
            <button
              onClick={handlePrev}
              disabled={animatingRef.current}
              className="p-3 rounded-full hover:bg-[#E8EBDF] transition font-bold text-xl text-[#31583B]"
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
                      ? "bg-[#31583B] text-[#FAF9F4]"
                      : "bg-[#E8EBDF] text-[#7C857C] hover:bg-[#D8DCC9]"
                  }`}
                >
                  {String(step.id).padStart(2, "0")}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={animatingRef.current}
              className="p-3 rounded-full hover:bg-[#E8EBDF] transition font-bold text-xl text-[#31583B]"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default HowItWorks;