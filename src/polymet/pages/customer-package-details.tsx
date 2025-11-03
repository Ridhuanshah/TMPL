import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  Star,
  Facebook,
  Mail,
  Phone,
  MessageSquare,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mountain,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { packageService } from "@/polymet/services/package-service";
import { PackageWithRelations } from "@/polymet/services/database.types";
import useEmblaCarousel from "embla-carousel-react";
import SimplePDFFlipbook from "@/polymet/components/simple-pdf-flipbook";

export function CustomerPackageDetails() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<PackageWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Fetch package data from database
  useEffect(() => {
    async function fetchPackage() {
      if (!id) return;
      
      setLoading(true);
      try {
        // Use getBySlug since the route parameter is actually a slug, not UUID
        const data = await packageService.getBySlug(id);
        setPkg(data);
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackage();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-yellow-500" />
          <p className="text-gray-600">Loading package details...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Package Not Found</h2>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Convert database format to display format
  // Supabase returns package_images, handle both formats
  const images = (pkg as any).package_images || pkg.images || [];
  const heroImage = pkg.hero_image || images.find((img: any) => img.type === 'hero')?.url || images[0]?.url;
  const galleryImages = pkg.gallery_images || images.filter((img: any) => img.type === 'gallery').map((img: any) => img.url);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this amazing trip: ${pkg.name}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
          "_blank"
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(
          pkg.name
        )}&body=${encodeURIComponent(text + "\\n\\n" + url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
        break;
    }
  };

  const formatCurrency = (amount: number) => `${pkg.currency} ${amount.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Floating Images */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Title Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            {pkg.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl"
          >
            {pkg.category} • {pkg.continent}
          </motion.p>
        </div>

        {/* Floating Image Cards */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {galleryImages.slice(0, 5).map((image, index) => {
            const positions = [
              { top: "10%", left: "10%", width: "200px", height: "280px" },
              { top: "20%", right: "15%", width: "180px", height: "200px" },
              { bottom: "15%", left: "12%", width: "220px", height: "160px" },
              { bottom: "20%", right: "10%", width: "190px", height: "250px" },
              { top: "40%", right: "30%", width: "170px", height: "220px" },
            ];

            const position = positions[index] || positions[0];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="absolute rounded-2xl overflow-hidden shadow-2xl pointer-events-auto transform hover:scale-105 transition-transform duration-300"
                style={{
                  ...position,
                  animation: `float ${5 + index}s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                <img
                  src={image}
                  alt={`${pkg.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Package Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto -mt-32 relative z-20"
        >
          <Card className="shadow-2xl">
            <CardContent className="p-0">
              <div className="p-6 md:p-8">
                {/* Continent Badge */}
                <div className="flex justify-center mb-6">
                  <Badge className="bg-gray-900 text-white px-6 py-2 text-lg font-semibold">
                    {pkg.continent.toUpperCase()}
                  </Badge>
                </div>

                {/* Pricing Badge */}
                <div className="flex justify-center mb-6">
                  <div className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full shadow-lg">
                    <span className="text-3xl md:text-4xl font-bold">
                      {formatCurrency(pkg.base_price)}
                    </span>
                  </div>
                </div>

                {/* Trip Info */}
                <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{pkg.duration} Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">
                      {pkg.min_group_size}-{pkg.max_group_size} People
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mountain className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{pkg.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">
                      {pkg.rating} ({pkg.review_count} reviews)
                    </span>
                  </div>
                </div>

                {/* Featured Image */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img
                    src={heroImage}
                    alt={pkg.name}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg px-8"
                  >
                    Book This Package
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Read More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Introduction Section */}
        <section className="mt-16 md:mt-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About This Trip
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Image Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex">
                {galleryImages.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
                  >
                    <img
                      src={image}
                      alt={`${pkg.name} - Gallery ${imgIndex + 1}`}
                      className="w-full h-72 object-cover rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Package Information Tabs */}
        <section className="mt-16 md:mt-24">
          <div className="max-w-6xl mx-auto px-4">
            <Tabs defaultValue="highlights" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto mb-8">
                <TabsTrigger value="highlights" className="text-xs md:text-sm py-3">
                  Highlights
                </TabsTrigger>
                <TabsTrigger value="itinerary" className="text-xs md:text-sm py-3">
                  Itinerary
                </TabsTrigger>
                <TabsTrigger value="included" className="text-xs md:text-sm py-3">
                  Included
                </TabsTrigger>
                <TabsTrigger value="tips" className="text-xs md:text-sm py-3">
                  Tips
                </TabsTrigger>
                <TabsTrigger value="items" className="text-xs md:text-sm py-3">
                  Items
                </TabsTrigger>
              </TabsList>

              {/* Trip Highlights Tab */}
              <TabsContent value="highlights" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Daily Itinerary Tab */}
              <TabsContent value="itinerary" className="mt-0">
                {pkg.daily_itinerary && pkg.daily_itinerary.length > 0 && (
                <div className="space-y-6">
                {pkg.daily_itinerary.map((day, index) => (
                  <motion.div
                    key={day.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() =>
                        setSelectedDay(selectedDay === index ? null : index)
                      }
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="bg-yellow-400 text-gray-900 font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center">
                              {day.day_number}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{day.title}</h3>
                              <p className="text-sm text-gray-600">
                                {day.location_from} → {day.location_to}
                              </p>
                            </div>
                          </div>
                          {day.is_optional && (
                            <Badge variant="secondary">Optional</Badge>
                          )}
                        </div>

                        {selectedDay === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t"
                          >
                            <p className="text-gray-700 mb-4">
                              {day.description}
                            </p>
                            <div>
                              <h4 className="font-semibold mb-2">Activities:</h4>
                              <ul className="space-y-2">
                                {day.activities.map((activity, actIndex) => (
                                  <li
                                    key={actIndex}
                                    className="flex items-start gap-2"
                                  >
                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">
                                      {activity}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {day.is_optional && day.optional_price && (
                              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                                <p className="text-sm font-medium">
                                  Optional Add-on: {formatCurrency(day.optional_price)}
                                </p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                </div>
                )}
              </TabsContent>

              {/* What's Included Tab */}
              <TabsContent value="included" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-6 flex items-center gap-2">
                  <Check className="w-6 h-6" />
                  Included
                </h3>
                <ul className="space-y-3">
                  {pkg.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
                  <X className="w-6 h-6" />
                  Not Included
                </h3>
                <ul className="space-y-3">
                  {pkg.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
                </div>
              </TabsContent>

              {/* Travel Tips Tab */}
              <TabsContent value="tips" className="mt-0">
                {pkg.travel_tips && pkg.travel_tips.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pkg.travel_tips.map((tip) => (
                      <Card key={tip.id}>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                          <p className="text-gray-700">{tip.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                {(!pkg.travel_tips || pkg.travel_tips.length === 0) && (
                  <p className="text-center text-gray-500 py-8">No travel tips available.</p>
                )}
              </TabsContent>

              {/* Essential Items Tab */}
              <TabsContent value="items" className="mt-0">
                {pkg.essential_items && pkg.essential_items.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {pkg.essential_items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{item.item_name}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {(!pkg.essential_items || pkg.essential_items.length === 0) && (
                  <p className="text-center text-gray-500 py-8">No essential items listed.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 3D PDF Flipbook Viewer */}
        {pkg.pdfItinerary && (
          <section className="mt-16 md:mt-24">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  📖 Interactive Itinerary Flipbook
                </h2>
                <p className="text-gray-600 text-lg">
                  Experience your journey in an immersive 3D flipbook • Click pages to turn
                </p>
              </div>
              
              <SimplePDFFlipbook 
                pdfUrl={pkg.pdfItinerary}
                title={`${pkg.name} - ${pkg.duration} Day Itinerary`}
              />
            </div>
          </section>
        )}

        {/* Travel Tips */}
        {pkg.travel_tips && pkg.travel_tips.length > 0 && (
          <section className="mt-16 md:mt-24 bg-blue-50 -mx-4 px-4 py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Travel Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pkg.travel_tips.map((tip, index) => (
                  <Card key={tip.id}>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                      <p className="text-gray-700">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Essential Items */}
        {pkg.essential_items && pkg.essential_items.length > 0 && (
          <section className="mt-16 md:mt-24">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Essential Items to Bring
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pkg.essential_items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item.item_name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Booking CTA Section */}
        <section className="mt-16 md:mt-24 bg-gray-900 -mx-4 px-4 py-12 md:py-16 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Want to Make a Booking?
            </h2>
            <p className="text-lg text-gray-300 mb-12">
              Get in touch with our travel experts to customize your perfect trip
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-white/10 rounded-lg">
                <Phone className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-gray-300">+60 19 661 6388</p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg">
                <MessageSquare className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <Button
                  variant="link"
                  className="text-yellow-400"
                  onClick={() =>
                    window.open("https://wa.me/60196616388", "_blank")
                  }
                >
                  Chat with us
                </Button>
              </div>
              <div className="p-6 bg-white/10 rounded-lg">
                <Mail className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-300">info@tmplescapade.my</p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg px-12"
            >
              Get A Quote
            </Button>
          </div>
        </section>

        {/* Social Share Bar */}
        <section className="mt-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleShare("facebook")}
                className="gap-2"
              >
                <Facebook className="w-5 h-5" />
                Share on Facebook
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleShare("whatsapp")}
                className="gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Share on WhatsApp
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleShare("email")}
                className="gap-2"
              >
                <Mail className="w-5 h-5" />
                Share via Email
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleShare("copy")}
                className="gap-2"
              >
                <Copy className="w-5 h-5" />
                Copy Link
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Animation CSS */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

export default CustomerPackageDetails;
