import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partnership from "./components/Partnership";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Partnership />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
