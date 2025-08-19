// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ProgressBar } from "@/components/ProgressBar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import uaeSkyline from "../components/7655625.jpg";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Clock,
//   MapPin,
//   Star,
//   Plane,
//   Hotel,
//   ChevronDown,
//   ChevronUp,
//   Edit,
//   ArrowLeft,
//   ImageIcon,
//   Car,
// } from "lucide-react";
// import { CustomizePanel } from "@/components/CustomizePanel";

// export default function Details() {
//   const navigate = useNavigate();
//   const [expandedDays, setExpandedDays] = useState(["day-1"]);
//   const [showCustomize, setShowCustomize] = useState(false);
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [itinerary, setItinerary] = useState([]);
//   const [headerTitle, setHeaderTitle] = useState("Loading...");
//   const [headerSubtitle, setHeaderSubtitle] = useState("Getting your itinerary ready...");
  
//   // State for the main header image and image gallery
//   const [headerImage, setHeaderImage] = useState(
//     "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop&crop=center"
//   );
//   const [allImages, setAllImages] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     // Retrieve the entire selected package from localStorage
//     const savedPackage = localStorage.getItem("selectedPackage");
//     if (savedPackage) {
//       const parsedPackage = JSON.parse(savedPackage);
//       setItinerary(parsedPackage.itinerary);
//       setHeaderTitle(parsedPackage.title);
//       setHeaderSubtitle(parsedPackage.description);

//       // Collect all images from the itinerary to create a gallery
//       const collectedImages = parsedPackage.itinerary
//         .flatMap((day) => day.images)
//         .filter(Boolean); // Filter out any null or undefined images
//       setAllImages(collectedImages);

//       // Set the first image as the initial header image
//       if (collectedImages.length > 0) {
//         setHeaderImage(collectedImages[0]);
//       }

//     } else {
//       navigate("/ai-generate");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     // Set up an interval to slide through images every 5 seconds
//     if (allImages.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentImageIndex(prevIndex => (prevIndex + 1) % allImages.length);
//       }, 5000); // Change image every 5 seconds
      
//       return () => clearInterval(interval);
//     }
//   }, [allImages]);

//   // Update the main header image whenever the index changes
//   useEffect(() => {
//     if (allImages.length > 0) {
//       setHeaderImage(allImages[currentImageIndex]);
//     }
//   }, [currentImageIndex, allImages]);

//   const toggleDay = (dayId) => {
//     setExpandedDays((prev) =>
//       prev.includes(dayId) ? prev.filter((id) => id !== dayId) : [...prev, dayId]
//     );
//   };

//   const handleCustomize = (day) => {
//     setSelectedDay(day);
//     setShowCustomize(true);
//   };

//   const handleUpdateDay = (updatedDay) => {
//     setItinerary((prev) =>
//       prev.map((day) => (day.id === updatedDay.id ? updatedDay : day))
//     );
//   };

//   if (itinerary.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <p>Loading your detailed itinerary...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//       <div
//           className="min-h-screen bg-cover bg-center bg-fixed relative"
//           style={{ backgroundImage: `url(${uaeSkyline})` }}
//         >

          
//     <div className="min-h-screen ">
//       <ProgressBar currentStep={3} />

//       <div className="container mx-auto px-6 pb-12">
//         <div className="max-w-6xl mx-auto">
//           {/* Header */}
//    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between mb-8 gap-4 sm:gap-0 text-center sm:text-left">
//   <Button
//     variant="outline"
//     onClick={() => navigate(-1)}
//     className="flex items-center gap-2 order-1 sm:order-none"
//   >
//     <ArrowLeft className="w-4 h-4" />
//     Back to Packages
//   </Button>

//   <div className="order-3 sm:order-none">
//     <h1 className="text-2xl sm:text-4xl font-playfair font-bold mb-1 sm:mb-2">
//       {headerTitle}
//     </h1>
//     <p className="text-sm sm:text-base text-muted-foreground">{headerSubtitle}</p>
//   </div>

//   <div className="w-32 hidden sm:block" /> {/* Spacer for center alignment on large screens */}
// </div>

