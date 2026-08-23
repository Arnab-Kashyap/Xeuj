import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";

function Home() {
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}

export default Home;