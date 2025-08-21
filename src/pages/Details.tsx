
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import uaeSkyline from "../components/7655625.jpg";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Clock,
  MapPin,
  Star,
  Plane,
  Hotel,
  ChevronDown,
  ChevronUp,
  Edit,
  ArrowLeft,
  ImageIcon,
  Car,
  PlaneIcon,
  Pin,
} from "lucide-react";
import { CustomizePanel } from "@/components/CustomizePanel";

export default function Details() {
  const navigate = useNavigate();
  const [expandedDay, setExpandedDay] = useState("day-1");
  const [showCustomize, setShowCustomize] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [headerTitle, setHeaderTitle] = useState("Loading...");
  const [headerSubtitle, setHeaderSubtitle] = useState(
    "Getting your itinerary ready..."
  );

  const [headerImage, setHeaderImage] = useState(
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&crop=center"
  );
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const savedPackage = localStorage.getItem("selectedPackage");
    if (savedPackage) {
      const parsedPackage = JSON.parse(savedPackage);
      setItinerary(parsedPackage.itinerary);
      setHeaderTitle(parsedPackage.title);
      setHeaderSubtitle(parsedPackage.description);

      const collectedImages = parsedPackage.itinerary
        .flatMap((day) => day.images)
        .filter(Boolean);
      setAllImages(collectedImages);

      if (collectedImages.length > 0) {
        setHeaderImage(collectedImages[0]);
      }
    } else {
      navigate("/ai-generate");
    }
  }, [navigate]);

  useEffect(() => {
    if (allImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [allImages]);

  useEffect(() => {
    if (allImages.length > 0) {
      setHeaderImage(allImages[currentImageIndex]);
    }
  }, [currentImageIndex, allImages]);

  const toggleDay = (dayId) => {
    setExpandedDay((prev) => (prev === dayId ? null : dayId));
  };

  const handleCustomize = (day) => {
    setSelectedDay(day);
    setShowCustomize(true);
  };

  const handleUpdateDay = (updatedDay) => {
    setItinerary((prev) =>
      prev.map((day) => (day.id === updatedDay.id ? updatedDay : day))
    );
  };

  if (itinerary.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading your detailed itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${uaeSkyline})` }}
    >
      <div className="min-h-screen relative ">
        <ProgressBar currentStep={3} />

        <div className="container mx-auto px-4 sm:px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-center justify-between mb-6 sm:mb-8 gap-4 text-center lg:text-left">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 w-full sm:w-auto order-1 lg:order-none"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="order-2 lg:order-none flex-1">
                <h1 className="text-lg sm:text-2xl lg:text-4xl mb-1 sm:mb-2 font-black tracking-tighter"
                  style={{
                    fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                    color: '#0f172a',
                    letterSpacing: '-0.03em',
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    fontWeight: '900'
                  }}
                >
                  {headerTitle}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 px-4 lg:px-0 font-medium"
                  style={{
                    fontFamily: '"Crimson Text", "Georgia", serif',
                    lineHeight: '1.7',
                    fontStyle: 'italic',
                    color: '#475569',
                    letterSpacing: '0.01em'
                  }}
                >
                  {headerSubtitle}
                </p>
              </div>
              <div className="w-32 hidden lg:block" />
            </div>

            {/* Main Image Gallery */}
            <Card className="card-luxury mb-6 sm:mb-8 overflow-hidden">
              <div className="relative h-48 sm:h-64 lg:h-80">
                <img
                  src={headerImage}
                  alt="Featured destination"
                  className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end">
                  <div className="p-4 sm:p-6 text-white">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-black mb-2 tracking-tighter"
                      style={{
                        fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                        color: 'white',
                        letterSpacing: '-0.03em',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        fontWeight: '900'
                      }}
                    >
                      {headerTitle}
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base font-medium"
                      style={{
                        fontFamily: '"Crimson Text", "Georgia", serif',
                        lineHeight: '1.6',
                        fontStyle: 'italic',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        letterSpacing: '0.01em'
                      }}
                    >{headerSubtitle}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                  {itinerary
                    .flatMap((day) => day.images)
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="relative h-20 sm:h-24 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setHeaderImage(image)}
                      >
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            {/* Day-by-Day Breakdown */}
            <div className="space-y-4 sm:space-y-6">
              {itinerary.map((day, index) => {
                const isFirst = index === 0;
                const isLast = index === itinerary.length - 1;
                // Extra overlap in px to bridge gaps between items (covers sm:space-y-6 as well)
                const GAP = 24; // px
                const topOffset = isFirst ? 0 : -GAP;
                const heightExtraTop = isFirst ? 0 : GAP;
                const heightExtraBottom = isLast ? 0 : GAP;
                const lineHeight = `calc(100% + ${heightExtraTop + heightExtraBottom}px)`;
                const lineTop = `${topOffset}px`;

                return (
                <div key={day.id} className="flex relative">
                  {/* Left Side: Day Label with Continuous Vertical Line - Hidden on mobile */}
                  <div className="relative flex-shrink-0 hidden sm:block">
                    {/* Per-item line that bridges into gaps above/below */}
                    <div
                      className={`absolute left-1/2 -ml-0.5 w-1 bg-red-400 z-0 transition-all duration-300 ease-in-out`}
                      style={{
                        top: lineTop,
                        height: lineHeight,
                      }}
                    />

                    {/* Circle with day number */}
                    <div className="relative z-10 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 flex-shrink-0 flex items-center justify-center">
                      <div className="rounded-full w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-base sm:text-lg border-3 border-white shadow-2xl"
                        style={{
                          fontFamily: '"Montserrat", "Inter", sans-serif',
                          fontWeight: '900',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
                        }}
                      >
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Itinerary Card */}
                  <Card className="flex-grow card-luxury overflow-hidden relative">
                    {/* Mobile Day Number Badge */}
                    <div className="absolute top-4 left-4 sm:hidden z-10">
                      <div className="rounded-full w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-xl"
                        style={{
                          fontFamily: '"Montserrat", "Inter", sans-serif',
                          fontWeight: '900',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
                        }}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <Collapsible
                      open={expandedDay === day.id}
                      onOpenChange={() => toggleDay(day.id)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="hover:bg-secondary/30 transition-colors cursor-pointer pt-12 sm:pt-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <div className="text-left pl-8 sm:pl-0">
                              <CardTitle className="text-sm sm:text-base lg:text-xl font-black tracking-tighter"
                                style={{
                                  fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                                  color: '#991b1b',
                                  letterSpacing: '-0.02em',
                                  textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                  fontWeight: '900'
                                }}
                              >
                                {day.title}
                              </CardTitle>
                              <div className="flex flex-wrap gap-3 sm:gap-4 text-muted-foreground mt-1 text-xs sm:text-sm font-semibold"
                                style={{
                                  fontFamily: '"Source Sans Pro", "Inter", sans-serif',
                                  color: '#64748b',
                                  letterSpacing: '0.025em'
                                }}
                              >
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  {day.duration}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  {day.attractions.length} attractions
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between sm:justify-end items-center gap-2 pl-8 sm:pl-0">
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCustomize(day);
                                }}
                                className="text-xs sm:text-sm px-2 sm:px-3 font-bold tracking-wide"
                                style={{
                                  fontFamily: '"Montserrat", "Inter", sans-serif',
                                  letterSpacing: '0.05em',
                                  textTransform: 'uppercase',
                                  fontWeight: '700'
                                }}
                              >
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                Customize
                              </Button>
                              {expandedDay === day.id ? (
                                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                              ) : (
                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0 px-4 sm:px-6">
                          <div className="border-t border-border pt-4 sm:pt-6">
                            <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base font-normal"
                              style={{
                                fontFamily: '"Crimson Text", "Georgia", serif',
                                color: '#475569',
                                lineHeight: '1.8',
                                fontStyle: 'normal',
                                letterSpacing: '0.01em'
                              }}
                            >
                              {day.description}
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                              <div>
                                <h3 className="text-base font-black mb-4 text-accent flex items-center tracking-tight"
                                  style={{
                                    fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                                    color: '#991b1b',
                                    letterSpacing: '-0.015em',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                    fontWeight: '900'
                                  }}
                                >
                                  <Pin className="w-5 h-5 mr-2" />
                                  Attractions & Activities
                                </h3>
                                <div className="space-y-4">
                                  {day.attractions.map((attraction, i) => (
                                    <div key={i} className="card-travel p-4">
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                                        <h4 className="font-bold text-sm"
                                          style={{
                                            fontFamily: '"Montserrat", "Inter", sans-serif',
                                            color: '#1e293b',
                                            letterSpacing: '0.01em',
                                            fontWeight: '700'
                                          }}
                                        >
                                          {attraction.name}
                                        </h4>
                                        <Badge variant="outline" className="text-xs">
                                          {attraction.duration}
                                        </Badge>
                                      </div>
                                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 font-normal"
                                        style={{
                                          fontFamily: '"Source Sans Pro", "Inter", sans-serif',
                                          color: '#64748b',
                                          lineHeight: '1.6',
                                          letterSpacing: '0.01em'
                                        }}
                                      >
                                        {attraction.description}
                                      </p>
                                      <div className="flex flex-wrap justify-between items-center gap-2">
                                        <Badge variant="secondary" className="text-xs">
                                          {attraction.type}
                                        </Badge>
                                        {attraction.price > 0 && (
                                          <span className="text-xs sm:text-sm font-medium text-primary">
                                            ${attraction.price}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-base font-black mb-3 text-accent flex items-center tracking-tight"
                                    style={{
                                      fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                                      color: '#991b1b',
                                      letterSpacing: '-0.015em',
                                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                      fontWeight: '900'
                                    }}
                                  >
                                    <Hotel className="w-4 h-4 mr-2" />
                                    Accommodation
                                  </h4>
                                  <div className="card-travel p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                      <div className="flex items-center">
                                        <Star className="w-4 h-4 text-primary mr-2" />
                                        <span className="font-bold text-sm"
                                          style={{
                                            fontFamily: '"Montserrat", "Inter", sans-serif',
                                            color: '#1e293b',
                                            letterSpacing: '0.01em',
                                            fontWeight: '700'
                                          }}
                                        >
                                          {day.hotel}
                                        </span>
                                      </div>
                                      <Badge variant="outline">Premium</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-base font-black mb-3 text-accent flex items-center tracking-tight"
                                    style={{
                                      fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                                      color: '#991b1b',
                                      letterSpacing: '-0.015em',
                                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                      fontWeight: '900'
                                    }}
                                  >
                                    <Car className="w-4 h-4 mr-2" />
                                    Transportation
                                  </h4>
                                  <div className="card-travel p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                      <span className="font-bold text-sm"
                                        style={{
                                          fontFamily: '"Montserrat", "Inter", sans-serif',
                                          color: '#1e293b',
                                          letterSpacing: '0.01em',
                                          fontWeight: '700'
                                        }}
                                      >
                                        {day.transport}
                                      </span>
                                      <Badge variant="outline">Full Day</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-travel p-4 bg-primary/5 border-primary/20">
                                  <h4 className="font-black mb-2 text-primary text-sm"
                                    style={{
                                      fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                                      letterSpacing: '-0.015em',
                                      textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                      fontWeight: '900'
                                    }}
                                  >
                                    Day Summary
                                  </h4>
                                  <div className="space-y-2 text-xs sm:text-sm">
                                    <div className="flex justify-between">
                                      <span>Duration:</span>
                                      <span>{day.duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Activities:</span>
                                      <span>{day.attractions.length} planned</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </div>
              );
              })}
            </div>

            {/* Summary Card */}
            <Card className="card-luxury mt-6 sm:mt-8">
              <CardContent className="py-6 sm:py-8 px-4 sm:px-6">
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black mb-4 tracking-tighter"
                    style={{
                      fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                      color: '#991b1b',
                      letterSpacing: '-0.03em',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      fontWeight: '900'
                    }}
                  >
                    Ready to Book Your Adventure?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto px-2 sm:px-4 font-medium"
                    style={{
                      fontFamily: '"Crimson Text", "Georgia", serif',
                      lineHeight: '1.7',
                      color: '#475569',
                      fontStyle: 'italic',
                      letterSpacing: '0.01em'
                    }}
                  >
                    Your detailed itinerary is ready. Proceed to finalize your
                    booking or make any last-minute customizations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                    <Button
                      className="btn-hero px-6 sm:px-8 w-full sm:w-auto"
                      onClick={() => navigate("/summary")}
                    >
                      Proceed to Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="px-6 sm:px-8 w-full sm:w-auto"
                      onClick={() => navigate("/ai-generate")}
                    >
                      Back to Overview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customize Panel */}
        <CustomizePanel
          isOpen={showCustomize}
          onClose={() => setShowCustomize(false)}
          selectedDay={selectedDay}
          onUpdate={handleUpdateDay}
        />
      </div>
    </div>
  );
}