//           {/* Main Image Gallery */}
//           <Card className="card-luxury mb-8 overflow-hidden">
//             <div className="relative h-80">
//               <img
//                 src={headerImage}
//                 alt="Featured destination"
//                 className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
//               />
//               <div className="absolute inset-0 bg-black/30 flex items-end">
//                 <div className="p-6 text-white">
//                   <h2 className="text-2xl font-playfair font-bold mb-2">
//                     {headerTitle}
//                   </h2>
//                   <p className="text-white/90">{headerSubtitle}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Image Grid */}
//             <div className="p-6">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {itinerary
//                   .slice(0, 3)
//                   .flatMap((day) =>
//                     day.images?.slice(1).map((image, index) => (
//                       <div
//                         key={`${day.id}-${index}`}
//                         className="relative h-24 rounded-lg overflow-hidden"
//                       >
//                         <img
//                           src={image}
//                           alt={`${day.title} - Image ${index + 1}`}
//                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                     ))
//                   )}
//                 <div className="relative h-24 rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center border border-border hover:border-primary/50 transition-colors cursor-pointer">
//                   <div className="text-center">
//                     <ImageIcon className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
//                     <span className="text-xs text-muted-foreground">
//                       +{itinerary.length * 3 - 3} more
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Day-by-Day Breakdown */}
// <div className="space-y-6">
//   {itinerary.map((day) => (
//     <Card key={day.id} className="card-luxury overflow-hidden">
//       <Collapsible
//         open={expandedDays.includes(day.id)}
//         onOpenChange={() => toggleDay(day.id)}
//       >
//         <CollapsibleTrigger className="w-full">
//           <CardHeader className="hover:bg-secondary/30 transition-colors">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               {/* Left Section */}
//               <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//                 <div className="w-28 h-12 bg-primary rounded-full flex items-center justify-center">
//                   <span className="text-primary-foreground font-bold">
//                    Day {day.day}
//                   </span>
//                 </div>
//                 <div className="text-center sm:text-left">
//                   <CardTitle className="text-lg sm:text-xl font-playfair">
//                     {day.title}
//                   </CardTitle>
//                   <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-muted-foreground mt-1 text-sm">
//                     <div className="flex items-center">
//                       <Clock className="w-4 h-4 mr-1" />
//                       {day.duration}
//                     </div>
//                     <div className="flex items-center">
//                       <MapPin className="w-4 h-4 mr-1" />
//                       {day.attractions.length} attractions
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Section */}
//               <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleCustomize(day);
//                   }}
//                 >
//                   <Edit className="w-4 h-4 mr-1" />
//                   Customize
//                 </Button>
//                 {expandedDays.includes(day.id) ? (
//                   <ChevronUp className="w-5 h-5" />
//                 ) : (
//                   <ChevronDown className="w-5 h-5" />
//                 )}
//               </div>
//             </div>
//           </CardHeader>
//         </CollapsibleTrigger>

//         <CollapsibleContent>
//           <CardContent className="pt-0">
//             <div className="border-t border-border pt-6">
//               {/* Day Description */}
//               <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
//                 {day.description}
//               </p>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Attractions */}
//                 <div>
//                   <h3 className="text-base sm:text-lg font-semibold mb-4 text-accent flex items-center">
//                     <MapPin className="w-5 h-5 mr-2" />
//                     Attractions & Activities
//                   </h3>
//                   <div className="space-y-4">
//                     {day.attractions.map((attraction, i) => (
//                       <div key={i} className="card-travel p-4">
//                         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
//                           <h4 className="font-semibold">{attraction.name}</h4>
//                           <Badge variant="outline" className="text-xs">
//                             {attraction.duration}
//                           </Badge>
//                         </div>
//                         <p className="text-xs sm:text-sm text-muted-foreground mb-2">
//                           {attraction.description}
//                         </p>
//                         <div className="flex flex-wrap justify-between items-center gap-2">
//                           <Badge variant="secondary" className="text-xs">
//                             {attraction.type}
//                           </Badge>
//                           {attraction.price > 0 && (
//                             <span className="text-xs sm:text-sm font-medium text-primary">
//                               ${attraction.price}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Logistics */}
//                 <div className="space-y-6">
//                   <div>
//                     <h4 className="text-base sm:text-lg font-semibold mb-3 text-accent flex items-center">
//                       <Hotel className="w-4 h-4 mr-2" />
//                       Accommodation
//                     </h4>
//                     <div className="card-travel p-4">
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                         <div className="flex items-center">
//                           <Star className="w-4 h-4 text-primary mr-2" />
//                           <span className="font-medium">{day.hotel}</span>
//                         </div>
//                         <Badge variant="outline">Premium</Badge>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-base sm:text-lg font-semibold mb-3 text-accent flex items-center">
//                       <Car className="w-4 h-4 mr-2" />
//                       Transportation
//                     </h4>
//                     <div className="card-travel p-4">
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//                         <span className="font-medium">{day.transport}</span>
//                         <Badge variant="outline">Full Day</Badge>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="card-travel p-4 bg-primary/5 border-primary/20">
//                     <h4 className="font-semibold mb-2 text-primary">
//                       Day Summary
//                     </h4>
//                     <div className="space-y-2 text-xs sm:text-sm">
//                       <div className="flex justify-between">
//                         <span>Duration:</span>
//                         <span>{day.duration}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Activities:</span>
//                         <span>{day.attractions.length} planned</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </CollapsibleContent>
//       </Collapsible>
//     </Card>
//   ))}
// </div>


