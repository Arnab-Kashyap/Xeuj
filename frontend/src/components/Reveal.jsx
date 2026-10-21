import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Reveal({
  children,
  delay = 0,
  y = 40,
  duration = 1.4,
  start = "top 88%",
  className = "",
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y, duration, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export default Reveal;