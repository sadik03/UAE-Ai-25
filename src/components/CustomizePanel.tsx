import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Star, DollarSign, Search } from "lucide-react";
import { attractionsData, hotelData, transportData } from "@/data/attractions";

interface CustomizePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: any;
  onUpdate: (updatedDay: any) => void;
}

export function CustomizePanel({ isOpen, onClose, selectedDay, onUpdate }: CustomizePanelProps) {
  const [selectedHotel, setSelectedHotel] = useState(selectedDay?.hotel || (hotelData.length > 0 ? hotelData[0].name : ""));
  const [selectedTransport, setSelectedTransport] = useState(selectedDay?.transport || (transportData.length > 0 ? transportData[0].label : ""));
  const [selectedAttractions, setSelectedAttractions] = useState(selectedDay?.attractions || []);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttractions = attractionsData.filter(attraction =>
    attraction.Attraction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttractionToggle = (attraction: any) => {
    const isSelected = selectedAttractions.some((a: any) => a.name === attraction.Attraction);
    
    if (isSelected) {
      setSelectedAttractions(selectedAttractions.filter((a: any) => a.name !== attraction.Attraction));
    } else {
      setSelectedAttractions([...selectedAttractions, {
        name: attraction.Attraction,
        price: attraction.Price,
        emirates: attraction.Emirates,
        duration: "2 hours",
        type: "Attraction"
      }]);
    }
  };

  const calculateTotalCost = () => {
    const attractionsCost = selectedAttractions.reduce((sum: number, attr: any) => sum + (attr.price || 0), 0);
    const hotelCost = hotelData.find(h => h.name === selectedHotel)?.costPerNight || 0;
    const transportCost = transportData.find(t => t.label === selectedTransport)?.costPerDay || 0;
    return attractionsCost + hotelCost + transportCost;
  };

  const handleSave = () => {
    const updatedDay = {
      ...selectedDay,
      hotel: selectedHotel,
      transport: selectedTransport,
      attractions: selectedAttractions
    };
    onUpdate(updatedDay);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="card-luxury w-full max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-luxury border-2 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/10 p-3 sm:p-6">
          <CardTitle className="text-lg sm:text-2xl lg:text-3xl font-playfair gradient-text">
            <span className="hidden sm:inline">✨ </span>Customize Day {selectedDay?.day}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-primary/10 transition-all duration-300 shrink-0">
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
          {/* Attractions */}
          <div className="bg-gradient-to-br from-card to-secondary/20 p-3 sm:p-6 rounded-xl border border-primary/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-accent flex items-center gap-2">
              <span className="hidden sm:inline">🎯 </span>Available Attractions
            </h3>
            <div className="relative mb-4 sm:mb-6">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <Input
                placeholder="Search attractions..."
                className="pl-10 sm:pl-12 input-travel h-10 sm:h-12 text-sm sm:text-base border-2 border-primary/20 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-gradient-to-r from-background to-secondary/30"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-h-60 sm:max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {filteredAttractions.map((attraction, index) => {
                const isSelected = selectedAttractions.some((a: any) => a.name === attraction.Attraction);
                return (
                  <div
                    key={index}
                    className={`group relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-float ${
                      isSelected 
                        ? 'border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-luxury ring-2 ring-primary/30' 
                        : 'border-border hover:border-primary/60 bg-gradient-to-br from-card to-secondary/10'
                    }`}
                    onClick={() => handleAttractionToggle(attraction)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3 min-w-0">
                        {attraction.ImageUrl && (
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden shrink-0 ring-1 ring-primary/30">
                            <img
                              src={attraction.ImageUrl}
                              alt={attraction.Attraction}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-xs sm:text-sm mb-0.5 text-foreground group-hover:text-primary transition-colors truncate">{attraction.Attraction}</h4>
                          <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                            <span className="hidden sm:inline">📍 </span>{attraction.Emirates}
                          </p>
                        </div>
                      </div>
                      <Badge variant={isSelected ? "default" : "outline"} className={`text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'border-primary/30'
                      }`}>
                        {attraction.Price === 0 ? 'FREE' : `$${attraction.Price}`}
                      </Badge>
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-3 sm:my-6" />

          {/* Selected Attractions */}
          {selectedAttractions.length > 0 && (
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-3 sm:p-6 rounded-xl border border-primary/20">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-accent flex items-center gap-2">
                <span className="hidden sm:inline">⭐ </span>Selected ({selectedAttractions.length})
              </h3>
              <div className="space-y-2">
                {selectedAttractions.map((attr: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-secondary/30 rounded-lg">
                    <span className="text-xs sm:text-sm font-medium flex-1 truncate pr-2">{attr.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">${attr.price}</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedAttractions(selectedAttractions.filter((_: any, i: number) => i !== index))}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-3 sm:my-6" />

          {/* Hotel Selection */}
          <div className="bg-gradient-to-br from-card to-secondary/20 p-3 sm:p-6 rounded-xl border border-primary/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-accent flex items-center gap-2">
              <span className="hidden sm:inline">🏨 </span>Hotel
            </h3>
            <Select value={selectedHotel} onValueChange={setSelectedHotel}>
              <SelectTrigger className="w-full input-travel h-10 sm:h-14 text-sm sm:text-base border-2 border-primary/20 focus:border-primary bg-gradient-to-r from-background to-secondary/30">
                <SelectValue placeholder="Choose hotel" />
              </SelectTrigger>
              <SelectContent className="max-h-60 sm:max-h-80 w-[calc(100vw-2rem)] sm:w-auto">
                {hotelData.map((hotel) => (
                  <SelectItem key={hotel.id} value={hotel.name}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1 sm:gap-2">
                      <span className="truncate text-sm sm:text-base">{hotel.name}</span>
                      <div className="flex items-center gap-2 sm:ml-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="hidden sm:flex">
                          {[...Array(hotel.stars)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                          ))}
                        </div>
                        <span>${hotel.costPerNight}/night</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-3 sm:my-6" />

          {/* Transport Selection */}
          <div className="bg-gradient-to-br from-card to-secondary/20 p-3 sm:p-6 rounded-xl border border-primary/10">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-accent flex items-center gap-2">
              <span className="hidden sm:inline">🚗 </span>Transport
            </h3>
            <Select value={selectedTransport} onValueChange={setSelectedTransport}>
              <SelectTrigger className="w-full input-travel h-10 sm:h-14 text-sm sm:text-base border-2 border-primary/20 focus:border-primary bg-gradient-to-r from-background to-secondary/30">
                <SelectValue placeholder="Choose transport" />
              </SelectTrigger>
              <SelectContent className="max-h-60 sm:max-h-80 w-[calc(100vw-2rem)] sm:w-auto">
                {transportData.map((transport) => (
                  <SelectItem key={transport.id} value={transport.label}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1 sm:gap-2">
                      <span className="truncate text-sm sm:text-base">{transport.label}</span>
                      <span className="text-xs sm:text-sm ml-0 sm:ml-4 text-muted-foreground">${transport.costPerDay}/day</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-3 sm:my-6" />

          {/* Total Cost */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-3 sm:p-6 rounded-xl border-2 border-primary/20 shadow-luxury">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
              <span className="text-lg sm:text-xl font-bold text-accent flex items-center gap-2">
                <span className="hidden sm:inline">💰 </span>Total:
              </span>
              <div className="flex items-center text-primary text-xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                <DollarSign className="w-5 h-5 sm:w-7 sm:h-7 mr-1 sm:mr-2 text-primary" />
                {calculateTotalCost().toLocaleString()}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button onClick={handleSave} className="btn-hero flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold shadow-luxury hover:shadow-float transition-all duration-300">
                <span className="hidden sm:inline">✨ </span>Save Changes
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold border-2 border-primary/30 hover:bg-primary/10 transition-all duration-300">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}