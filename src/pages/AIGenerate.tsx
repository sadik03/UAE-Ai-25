import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Plane, Car } from "lucide-react";
import { generateContent } from "../services/geminiService";
import { attractionsData, hotelData, transportData } from "../data/attractions";
import uaeSkyline from "../components/7655625.jpg"; // Import the background image
import Lottie from "react-lottie"; // Assuming you have 'react-lottie' installed
import animationData from "../assets/loading.json"; // Import your Lottie animation data

import Ai from "./6221352.jpg";

export default function AIGenerate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [packages, setPackages] = useState([]); // Changed to hold an array of packages

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

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
        - Create 3 different and distinct itinerary packages based on the user preferences.
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
        setIsLoading(false);
      });
    }
  }, []);

  // Function to handle viewing a specific package's details
  const handleViewDetails = (selectedPackage) => {
    // Store the entire selected package object in local storage
    localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage));
    navigate("/details");
  };

  if (isLoading) {
    return (
 <div
      className="min-h-screen flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${Ai})` }} // same image you use in main UI
    >
      <div className=" max-w-md w-full">
        {/* Lottie Animation */}
        <div className="flex justify-center items-center mb-6">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>

        {/* Text Below Animation */}
        <h3 className="text-xl font-semibold mb-2 "
       style={{ fontFamily: '"Qwigley", cursive',fontSize: '36px', color:'#B01216' }}
        >
          Creating Your Perfect Itinerary
        </h3>
       
        <p className="text-muted-foreground "
        style={{ fontFamily: '"Delius", cursive' }}
        >
         
          Our AI is analyzing your preferences...
        </p>
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
        <div className="container mx-auto px-6 pb-12">
          <div className="text-center mb-12">
            <h1 className="font-bold"
            style={{ fontFamily: '"Qwigley", cursive',fontSize: '46px', color:'#B01216' }}
            >Choose Your AI-Generated Package</h1>
            <p className="font-bold"
               style={{ fontFamily: '"Delius", cursive',fontSize: '22px', color:'#444' }}
            >
              Based on your preferences, here are three different journey options.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, index) => (
              <Card key={pkg.id || index} className="overflow-hidden">
                <img
                  src={pkg.itinerary[0]?.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex justify-between items-center ">
                    <h3 className="font-bold"
                     style={{ fontFamily: '"Delius", cursive',fontSize: '20px', color:'#444' }}
                    >{pkg.title}</h3>
                    <Badge>Package {index + 1}</Badge>
                  </div>
                  <p className="text-muted-foreground mt-2 mb-4 text-sm">
                    {pkg.description}
                  </p>

                  {/* Displaying key details from the first day of the itinerary */}
                  {pkg.itinerary && pkg.itinerary.length > 0 && (
                    <>
                      <div className="flex items-center text-sm mt-2">
                        <Clock className="w-4 h-4 mr-2" />{" "}
                        {pkg.itinerary[0]?.duration}
                      </div>
                      <div className="flex items-center text-sm mt-2">
                        <Star className="w-4 h-4 mr-2" />{" "}
                        {pkg.itinerary[0]?.hotel}
                      </div>
                      <div className="flex items-center text-sm mt-2">
                        <Car className="w-4 h-4 mr-2" />{" "}
                        {pkg.itinerary[0]?.transport}
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 mt-6">
                    <Button
                      className="flex-1"
                      onClick={() => handleViewDetails(pkg)}
                    >
                      View Details
                    </Button>
                    {/* <Button variant="outline" className="flex-1">
                      Modify Package
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}