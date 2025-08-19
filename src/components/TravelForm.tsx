

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Settings } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { useState, useMemo, useEffect } from "react";

// Import your background image
import uaeSkyline from "./7655625.jpg";

// Country codes data with flags and dial codes
const countryCodes = [
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { code: "BD", name: "Bangladesh", dial: "+880", flag: "🇧🇩" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", dial: "+32", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", dial: "+41", flag: "🇨🇭" },
  { code: "AT", name: "Austria", dial: "+43", flag: "🇦🇹" },
  { code: "SE", name: "Sweden", dial: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dial: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dial: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dial: "+358", flag: "🇫🇮" },
  { code: "JP", name: "Japan", dial: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dial: "+82", flag: "🇰🇷" },
  { code: "CN", name: "China", dial: "+86", flag: "🇨🇳" },
  { code: "SG", name: "Singapore", dial: "+65", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", dial: "+60", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", dial: "+66", flag: "🇹🇭" },
  { code: "PH", name: "Philippines", dial: "+63", flag: "🇵🇭" },
  { code: "ID", name: "Indonesia", dial: "+62", flag: "🇮🇩" },
  { code: "VN", name: "Vietnam", dial: "+84", flag: "🇻🇳" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dial: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dial: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "🇨🇴" },
  { code: "PE", name: "Peru", dial: "+51", flag: "🇵🇪" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { code: "MA", name: "Morocco", dial: "+212", flag: "🇲🇦" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { code: "BH", name: "Bahrain", dial: "+973", flag: "🇧🇭" },
  { code: "OM", name: "Oman", dial: "+968", flag: "🇴🇲" },
  { code: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { code: "LB", name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { code: "TR", name: "Turkey", dial: "+90", flag: "🇹🇷" },
  { code: "IL", name: "Israel", dial: "+972", flag: "🇮🇱" },
  { code: "RU", name: "Russia", dial: "+7", flag: "🇷🇺" },
  { code: "UA", name: "Ukraine", dial: "+380", flag: "🇺🇦" },
  { code: "PL", name: "Poland", dial: "+48", flag: "🇵🇱" },
  { code: "CZ", name: "Czech Republic", dial: "+420", flag: "🇨🇿" },
  { code: "HU", name: "Hungary", dial: "+36", flag: "🇭🇺" },
  { code: "RO", name: "Romania", dial: "+40", flag: "🇷🇴" },
  { code: "GR", name: "Greece", dial: "+30", flag: "🇬🇷" },
  { code: "PT", name: "Portugal", dial: "+351", flag: "🇵🇹" },
  { code: "IE", name: "Ireland", dial: "+353", flag: "🇮🇪" },
  { code: "IS", name: "Iceland", dial: "+354", flag: "🇮🇸" },
  { code: "LU", name: "Luxembourg", dial: "+352", flag: "🇱🇺" },
  { code: "MT", name: "Malta", dial: "+356", flag: "🇲🇹" },
  { code: "CY", name: "Cyprus", dial: "+357", flag: "🇨🇾" },
  { code: "NZ", name: "New Zealand", dial: "+64", flag: "🇳🇿" }
].sort((a, b) => a.name.localeCompare(b.name));

// Emirates list with image thumbnails (external URLs)
const emiratesList = [
  { id: "dubai", name: "Dubai", thumbnail: "https://media.easemytrip.com/media/Deal/DL638542352450108717/SightSeeing/SightSeeing1Rr9LK.jpg" },
  { id: "abu-dhabi", name: "Abu Dhabi", thumbnail: "https://wahawonders.blob.core.windows.net/wahawonders/image/emirate/abudhabi.jpg" },
  { id: "sharjah", name: "Sharjah", thumbnail: "https://wahawonders.blob.core.windows.net/wahawonders/image/emirate/sharjah.jpg" },
  { id: "ajman", name: "Ajman", thumbnail: "https://wahawonders.blob.core.windows.net/wahawonders/image/emirate/ajman.webp" },
  { id: "fujairah", name: "Fujairah", thumbnail: "https://wahawonders.blob.core.windows.net/wahawonders/image/emirate/fujairah3.jpg" },
  { id: "ras-al-khaimah", name: "Ras Al Khaimah", thumbnail: "https://wahawonders.blob.core.windows.net/wahawonders/image/emirate/Ras%20Al%20Khaimah.jpg" },
  { id: "umm-al-quwain", name: "Umm Al Quwain", thumbnail: "https://wahawonders.blob.core.windows.net/wahawonders/image/emirate/Umm%20Al%20Quwain3.jpg" }
];

// ✅ Validation schema
const travelFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  countryCode: z.string().min(1, "Please select country code"),
  phone: z.string()
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits (0-9)"),
  email: z.string().email("Invalid email address"),
  tripDuration: z.string().min(1, "Trip duration is required"),
  journeyMonth: z.string().min(1, "Journey month is required"),
  departureCountry: z.string().min(1, "Departure country is required"),
  emirates: z.array(z.string()).min(1, "Please select at least one emirate"),
  budget: z.string().optional(),
  adults: z.coerce.number().min(1, "At least 1 adult required"),
  kids: z.coerce.number().min(0).optional(),
  infants: z.coerce.number().min(0).optional(),
});

type TravelFormData = z.infer<typeof travelFormSchema>;

export function TravelForm() {
  const navigate = useNavigate();
  const [selectedCountryCode, setSelectedCountryCode] = useState("+971"); // Default to UAE
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedEmirates, setSelectedEmirates] = useState<string[]>(["all"]); // Default to "All Emirates"
  const [isAllEmiratesSelected, setIsAllEmiratesSelected] = useState(true);
  const [isEmiratesDropdownOpen, setIsEmiratesDropdownOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TravelFormData>({
    resolver: zodResolver(travelFormSchema),
    defaultValues: {
      fullName: "",
      countryCode: "+971",
      phone: "",
      email: "",
      tripDuration: "",
      journeyMonth: "",
      departureCountry: "",
      emirates: ["all"],
      budget: "",
      adults: 1,
      kids: 0,
      infants: 0,
    },
  });

  // Filter countries based on search term
  const filteredCountries = useMemo(() => {
    if (!countrySearchTerm) return countryCodes;
    return countryCodes.filter(country => 
      country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
      country.dial.includes(countrySearchTerm) ||
      country.code.toLowerCase().includes(countrySearchTerm.toLowerCase())
    );
  }, [countrySearchTerm]);

  // Handle emirates selection logic
  const handleEmirateChange = (emirateId: string, checked: boolean) => {
    if (emirateId === "all") {
      if (checked) {
        setSelectedEmirates(["all"]);
        setIsAllEmiratesSelected(true);
        setValue("emirates", ["all"]);
      }
    } else {
      let newSelection: string[];
      if (checked) {
        // Add individual emirate and remove "all"
        newSelection = [...selectedEmirates.filter(id => id !== "all"), emirateId];
        setIsAllEmiratesSelected(false);
      } else {
        // Remove individual emirate
        newSelection = selectedEmirates.filter(id => id !== emirateId);
      }
      
      // If no emirates selected, fall back to "All Emirates"
      if (newSelection.length === 0) {
        newSelection = ["all"];
        setIsAllEmiratesSelected(true);
      } else {
        setIsAllEmiratesSelected(false);
      }
      
      setSelectedEmirates(newSelection);
      setValue("emirates", newSelection);
    }
  };

  // Update form value when emirates selection changes
  useEffect(() => {
    setValue("emirates", selectedEmirates);
  }, [selectedEmirates, setValue]);

  // Get display text for emirates dropdown
  const getEmiratesDisplayText = () => {
    if (isAllEmiratesSelected) {
      return "All Emirates";
    }
    if (selectedEmirates.length === 0) {
      return "Select Emirates";
    }
    if (selectedEmirates.length === 1) {
      const emirate = emiratesList.find(e => e.id === selectedEmirates[0]);
      return emirate ? emirate.name : "Select Emirates";
    }
    return `${selectedEmirates.length} Emirates Selected`;
  };

  // Build the list of images to preview and auto-cycle when multiple are selected
  const selectedEmirateImages = useMemo(() => {
    if (isAllEmiratesSelected || selectedEmirates.length === 0) {
      const abuDhabiThumb = emiratesList.find(e => e.id === "abu-dhabi")?.thumbnail || uaeSkyline;
      return [abuDhabiThumb];
    }
    const urls = selectedEmirates
      .map((id) => emiratesList.find((e) => e.id === id)?.thumbnail)
      .filter((u): u is string => Boolean(u));
    return urls.length ? urls : [uaeSkyline];
  }, [isAllEmiratesSelected, selectedEmirates]);

  const [previewIndex, setPreviewIndex] = useState(0);

  // Reset to first image whenever selection changes
  useEffect(() => {
    setPreviewIndex(0);
  }, [selectedEmirateImages]);

  // Cycle through images every 3s if multiple selected
  useEffect(() => {
    if (selectedEmirateImages.length <= 1) return;
    const id = setInterval(() => {
      setPreviewIndex((i) => (i + 1) % selectedEmirateImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [selectedEmirateImages]);

  const previewImageUrl = selectedEmirateImages[Math.min(previewIndex, selectedEmirateImages.length - 1)];

  const onSubmit = (data: TravelFormData, path: string) => {
    localStorage.setItem("travelFormData", JSON.stringify(data));
    navigate(path);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${uaeSkyline})` }}
    >
      <div className="absolute inset-0  opacity-50"></div>
      <div className="relative z-10">
        <ProgressBar currentStep={1} />

        <div className="container mx-auto px-3 sm:px-4 lg:px-6 pb-8 sm:pb-12">
          <div className="max-w-7xl w-full mx-auto">
            <Card className="card-luxury bg-gradient-to-br from-white/95 via-blue-80/90 to-amber-50/85 backdrop-blur-md border-white/20 shadow-2xl">
              <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-playfair text-center mb-3 sm:mb-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 bg-clip-text text-transparent font-semibold tracking-normal"
                
                >
                  Design Your UAE Adventure, Your Way
                </CardTitle>
                <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed px-2 sm:px-0">
                  Embark on an extraordinary journey through the jewels of the Arabian Peninsula
                </p>
              </CardHeader>

              <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Left: Dynamic Image Preview - Hidden on mobile, shown on desktop */}
                  <div className="hidden lg:block lg:col-span-1">
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-full lg:min-h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-blue-600/20 animate-pulse"></div>
                      
                      {/* Main image with smooth transitions */}
                      <img 
                        src={previewImageUrl} 
                        alt="Selected emirate preview" 
                        className="w-full h-full object-cover transition-all duration-700 ease-in-out transform hover:scale-105" 
                      />
                      
                      {/* Stylish overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Decorative corner elements */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-amber-400/60 rounded-tl-lg"></div>
                      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-amber-400/60 rounded-tr-lg"></div>
                      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-amber-400/60 rounded-bl-lg"></div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-amber-400/60 rounded-br-lg"></div>
                      
                      {/* Enhanced selection counter */}
                      {!isAllEmiratesSelected && selectedEmirates.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-500 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg border border-amber-400/30">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <span>{selectedEmirates.length} Emirates Selected</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Image cycling indicator dots */}
                      {selectedEmirateImages.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {selectedEmirateImages.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === previewIndex 
                                  ? 'bg-amber-400 shadow-lg shadow-amber-400/50' 
                                  : 'bg-white/40 hover:bg-white/60'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Floating destination label */}
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <span className="text-white text-sm font-medium tracking-wide">
                          {isAllEmiratesSelected ? "All UAE Emirates" : getEmiratesDisplayText()}
                        </span>
                      </div>
                      
                      {/* Subtle animation overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
                    </div>
                  </div>

                  {/* Right: Form Fields */}
                  <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-sm font-medium text-slate-700 tracking-wide">Full Name</Label>
                        <Input id="fullName" placeholder="e.g., John Smith" {...register("fullName")} className="input-travel" />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-slate-700 tracking-wide">Phone Number</Label>
                        <div className="relative">
                          <Select 
                            value={selectedCountryCode} 
                            onValueChange={(value) => {
                              setSelectedCountryCode(value);
                              setValue("countryCode", value);
                              setIsCountryDropdownOpen(false);
                              setCountrySearchTerm("");
                            }}
                            open={isCountryDropdownOpen}
                            onOpenChange={setIsCountryDropdownOpen}
                          >
                            <SelectTrigger className="absolute left-2 top-1/2 -translate-y-1/2 border-0 bg-transparent h-auto p-0 w-[78px] sm:w-[84px] lg:w-[96px] hover:bg-muted/50 focus:ring-0 focus:ring-offset-0 z-10">
                              <SelectValue>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs">{countryCodes.find(c => c.dial === selectedCountryCode)?.flag}</span>
                                  <span className="text-xs font-medium">{selectedCountryCode}</span>
                                </div>
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent className="max-h-[250px]">
                              <div className="p-2 border-b">
                                <Input
                                  placeholder="Search countries..."
                                  value={countrySearchTerm}
                                  onChange={(e) => setCountrySearchTerm(e.target.value)}
                                  className="h-8 text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                              <div className="max-h-[180px] overflow-y-auto">
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map((country) => (
                                    <SelectItem key={country.code} value={country.dial}>
                                      <div className="flex items-center gap-2">
                                        <span>{country.flag}</span>
                                        <span className="text-sm">{country.name}</span>
                                        <span className="text-muted-foreground text-xs">{country.dial}</span>
                                      </div>
                                    </SelectItem>
                                  ))
                                ) : (
                                  <div className="p-2 text-sm text-muted-foreground text-center">
                                    No countries found
                                  </div>
                                )}
                              </div>
                            </SelectContent>
                          </Select>
                          <Input 
                            id="phone" 
                            placeholder="e.g., 123456789 " 
                            {...register("phone")} 
                            className="input-travel pl-[90px] sm:pl-[96px] lg:pl-[108px]" 
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onInput={(e) => {
                              // Only allow digits
                              const target = e.target as HTMLInputElement;
                              target.value = target.value.replace(/[^0-9]/g, '');
                            }}
                            maxLength={15}
                          />
                        </div>
                        {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode.message}</p>}
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700 tracking-wide">Email Address</Label>
                        <Input id="email" type="email" placeholder="e.g., name@example.com" {...register("email")} className="input-travel" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 tracking-wide">Trip Duration (Nights)</Label>
                        <Select onValueChange={(v) => setValue("tripDuration", v)}>
                          <SelectTrigger className="input-travel">
                            <SelectValue placeholder="e.g., 5 Days / 4 Nights" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3-days">3 Days / 2 Nights</SelectItem>
                            <SelectItem value="5-days">5 Days / 4 Nights</SelectItem>
                            <SelectItem value="7-days">7 Days / 6 Nights</SelectItem>
                            <SelectItem value="10-days">10 Days / 9 Nights</SelectItem>
                            <SelectItem value="14-days">14 Days / 13 Nights</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.tripDuration && <p className="text-red-500 text-sm">{errors.tripDuration.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 tracking-wide">Travel Month</Label>
                        <Select onValueChange={(v) => setValue("journeyMonth", v)}>
                          <SelectTrigger className="input-travel">
                            <SelectValue placeholder="e.g., January" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              "january","february","march","april","may","june",
                              "july","august","september","october","november","december"
                            ].map((month) => (
                              <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.journeyMonth && <p className="text-red-500 text-sm">{errors.journeyMonth.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="departureCountry" className="text-sm font-medium text-slate-700 tracking-wide">Departing Country</Label>
                        <Input id="departureCountry" placeholder="Departure Country" {...register("departureCountry")} className="input-travel" />
                        {errors.departureCountry && <p className="text-red-500 text-sm">{errors.departureCountry.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 tracking-wide">Destination Emirates</Label>
                        <Select 
                          open={isEmiratesDropdownOpen}
                          onOpenChange={setIsEmiratesDropdownOpen}
                          value="placeholder" // Dummy value to prevent Select from controlling display
                        >
                          <SelectTrigger className="input-travel">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm">{getEmiratesDisplayText()}</span>
                            </div>
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            <div className="p-2">
                              {/* All Emirates Option */}
                              <div 
                                className="flex items-center space-x-3 p-2 hover:bg-muted rounded cursor-pointer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEmirateChange("all", !isAllEmiratesSelected);
                                }}
                              >
                                <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-r from-red-500 to-green-500 rounded text-white text-xs font-bold">
                                  🇦🇪
                                </div>
                                <input
                                  type="checkbox"
                                  checked={isAllEmiratesSelected}
                                  onChange={() => {}} // Handled by parent onClick
                                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary pointer-events-none"
                                />
                                <label className="text-sm font-medium text-foreground cursor-pointer">
                                  All Emirates
                                </label>
                              </div>
                              
                              <div className="border-t my-2"></div>
                              
                              {/* Individual Emirates */}
                              {emiratesList.map((emirate) => (
                                <div 
                                  key={emirate.id}
                                  className="flex items-center space-x-3 p-2 hover:bg-muted rounded cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleEmirateChange(emirate.id, !selectedEmirates.includes(emirate.id));
                                  }}
                                >
                                  <div className="w-6 h-6 flex items-center justify-center bg-muted rounded overflow-hidden">
                                    <img src={emirate.thumbnail} alt={`${emirate.name} thumbnail`} className="w-full h-full object-cover" />
                                  </div>
                                  <input
                                    type="checkbox"
                                    checked={selectedEmirates.includes(emirate.id)}
                                    onChange={() => {}} // Handled by parent onClick
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary pointer-events-none"
                                  />
                                  <label className="text-sm text-foreground cursor-pointer">
                                    {emirate.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                        {errors.emirates && <p className="text-red-500 text-sm">{errors.emirates.message}</p>}
                      </div>
                    </div>

                    {/* Budget and Travelers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 tracking-wide">Budget (per person AED)</Label>
                        <Select onValueChange={(v) => setValue("budget", v)}>
                          <SelectTrigger className="input-travel">
                            <SelectValue placeholder="Select Budget Range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Value">Value - $2,000 – $3,000</SelectItem>
                            <SelectItem value="Mid-Range">Mid-Range - $3,000 – $5,000</SelectItem>
                            <SelectItem value="Premium">Premium - $5,000 – $8,000</SelectItem>
                            <SelectItem value="Luxury">Luxury - $8,000 – $12,000</SelectItem>
                            <SelectItem value="Ultra-Luxury">Ultra-Luxury - $12,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 tracking-wide">Adults (12+ years)</Label>
                        <Select onValueChange={(v) => setValue("adults", Number(v))}>
                          <SelectTrigger className="input-travel">
                            <SelectValue placeholder="Adults" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.adults && <p className="text-red-500 text-sm">{errors.adults.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 tracking-wide">Children (2–11 years)</Label>
                        <Select onValueChange={(v) => setValue("kids", Number(v))}>
                          <SelectTrigger className="input-travel">
                            <SelectValue placeholder="Kids" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5, 6].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700 tracking-wide">Infants (Under 2 years)</Label>
                        <Select onValueChange={(v) => setValue("infants", Number(v))}>
                          <SelectTrigger className="input-travel">
                            <SelectValue placeholder="Infants" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4].map(num => (
                              <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8">
                      <Button
                        type="button"
                        onClick={handleSubmit((data) => onSubmit(data, "/ai-generate"))}
                        className="btn-hero flex-1 text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6"
                      >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                        <div className="text-center min-w-0">
                          <span className="font-semibold text-xs sm:text-sm md:text-base tracking-wide block">AI-Powered Planning</span>
                          <span className="text-xs opacity-80 font-normal mt-0.5 sm:mt-1 leading-tight hidden sm:block">Let our smart assistant create the perfect trip for you.</span>
                        </div>
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSubmit((data) => onSubmit(data, "/manual-plan"))}
                        className="btn-secondary flex-1 text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-6 px-3 sm:px-4 md:px-6"
                      >
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                        <div className="text-center min-w-0">
                          <span className="font-semibold text-xs sm:text-sm md:text-base tracking-wide block">Manual Planning</span>
                          <span className="text-xs opacity-80 font-normal mt-0.5 sm:mt-1 leading-tight hidden sm:block">Prefer the personal touch? Plan your own trip from scratch.</span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}




