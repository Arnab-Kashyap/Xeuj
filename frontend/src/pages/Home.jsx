import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import HowItWorks from "../sections/HowItWorksSection";
import Features from "../sections/Features";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
    </div>
  );
}

export default Home;