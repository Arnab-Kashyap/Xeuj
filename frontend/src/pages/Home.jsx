import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import HowItWorks from "../sections/HowItWorks";
import RecentReports from "../sections/RecentReports";
import Footer from "../sections/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <RecentReports />
      <Footer />
    </div>
  );
}

export default Home;