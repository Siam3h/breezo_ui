
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Bike, MapPin, Users, Download, MessageSquare, Zap, Lock, Battery } from 'lucide-react';

const FeaturesCarousel = () => {
  const features = [
    {
      icon: Bike,
      title: "Smart E-bikes",
      description: "Electric-assisted bicycles with GPS tracking",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "GPS Tracking",
      description: "Real-time location and route optimization",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lock,
      title: "Quick Unlock",
      description: "Scan QR code to unlock instantly",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Fast Charging",
      description: "Quick charge stations everywhere",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Battery,
      title: "Long Range",
      description: "Up to 50km on single charge",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: MessageSquare,
      title: "Health Stats",
      description: "Track calories and distance",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join group rides and events",
      color: "from-teal-500 to-blue-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Amazing Features for <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Smart Riders</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every Breezo bike is packed with cool tech to make your ride awesome!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {features.map((feature, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="group p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/80 border-purple-200 hover:bg-purple-100" />
            <CarouselNext className="bg-white/80 border-purple-200 hover:bg-purple-100" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
