import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Car, AlertCircle, RefreshCw, Hotel, HotelIcon } from "lucide-react";
import { generateContent } from "../services/geminiService";
import { attractionsData, hotelData, transportData } from "../data/attractions";
import uaeSkyline from "../components/7655625.jpg";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";
import Ai from "./6221352.jpg";

// TypeScript interfaces for better type safety
interface TravelFormData {
  tripDuration: number;
  adults: number;
  kids: number;
  emirates: string;
  journeyMonth: string;
  budget?: string;
  interests?: string[];
}

interface Attraction {
  name: string;
  duration: string;
  type: string;
  description: string;
  price: number;
}

interface DayItinerary {
  id: string;
  title: string;
  day: number;
  duration: string;
  description: string;
  attractions: Attraction[];
  hotel: string;
  transport: string;
  image: string;
  images: string[];
}

interface TravelPackage {
  id: string;
  title: string;
  description: string;
  itinerary: DayItinerary[];
}

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Style constants for consistency
const STYLES = {
  fonts: {
    heading: '"Playfair Display", "Georgia", serif',
    body: '"Inter", "Segoe UI", system-ui, sans-serif',
  },
  colors: {
    primary: '#B01216',
    text: '#1F2937',
    textSecondary: '#374151',
    textMuted: '#6B7280',
  },
} as const;

