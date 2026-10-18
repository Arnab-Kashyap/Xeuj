import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import HowItWorks from "../sections/HowItWorks";
import RecentReports from "../sections/RecentReports";


function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <RecentReports />
    </div>
  );
}

export default Home;