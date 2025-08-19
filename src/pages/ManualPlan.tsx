import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "@/components/ProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, MapPin, Star, Users, Calendar, Grip } from "lucide-react";
import { attractionsData, hotelData, transportData } from "@/data/attractions";

// Transform attraction data for manual planning
const availableAttractions = attractionsData.map((attr, index) => ({
  id: `${attr.Emirates.toLowerCase()}-${attr.Attraction.toLowerCase().replace(/\s+/g, '-')}`,
  name: attr.Attraction,
  emirates: attr.Emirates,
  duration: "2 hours",
  price: attr.Price,
  type: "Attraction"
}));

export default function ManualPlan() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const savedData = localStorage.getItem('travelFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === "available" && destination.droppableId === "selected") {
      const itemId = result.draggableId;
      const attraction = availableAttractions.find(a => a.id === itemId);
      if (attraction && !selectedItems.find(item => item.id === itemId)) {
        setSelectedItems(prev => [...prev, { ...attraction, type: 'attraction' }]);
      }
    } else if (source.droppableId === "selected" && destination.droppableId === "selected") {
      const items = Array.from(selectedItems);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setSelectedItems(items);
    }
  };

  const removeItem = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addHotel = (hotel: any) => {
    const existingHotel = selectedItems.find(item => item.type === 'hotel');
    if (existingHotel) {
      setSelectedItems(prev => prev.map(item => 
        item.type === 'hotel' ? { ...hotel, type: 'hotel' } : item
      ));
    } else {
      setSelectedItems(prev => [...prev, { ...hotel, type: 'hotel' }]);
    }
  };

  const addTransport = (transport: any) => {
    const existingTransport = selectedItems.find(item => item.type === 'transport');
    if (existingTransport) {
      setSelectedItems(prev => prev.map(item => 
        item.type === 'transport' ? { ...transport, type: 'transport' } : item
      ));
    } else {
      setSelectedItems(prev => [...prev, { ...transport, type: 'transport' }]);
    }
  };

  useEffect(() => {
    // Calculate total cost
    let total = 0;
    selectedItems.forEach(item => {
      if (item.type === 'attraction') {
        total += item.price || 0;
      } else if (item.type === 'hotel') {
        total += (item.costPerNight || 0) * 5; // Assuming 5 nights
      } else if (item.type === 'transport') {
        total += (item.costPerDay || 0) * 5; // Assuming 5 days
      }
    });
    setTotalCost(total);
  }, [selectedItems]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <ProgressBar currentStep={2} />
      
      <div className="container mx-auto px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-playfair font-bold mb-4">
              Create Your Custom Itinerary
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Drag and drop to build your perfect UAE experience
            </p>
            
            {/* Trip Summary */}
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                {formData?.adults} Adults {formData?.kids > 0 && `+ ${formData.kids} Kids`}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                {formData?.journeyMonth}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                {formData?.emirates}
              </Badge>
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Available Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Attractions */}
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-primary" />
                      Available Attractions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Droppable droppableId="available" isDropDisabled>
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="grid md:grid-cols-2 gap-4">
                          {availableAttractions.map((attraction, index) => (
                            <Draggable key={attraction.id} draggableId={attraction.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`card-travel p-4 cursor-grab active:cursor-grabbing ${
                                    snapshot.isDragging ? 'rotate-3 scale-105' : ''
                                  }`}
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold">{attraction.name}</h4>
                                    <Grip className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                                    <span>{attraction.duration}</span>
                                    <Badge variant="outline">${attraction.price}</Badge>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>

                {/* Hotels */}
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-primary" />
                      Hotels
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {hotelData.map((hotel) => (
                        <div key={hotel.id} className="card-travel p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{hotel.name}</h4>
                            <div className="flex">
                              {[...Array(hotel.stars)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">${hotel.costPerNight}/night</span>
                            <Button size="sm" onClick={() => addHotel(hotel)}>
                              Select
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Transport */}
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle>Transportation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {transportData.map((transport) => (
                        <div key={transport.id} className="card-travel p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">{transport.label}</h4>
                              <span className="text-sm text-muted-foreground">${transport.costPerDay}/day</span>
                            </div>
                            <Button size="sm" onClick={() => addTransport(transport)}>
                              Select
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Selected Items */}
              <div className="space-y-6">
                <Card className="card-luxury sticky top-6">
                  <CardHeader>
                    <CardTitle>Your Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Droppable droppableId="selected">
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3 min-h-[200px]">
                          {selectedItems.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                              <Plus className="w-8 h-8 mx-auto mb-2" />
                              <p>Drag items here to build your itinerary</p>
                            </div>
                          ) : (
                            selectedItems.map((item, index) => (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-secondary/50 p-3 rounded-lg border border-border"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1">
                                        <h4 className="font-medium text-sm">
                                          {item.name || item.label}
                                        </h4>
                                        <div className="flex items-center justify-between mt-1">
                                          <Badge variant="outline" className="text-xs">
                                            {item.type}
                                          </Badge>
                                          <span className="text-xs text-muted-foreground">
                                            ${item.price || item.costPerNight || item.costPerDay}
                                          </span>
                                        </div>
                                      </div>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => removeItem(item.id)}
                                        className="text-destructive hover:text-destructive"
                                      >
                                        ×
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    {/* Total Cost */}
                    <div className="border-t border-border pt-4 mt-6">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total Estimated Cost:</span>
                        <span className="text-primary text-lg">${totalCost.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 mt-6">
                      <Button 
                        className="w-full btn-hero" 
                        disabled={selectedItems.length === 0}
                        onClick={() => navigate('/details')}
                      >
                        Proceed to Details
                      </Button>
                      <Button variant="outline" className="w-full">
                        Save Draft
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}