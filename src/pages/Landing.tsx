import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import womanWithSuitcase from "./tourist-pointing-up Background Removed.png"; 
import bgShape from "./Decore.png"; 
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    // ✅ Disable scroll only for Landing page
    document.body.style.overflow = "hidden";

    return () => {
      // ✅ Restore scroll when leaving Landing
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/travel-form");
  };

  return (
    <div className="landing-section no-scroll">
      <div className={`landing-container ${isVisible ? "fade-in" : ""}`}>
        <div className="landing-left">
          <p className="badge">Best Destinations Around the World</p>
          <h1 className="landing-title">
            Explore the{" "}
            <motion.span
              className="amazing-text"
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.1, rotate: 2 }} // ✨ Hover luxury effect
            >
              Amazing
            </motion.span>{" "}
            UAE
          </h1>
          <p className="landing-desc">
            Discover breathtaking destinations, create unforgettable memories, and experience the magic of the United Arab Emirates with our AI-powered travel planning.
          </p>
          <div className="landing-buttons">
            <motion.button
              onClick={handleGetStarted}
              className="btn-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Planning
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </div>
        </div>

        <div className="landing-right">
          <motion.img
            src={bgShape}
            alt=""
            className="bg-shape"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.img
            src={bgShape}
            alt=""
            className="bg-shape-left"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
          />
          <motion.img
            src={womanWithSuitcase}
            alt="Traveler with suitcase"
            className="hero-image"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