export default function AIGenerate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TravelFormData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [retryCount, setRetryCount] = useState(0);

  const MAX_RETRY_ATTEMPTS = 3;

  // Memoized resize handler to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Memoized Lottie animation options
  const lottieOptions = useMemo(() => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }), []);

  // Memoized Lottie dimensions based on screen size
  const lottieDimensions = useMemo(() => {
    if (windowWidth < 640) return { height: 250, width: 250 };
    if (windowWidth < 768) return { height: 300, width: 300 };
    return { height: 400, width: 400 };
  }, [windowWidth]);

  useEffect(() => {
    const savedData = localStorage.getItem("travelFormData");
    if (savedData) {
      const data = JSON.parse(savedData);
      setFormData(data);

      const prompt = `
        You are a UAE travel planning assistant.
        User preferences: ${JSON.stringify(data)}
         
        Available attractions dataset: ${JSON.stringify(attractionsData)}
        Available hotels dataset: ${JSON.stringify(hotelData)}
        Available transport dataset: ${JSON.stringify(transportData)}

        Task: Create a detailed ${data.tripDuration} day itinerary for ${
          data.adults
        } adults${
          data.kids > 0 ? ` and ${data.kids} kids` : ""
        } visiting ${data.emirates} in ${data.journeyMonth}.
        
        Create 3 different packages with these specific themes:
        1. "Family Adventure" - Action-packed activities, outdoor adventures, and family-friendly attractions
        ${data.kids > 0 ? '2. "Kids Special" - Child-focused activities, theme parks, interactive experiences, and kid-friendly venues' : '2. "Relaxing Escape" - Spa treatments, beach time, leisurely activities, and peaceful experiences'}
        3. ${data.adults === 2 && data.kids === 0 ? '"Romantic Getaway" - Intimate dining, sunset experiences, couples activities, and luxury touches' : data.adults === 1 && data.kids === 0 ? '"Solo Explorer" - Self-discovery activities, photography spots, flexible itinerary, and personal enrichment experiences' : '"Cultural Discovery" - Museums, heritage sites, traditional markets, and cultural experiences'}
        
        - Each package should be an object with an 'id', 'title', 'description', and an 'itinerary' key.
        - The 'itinerary' key should contain a detailed day-by-day plan as an array of objects.
        - Each day object must have: id (string), title (string), day (number), duration (string),
          description (string),
          attractions: [{name, duration, type, description, price (number)}],
          hotel (string), transport (string),
          - For all price fields, provide the final numeric value, not a mathematical expression.
          image (string URL from the provided datasets, using the ImageUrl property),
          images (array of 3 string URLs from the provided datasets, using the ImageUrl property)
        - Return ONLY a valid JSON array of these 3 package objects with no extra text, no markdown, no explanations.
      `;

      generateContent({ prompt }).then((res) => {
        if (res.success) {
          try {
            const clean = res.content
              .replace(/```json/gi, "")
              .replace(/```/g, "")
              .replace(/^[^{\[]+/, "")
              .replace(/[^}\]]+$/, "")
              .trim();
            const parsed = JSON.parse(clean);
            setPackages(parsed); // Set the state with the array of 3 packages

            // Save the generated packages to localStorage
            localStorage.setItem("generatedPackages", JSON.stringify(parsed));
          } catch (e) {
            console.error("JSON parse error:", e, res.content);
          }
        }
        setLoadingState('success');
      }).catch((error) => {
        console.error('Failed to generate itinerary:', error);
        setError('Failed to generate your itinerary. Please try again.');
        setLoadingState('error');
      });
    } else {
      setError('No travel preferences found. Please go back and fill out the form.');
      setLoadingState('error');
    }
  }, []);

  // Enhanced function to handle viewing package details with error handling
  const handleViewDetails = useCallback((selectedPackage: TravelPackage) => {
    try {
      localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage));
      navigate("/details");
    } catch (error) {
      console.error('Failed to save selected package:', error);
      // Still navigate but show a warning
      navigate("/details", { state: { package: selectedPackage } });
    }
  }, [navigate]);

  // Enhanced loading state with retry information
  if (loadingState === 'loading') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center px-4"
        style={{ backgroundImage: `url(${Ai})` }}
        role="status"
        aria-live="polite"
        aria-label="Loading your travel itinerary"
      >
        <div className="max-w-md w-full mx-auto">
          {/* Lottie Animation */}
          <div className="flex justify-center items-center mb-6" aria-hidden="true">
            <Lottie 
              options={lottieOptions} 
              height={lottieDimensions.height} 
              width={lottieDimensions.width} 
            />
          </div>

          {/* Text Below Animation */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-wide"
            style={{ 
              fontFamily: STYLES.fonts.body,
              fontWeight: '700',
              letterSpacing: '0.025em',
              color: STYLES.colors.primary
            }}
          >
            Creating Your Perfect Itinerary
          </h3>
         
          <p className="text-base sm:text-lg text-gray-600 px-2 font-medium mb-2"
            style={{ 
              fontFamily: STYLES.fonts.body,
              fontWeight: '500',
              lineHeight: '1.6'
            }}
          >
            Our AI is analyzing your preferences...
          </p>
          
          {retryCount > 0 && (
            <p className="text-sm text-gray-500 px-2"
              style={{ fontFamily: STYLES.fonts.body }}
            >
              Attempt {retryCount + 1} of {MAX_RETRY_ATTEMPTS}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Enhanced error state with retry option
  if (loadingState === 'error') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center px-4"
        style={{ backgroundImage: `url(${Ai})` }}
        role="alert"
        aria-live="assertive"
      >
        <div className="max-w-md w-full mx-auto bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" aria-hidden="true" />
          
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-red-600"
            style={{ fontFamily: STYLES.fonts.body }}
          >
            Oops! Something went wrong
          </h3>
          
          <p className="text-gray-700 mb-6 leading-relaxed"
            style={{ fontFamily: STYLES.fonts.body }}
          >
            {error}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => window.location.reload()}
              className="flex-1 flex items-center justify-center gap-2"
              style={{ fontFamily: STYLES.fonts.body }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1"
              style={{ fontFamily: STYLES.fonts.body }}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${uaeSkyline})` }}
    >
      <div className="min-h-screen">
        <ProgressBar currentStep={2} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight"
            style={{ 
              fontFamily: STYLES.fonts.heading,
              fontWeight: '800',
              letterSpacing: '-0.025em',
              color: STYLES.colors.primary,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            >
              Choose Your AI-Generated Package
            </h1>
            <p className="font-semibold text-lg sm:text-xl md:text-2xl px-2 sm:px-4 max-w-4xl mx-auto"
               style={{ 
                 fontFamily: STYLES.fonts.body,
                 fontWeight: '600',
                 lineHeight: '1.5',
                 color: STYLES.colors.textSecondary
               }}
            >
              Based on your preferences, here are three different journey options.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
               role="list"
               aria-label="Available travel packages"
          >
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.id || index} 
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary/50"
                role="listitem"
              >
                <div className="relative">
                  <img
                    src={pkg.itinerary[0]?.image}
                    alt={`${pkg.title} - Main destination image`}
                    className="w-full h-40 sm:h-48 md:h-52 lg:h-48 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = uaeSkyline;
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="text-xs sm:text-sm bg-white/50 backdrop-blur-md text-gray-800 border border-gray-300 shadow-md hover:bg-transparent">
                      Package {index + 1}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg sm:text-xl md:text-2xl leading-tight mb-2"
                     style={{ 
                       fontFamily: STYLES.fonts.body,
                       fontWeight: '700',
                       color: STYLES.colors.text
                     }}
                    >
                      {pkg.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-medium"
                       style={{ 
                         fontFamily: STYLES.fonts.body,
                         lineHeight: '1.6'
                       }}
                    >
                      {pkg.description}
                    </p>
                  </div>

                  {/* Enhanced key details with better accessibility */}
                  {pkg.itinerary && pkg.itinerary.length > 0 && (
                    <div className="space-y-3 mb-6" role="list" aria-label="Package highlights">
                      <div className="flex items-center text-sm font-medium text-gray-700" role="listitem">
                        <Clock className="w-4 h-4 mr-3 flex-shrink-0 text-blue-600" aria-hidden="true" />
                        <span className="truncate" style={{ fontFamily: STYLES.fonts.body }}>
                          <span className="sr-only">Duration: </span>
                          {formData?.tripDuration} {formData?.tripDuration === 1 ? 'Day' : 'Days'}
                        </span>
                      </div>
                      <div className="flex items-center text-sm font-medium text-gray-700" role="listitem">
                        <Hotel className="w-4 h-4 mr-3 flex-shrink-0 text-yellow-500" aria-hidden="true" />
                        <span className="truncate" style={{ fontFamily: STYLES.fonts.body }}>
                          <span className="sr-only">Hotel: </span>
                          {pkg.itinerary[0]?.hotel}
                        </span>
                      </div>
                      <div className="flex items-center text-sm font-medium text-gray-700" role="listitem">
                        <Car className="w-4 h-4 mr-3 flex-shrink-0 text-green-600" aria-hidden="true" />
                        <span className="truncate" style={{ fontFamily: STYLES.fonts.body }}>
                          <span className="sr-only">Transport: </span>
                          {pkg.itinerary[0]?.transport}
                        </span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full text-sm sm:text-base py-3 sm:py-4 font-semibold tracking-wide hover:shadow-lg transition-all duration-200"
                    style={{ 
                      fontFamily: STYLES.fonts.body,
                      fontWeight: '600'
                    }}
                    onClick={() => handleViewDetails(pkg)}
                    aria-label={`View details for ${pkg.title}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}