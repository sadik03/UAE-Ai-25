import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import womanWithSuitcase from "./tourist-pointing-up Background Removed.png"; 
import bgShape from "./Decore.png";

export default function Landing() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleGetStarted = () => {
    navigate("/travel-form");
  };

  // Inline styles
  const styles = {
    '@import': `
      @import url('https://fonts.googleapis.com/css2?family=Boldonse&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Boldonse&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Qwigley&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Delius&display=swap');
    `,
    landingSection: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      background: '#fff',
      overflow: 'hidden'
    },
    landingContainer: {
      maxWidth: '1200px',
      margin: 'auto',
      display: 'flex',
      flexWrap: 'wrap' as const,
      alignItems: 'center',
      gap: '48px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 1s ease, transform 1s ease'
    },
    landingLeft: {
      flex: 1,
      marginTop: '-200px',
      minWidth: '300px',
      lineHeight: 1.6
    },
    badge: {
      color: '#2e7d32',
      fontWeight: 700,
      fontFamily: '"Qwigley", cursive',
      fontSize: '36px'
    },
    landingTitle: {
      color: '#333',
      fontSize: '57px',
      lineHeight: 1.6,
      fontFamily: '"Boldonse", system-ui',
      fontWeight: 400,
      margin: '20px 0'
    },
    amazingText: {
      background: 'linear-gradient(90deg, #2e7d32, #b8860b, #2e7d32)',
      backgroundSize: '300% auto',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 700,
      display: 'inline-block',
      animation: 'shine 3s linear infinite'
    },
    landingDesc: {
      fontFamily: '"Delius", cursive',
      fontSize: '22px',
      color: '#444',
      maxWidth: '560px',
      marginBottom: '32px'
    },
    landingButtons: {
      display: 'flex',
      gap: '24px',
      flexWrap: 'wrap' as const
    },
    btnPrimary: {
      background: '#2e7d32',
      color: '#fff',
      fontFamily: '"Delius", cursive',
      padding: '16px 48px',
      fontSize: '18px',
      fontWeight: 600,
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, background 0.3s ease',
      display: 'flex',
      alignItems: 'center'
    },
    landingRight: {
      flex: 1,
      minWidth: '300px',
      position: 'relative' as const,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '500px'
    },
    bgShape: {
      position: 'absolute' as const,
      rotate: '8deg',
      top: '-290px',
      width: '100%',
      right: '-290px',
      zIndex: -1,
      filter: 'brightness(0) saturate(100%) invert(74%) sepia(58%) saturate(609%) hue-rotate(11deg) brightness(95%) contrast(91%)'
    },
    bgShapeLeft: {
      position: 'absolute' as const,
      rotate: '180deg',
      bottom: '-410px',
      left: '-690px',
      width: '100%',
      zIndex: -1,
      filter: 'brightness(0) saturate(100%) invert(74%) sepia(58%) saturate(609%) hue-rotate(11deg) brightness(95%) contrast(91%)'
    },
    heroImage: {
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      objectFit: 'contain' as const,
      marginTop: '-50px',
      animation: 'float 6s ease-in-out infinite',
      zIndex: 2
    }
  };

  // Add keyframes to document head
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Boldonse&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Boldonse&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Qwigley&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Delius&display=swap');
      
      @keyframes shine {
        0% { background-position: 0% center; }
        50% { background-position: 100% center; }
        100% { background-position: 0% center; }
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      
      body {
        margin: 0;
        padding: 0;
        background: #fff;
      }
      
      @media (max-width: 1200px) {
        .landing-container-responsive {
          flex-direction: column !important;
          text-align: center !important;
          gap: 32px !important;
          padding: 40px 20px !important;
        }
        .landing-left-responsive {
          min-width: 100% !important;
          order: 2 !important;
          margin-top: 0 !important;
        }
        .landing-title-responsive {
          font-size: 48px !important;
          line-height: 1.4 !important;
        }
        .landing-desc-responsive {
          max-width: 100% !important;
          font-size: 20px !important;
        }
        .landing-right-responsive {
          min-width: 100% !important;
          order: 1 !important;
          max-width: 450px !important;
          margin: 0 auto !important;
          height: 400px !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
        .hero-image-responsive {
          margin-top: 0 !important;
          max-width: 90% !important;
          height: auto !important;
          max-height: 350px !important;
          object-fit: contain !important;
        }
        .bg-shape-responsive {
          display: none !important;
        }
      }
      
      @media (max-width: 768px) {
        .landing-section-responsive {
          padding: 40px 16px !important;
        }
        .landing-container-responsive {
          gap: 24px !important;
          padding: 20px 16px !important;
        }
        .landing-title-responsive {
          font-size: 36px !important;
          line-height: 1.3 !important;
        }
        .landing-desc-responsive {
          font-size: 18px !important;
          margin-bottom: 24px !important;
        }
        .landing-right-responsive {
          max-width: 320px !important;
          height: 300px !important;
          margin: 0 auto 20px auto !important;
        }
        .hero-image-responsive {
          max-width: 85% !important;
          max-height: 280px !important;
        }
        .btn-primary-responsive {
          font-size: 16px !important;
          padding: 12px 32px !important;
          width: 100% !important;
          max-width: 280px !important;
          justify-content: center !important;
        }
        .badge-responsive {
          font-size: 28px !important;
        }
      }
      
      @media (max-width: 480px) {
        .landing-section-responsive {
          padding: 20px 12px !important;
        }
        .landing-container-responsive {
          gap: 15px !important;
          padding: 16px 12px !important;
        }
        .landing-section-responsive {
          padding: 20px 12px !important;
          min-height: auto !important;
        }
        .landing-title-responsive {
          font-size: 28px !important;
          line-height: 1.2 !important;
        }
        .landing-desc-responsive {
          font-size: 16px !important;
          margin-bottom: 20px !important;
        }
        .landing-right-responsive {
          max-width: 280px !important;
          height: 250px !important;
          margin: 0 auto 15px auto !important;
        }
        .hero-image-responsive {
          max-width: 80% !important;
          max-height: 230px !important;
        }
        .btn-primary-responsive {
          font-size: 14px !important;
          padding: 10px 24px !important;
          width: 100% !important;
          max-width: 240px !important;
        }
        .badge-responsive {
          font-size: 24px !important;
        }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.landingSection} className="landing-section-responsive">
      <div 
        style={styles.landingContainer}
        className="landing-container-responsive"
      >
        <div 
          style={styles.landingLeft}
          className="landing-left-responsive"
        >
          <p style={styles.badge} className="badge-responsive">Best Destinations Around the World</p>
          <h1 
            style={styles.landingTitle}
            className="landing-title-responsive"
          >
            Explore the{" "}
            <motion.span
              style={styles.amazingText}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.1, rotate: 2 }}
            >
              Amazing
            </motion.span>{" "}
            UAE
          </h1>
          <p 
            style={styles.landingDesc}
            className="landing-desc-responsive"
          >
            Discover breathtaking destinations, create unforgettable memories, and experience the magic of the United Arab Emirates with our AI-powered travel planning.
          </p>
          <div style={styles.landingButtons}>
            <motion.button
              onClick={handleGetStarted}
              style={styles.btnPrimary}
              className="btn-primary-responsive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#1b5e20'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Start Planning
              <ArrowRight style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
            </motion.button>
          </div>
        </div>

        <div 
          style={styles.landingRight}
          className="landing-right-responsive"
        >
          <motion.img
            src={bgShape}
            alt=""
            style={styles.bgShape}
            className="bg-shape-responsive"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.img
            src={bgShape}
            alt=""
            style={styles.bgShapeLeft}
            className="bg-shape-responsive"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
          />
          <motion.img
            src={womanWithSuitcase}
            alt="Traveler with suitcase"
            style={styles.heroImage}
            className="hero-image-responsive"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}