//           {/* Summary Card */}
//      <Card className="card-luxury mt-8">
//   <CardContent className="py-8">
//     <div className="text-center">
//       <h3 className="text-xl sm:text-2xl font-playfair font-bold mb-4">
//         Ready to Book Your Adventure?
//       </h3>
//       <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto px-4">
//         Your detailed itinerary is ready. Proceed to finalize your booking or
//         make any last-minute customizations.
//       </p>

//       <div className="flex flex-col sm:flex-row gap-4 justify-center">
//         <Button
//           className="btn-hero px-6 sm:px-8"
//           onClick={() => navigate("/summary")}
//         >
//           Proceed to Booking
//         </Button>

//         <Button
//           variant="outline"
//           className="px-6 sm:px-8"
//           onClick={() => navigate("/ai-generate")}
//         >
//           Back to Overview
//         </Button>
//       </div>
//     </div>
//   </CardContent>
// </Card>

//         </div>
//       </div>

//       {/* Customize Panel */}
//       <CustomizePanel
//         isOpen={showCustomize}
//         onClose={() => setShowCustomize(false)}
//         selectedDay={selectedDay}
//         onUpdate={handleUpdateDay}
//       />
//     </div>
//     </div>
//   );
// }

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

        <div className="container mx-auto px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between mb-8 gap-4 sm:gap-0 text-center sm:text-left">
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 order-1 sm:order-none"
              >
                <ArrowLeft className="w-4 h-4" />
                Back 
              </Button>
              <div className="order-3 sm:order-none">
                <h1 className=" sm:text-4xl  mb-1 sm:mb-2"
               
                  style={{ fontFamily: '"Boldonse", cursive', fontSize: '18px', color:'black' }}
                >
                  {headerTitle}
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {headerSubtitle}
                </p>
              </div>
              <div className="w-32 hidden sm:block" />
            </div>

            {/* Main Image Gallery */}
            <Card className="card-luxury mb-8 overflow-hidden">
              <div className="relative h-80">
                <img
                  src={headerImage}
                  alt="Featured destination"
                  className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl font-playfair font-bold mb-2"
                     style={{ fontFamily: '"Boldonse", cursive', fontSize: '26px', color:'white' }}
                    >
                      {headerTitle}
                    </h2>
                    <p className="text-white/90">{headerSubtitle}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {itinerary
                    .flatMap((day) => day.images)
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="relative h-24 rounded-lg overflow-hidden cursor-pointer"
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
           <div className="space-y-6">
  {itinerary.map((day, index) => (
    <div key={day.id} className="flex relative">
      {/* Left Side: Day Label with Continuous Vertical Line */}
      <div className="relative flex-shrink-0">
        {/* Single continuous line */}
        <div
          className={`absolute left-1/2 -ml-0.5 top-0 w-1 bg-red-400 z-0 transition-all duration-300 ease-in-out`}
          style={{
            height: expandedDay === day.id ? "100%" : "50px", // Adjust collapsed height
          }}
        />

        {/* Circle with day number */}
        <div className="relative z-10 w-24 h-24 flex-shrink-0 flex items-center justify-center">
          <div className="rounded-full w-12 h-12 bg-red-400 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-lg"
           style={{ fontFamily: '"Boldonse", cursive' }}
          >
            {index + 1}
          </div>
          {/* <div className="absolute top-16 text-center text-sm font-semibold mt-2">
            Day {day.day}
          </div> */}
        </div>
      </div>

                  {/* Collapsible Itinerary Card */}
                  <Card className="flex-grow card-luxury overflow-hidden">
                    <Collapsible
                      open={expandedDay === day.id}
                      onOpenChange={() => toggleDay(day.id)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="hover:bg-secondary/30 transition-colors cursor-pointer">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-center sm:text-left">
                              <CardTitle className=" sm:text-xl font-playfair"
                               style={{ fontFamily: '"Boldonse", cursive', fontSize: '13px', color:'#B01216' }}
                              >
                                {day.title}
                              </CardTitle>
                              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-muted-foreground mt-1 text-sm"
                               style={{ fontFamily: "Bahianita",fontSize: '15px' }}
                              >
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {day.duration}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {day.attractions.length} attractions
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2"
                            
                            >
                              <Button
                                size="sm"
                                // variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCustomize(day);

                                }}
                                 style={{ fontFamily: '"Boldonse", cursive',  fontSize: '10px' }}
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Customize
                              </Button>
                              {expandedDay === day.id ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="border-t border-border pt-6">
                            <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base"
                            style={{ fontFamily: '"Delius", cursive',fontSize: '16px', color:'#444' }}
                            >
                              {day.description}
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div>
                                <h3 className="  mb-4 text-accent flex items-center"
                                style={{ fontFamily: '"Boldonse", cursive', fontSize: '12px', color:'#B01216' }}
                                
                                >
                                  <MapPin className="w-5 h-5 mr-2" />
                                  Attractions & Activities
                                </h3>
                                <div className="space-y-4">
                                  {day.attractions.map((attraction, i) => (
                                    <div key={i} className="card-travel p-4">
                                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                                        <h4 
                                        style={{ fontFamily: '"Boldonse", cursive', fontSize: '12px' }}
                                        >
                                          {attraction.name}
                                        </h4>
                                        <Badge variant="outline" className="text-xs">
                                          {attraction.duration}
                                        </Badge>
                                      </div>
                                      <p className="text-xs sm:text-sm text-muted-foreground mb-2"
                                      style={{ fontFamily: '"Delius", cursive',fontSize: '16px', color:'#444' }}
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
                                  <h4 className="  mb-3 text-accent flex items-center"
                                  
                                  style={{ fontFamily: '"Boldonse", cursive', fontSize: '12px', color:'#B01216' }}
                                  >
                                    <Hotel className="w-4 h-4 mr-2" />
                                    Accommodation
                                  </h4>
                                  <div className="card-travel p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                      <div className="flex items-center">
                                        <Star className="w-4 h-4 text-primary mr-2" />
                                        <span className="font-medium"
                                        style={{ fontFamily: '"Delius", cursive',fontSize: '18px', color:'#444' }}
                                        >
                                          {day.hotel}
                                        </span>
                                      </div>
                                      <Badge variant="outline">Premium</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="  mb-3 text-accent flex items-center"
                                  style={{ fontFamily: '"Boldonse", cursive', fontSize: '12px', color:'#B01216' }}
                                  
                                  >
                                    <Car className="w-4 h-4 mr-2" />
                                    Transportation
                                  </h4>
                                  <div className="card-travel p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                      <span className="font-medium"
                                      style={{ fontFamily: '"Delius", cursive',fontSize: '18px', color:'#444' }}
                                      >
                                        {day.transport}
                                      </span>
                                      <Badge variant="outline">Full Day</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="card-travel p-4 bg-primary/5 border-primary/20">
                                  <h4 className=" mb-2 text-primary"
                                  style={{ fontFamily: '"Boldonse", cursive', fontSize: '12px'}}
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
              ))}
            </div>

            {/* Summary Card */}
            <Card className="card-luxury mt-8">
              <CardContent className="py-8">
                <div className="text-center">
                  <h3 className=" font-bold mb-4"
                  style={{ fontFamily: '"Boldonse", cursive', fontSize: '12px', color:'#B01216' }}
                  
                  >
                    Ready to Book Your Adventure?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto px-4">
                    Your detailed itinerary is ready. Proceed to finalize your
                    booking or make any last-minute customizations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      className="btn-hero px-6 sm:px-8"
                      onClick={() => navigate("/summary")}
                      
                    >
                      Proceed to Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="px-6 sm:px-8"
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