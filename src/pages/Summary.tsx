import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Calendar, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import uaeSkyline from "../components/7655625.jpg";
export default function Summary() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedFormData = localStorage.getItem("travelFormData");
    const savedPackage = localStorage.getItem("selectedPackage");

    if (savedFormData && savedPackage) {
      const data = JSON.parse(savedFormData);
      const pkg = JSON.parse(savedPackage);
      setFormData(data);
      setSelectedPackage(pkg);
      calculatePrices(data, pkg);
    } else {
      // Redirect if data is missing
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate]);

  const calculatePrices = (data, pkg) => {
    const { adults, kids, infants, tripDuration } = data;
    const totalTravelers = adults + kids + infants;

    let totalAttractionCost = 0;
    pkg.itinerary.forEach(day => {
      day.attractions.forEach(attraction => {
        totalAttractionCost += attraction.price;
      });
    });

    // Assuming average costs for hotels and transport
    const averageHotelPricePerNight = 150; // per person per night
    const averageTransportPricePerDay = 50; // per person per day

    // Calculate total base costs
    const totalHotelCost = averageHotelPricePerNight * tripDuration;
    const totalTransportCost = averageTransportPricePerDay * tripDuration;

    // Calculate a price range based on the number of travelers
    // Min price assumes a base rate for one person
    // Max price assumes the full group
    const minTotalPrice = (totalAttractionCost + totalHotelCost + totalTransportCost);
    const maxTotalPrice = minTotalPrice * totalTravelers;

    setPriceRange({ min: minTotalPrice, max: maxTotalPrice });
  };

  const DISCOUNT_RATE = 0.10; // 10% discount

  if (isLoading || !formData || !selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Preparing your summary...</p>
        </div>
      </div>
    );
  }

  const discountedMinPrice = (priceRange.min * (1 - DISCOUNT_RATE)).toFixed(2);
  const discountedMaxPrice = (priceRange.max * (1 - DISCOUNT_RATE)).toFixed(2);

  return (
       <div
          className="min-h-screen bg-cover bg-center bg-fixed relative"
          style={{ backgroundImage: `url(${uaeSkyline})` }}
        >
    <div className="min-h-screen">
      <ProgressBar currentStep={4} />
      <div className="container mx-auto px-6 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Your Trip Summary</h1>
          <p className="text-lg text-muted-foreground">
            Review your booking details before you finalize your trip.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* User Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <User className="w-6 h-6 mr-3 text-primary" />
                Your Booking Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="font-medium">Full Name:</span>
                  <span className="ml-2">{formData.fullName}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">{formData.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{formData.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Departure Country:</span>
                  <span className="ml-2">{formData.departureCountry}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Budget:</span>
                  <span className="ml-2">{formData.budget}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Destination:</span>
                  <span className="ml-2">{formData.emirates}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Duration:</span>
                  <span className="ml-2">{formData.tripDuration} days</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">Travelers:</span>
                  <span className="ml-2">
                    {formData.adults} Adults, {formData.kids} Kids, {formData.infants} Infants
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Trip Month:</span>
                  <span className="ml-2">{formData.journeyMonth}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Overview */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <img src={selectedPackage.itinerary[0]?.image} alt="Package" className="w-6 h-6 mr-3 rounded-full object-cover" />
                Package Overview
              </h2>
              <h3 className="text-xl font-semibold mb-2">{selectedPackage.title}</h3>
              <p className="text-muted-foreground">{selectedPackage.description}</p>
            </CardContent>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Tag className="w-6 h-6 mr-3 text-primary" />
                Price Breakdown
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Estimated Total Price:</span>
                  <span className="text-2xl font-bold">
                    ${priceRange.min.toFixed(2)} - ${priceRange.max.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg text-primary">
                  <span className="font-semibold">Discount Applied:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">10% OFF</Badge>
                </div>
                <div className="flex justify-between items-center text-3xl font-bold text-primary">
                  <span>Your Price:</span>
                  <span>
                    ${discountedMinPrice} - ${discountedMaxPrice}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  *Prices are estimates based on average costs for hotels and transport, and the total cost of all attractions for your group size.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button className="btn-hero px-8 text-lg py-6">
              Finalize Booking
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)} className="text-lg py-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}