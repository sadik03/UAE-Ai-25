import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Star, DollarSign } from "lucide-react";
import { attractionsData, hotelData, transportData } from "@/data/attractions";

interface CustomizePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDay: any;
  onUpdate: (updatedDay: any) => void;
}

export function CustomizePanel({ isOpen, onClose, selectedDay, onUpdate }: CustomizePanelProps) {
  const [selectedHotel, setSelectedHotel] = useState(selectedDay?.hotel || "");
  const [selectedTransport, setSelectedTransport] = useState(selectedDay?.transport || "");
  const [selectedAttractions, setSelectedAttractions] = useState(selectedDay?.attractions || []);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="card-luxury w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-playfair">
            Customize Day {selectedDay?.day}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Attractions */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Available Attractions</h3>
            <div className="grid md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {attractionsData.map((attraction, index) => {
                const isSelected = selectedAttractions.some((a: any) => a.name === attraction.Attraction);
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleAttractionToggle(attraction)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{attraction.Attraction}</h4>
                        <p className="text-xs text-muted-foreground">{attraction.Emirates}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        ${attraction.Price}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Attractions */}
          {selectedAttractions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-accent">Selected Attractions</h3>
              <div className="space-y-2">
                {selectedAttractions.map((attr: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                    <span className="text-sm font-medium">{attr.name}</span>
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

          {/* Hotel Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Hotel</h3>
            <Select value={selectedHotel} onValueChange={setSelectedHotel}>
              <SelectTrigger className="input-travel">
                <SelectValue placeholder="Select Hotel" />
              </SelectTrigger>
              <SelectContent>
                {hotelData.map((hotel) => (
                  <SelectItem key={hotel.id} value={hotel.name}>
                    <div className="flex items-center justify-between w-full">
                      <span>{hotel.name}</span>
                      <div className="flex items-center gap-2 ml-4">
                        <div className="flex">
                          {[...Array(hotel.stars)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="text-xs">${hotel.costPerNight}/night</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transport Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent">Transport</h3>
            <Select value={selectedTransport} onValueChange={setSelectedTransport}>
              <SelectTrigger className="input-travel">
                <SelectValue placeholder="Select Transport" />
              </SelectTrigger>
              <SelectContent>
                {transportData.map((transport) => (
                  <SelectItem key={transport.id} value={transport.label}>
                    <div className="flex items-center justify-between w-full">
                      <span>{transport.label}</span>
                      <span className="text-xs ml-4">${transport.costPerDay}/day</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Total Cost */}
          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total Cost:</span>
              <div className="flex items-center text-primary text-xl font-bold">
                <DollarSign className="w-5 h-5 mr-1" />
                {calculateTotalCost().toLocaleString()}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleSave} className="btn-hero flex-1">
                Save Changes
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}