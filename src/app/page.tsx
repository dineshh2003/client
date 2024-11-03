"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView , useAnimation} from "framer-motion";
import {
  Menu,
  Package,
  Users,
  Map,
  Globe,
  ChevronRight,
  ChevronLeft,
  Router,
  Store, 
  Clock, 
  ShoppingCart,  
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Mail,
  Phone,
  MapPin

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { handleSignOut } from "./actions/authActions";
import { signOut } from "next-auth/react";
import HeroSection from "@/components/HeroSection";


const sliderContent = [
  {
    title: "Efficient Logistics Solutions",
    description:
      "We provide cutting-edge logistics solutions that streamline your supply chain and boost your business efficiency.",
    image:
      "https://img.freepik.com/free-photo/red-delivery-car-deliver-express-with-cardboard-boxes-cartoon-shipping-transportation-concept-white-website-banner-background-3d-rendering_56104-1912.jpg?t=st=1730591082~exp=1730594682~hmac=6984eb8ad23056d488c3c375328f4c7f54eea950181252471ea240b7640d3185&w=1060",
  },
  {
    title: "Global Network",
    description:
      "With our extensive global network, we ensure your packages reach even the most remote corners of the world.",
    image:
      "https://img.freepik.com/free-photo/delivery-concept-portrait-happy-african-american-delivery-man-holding-box-package-showing-thumps-up-isolated-grey-studio-background-copy-space_1258-102473.jpg?t=st=1730591833~exp=1730595433~hmac=c55d5867242a33689f904306a167364c73b01fe7050b38c3fef981014e15fecc&w=1380",
  },
  {
    title: "Customer-Centric Approach",
    description:
      "Our customer-first philosophy means we're always here to support you, every step of the way.",
    image:
      "https://img.freepik.com/free-vector/delivery-service-doodle-concept-mailman_107791-13798.jpg?t=st=1730591848~exp=1730595448~hmac=3acb550c9e0e25250e3454bccdddbcd9804adb641337cd6ae2fcd50bf25d2a10&w=1380",
  },
];


const courierLogos = [
  { name: "Courier 1", url: "/placeholder.svg?height=100&width=200" },
  { name: "Courier 2", url: "/placeholder.svg?height=100&width=200" },
  { name: "Courier 3", url: "/placeholder.svg?height=100&width=200" },
  { name: "Courier 4", url: "/placeholder.svg?height=100&width=200" },
  { name: "Courier 5", url: "/placeholder.svg?height=100&width=200" },
  { name: "Courier 6", url: "/placeholder.svg?height=100&width=200" },
]

const steps = [
  {
    number: "01",
    title: "Set up your e-commerce store",
    description: "Set up your store over any online platform (WordPress, Open cart, Magento, Shopify, etc)",
    icon: Store
  },
  {
    number: "02",
    title: "Connect your website",
    description: "Select your preferred courier from the list of fast, reliable, and affordable courier companies",
    icon: Globe
  },
  {
    number: "03",
    title: "Get ready to ship",
    description: "Set up your products for shipment",
    icon: Package
  },
  {
    number: "04",
    title: "Track in real-time",
    description: "With AI-driven technology, get real-time updates and ship easily",
    icon: Clock
  }
]

const sellerTypes = [
  {
    title: "Small scale enterprises",
    description: "Perfect for small businesses with eCommerce stores on WordPress, OpenCart, Magento, Shopify, etc.",
    icon: Store
  },
  {
    title: "Marketplace sellers",
    description: "Ideal for sellers on Amazon, eBay, and other marketplace platforms.",
    icon: ShoppingCart
  },
  {
    title: "Social media sellers",
    description: "Perfect for influencers and businesses selling through social media platforms.",
    icon: Users
  },
  {
    title: "Omnichannel sellers",
    description: "Comprehensive solution for businesses with multiple distribution centers.",
    icon: Globe
  }
]



export default function Component() {

  const router = useRouter();

  const { data : session } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const [currentSlide, setCurrentSlide] = useState(0);

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  
const signInHandler = () =>{
   router.push('/auth/signin')
}



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderContent.length) % sliderContent.length
    );
  };

  return (
    <div className="min-h-[400vh]">
      {/* Initial animation overlay */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ originX: 0 }}
        className="fixed inset-0 bg-primary z-50"
      />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div
            className={`font-bold text-3xl transition-all duration-300 ease-in-out ${
              isScrolled ? "text-gray-600 hover:text-primary" : "text-white"
            }`}
          >
            ShipEase
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {["Solutions", "Pricing", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className={`transition-colors duration-300 ease-in-out ${
                  isScrolled
                    ? "text-gray-600 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
            {!session ? (
              <div className="">
                <Button variant="outline" className="ml-4" onClick={signInHandler}>
                  Sign In
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="ml-4" onClick={() => signOut()}>
                  sign Out
                </Button>
            )}
          </nav>
          <Button
            variant={isScrolled ? "outline" : "secondary"}
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            // backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"
            backgroundImage: "url('/landingbg2.jpg')",
            // backgroundImage : "url('https://img.freepik.com/free-photo/red-delivery-car-deliver-express-with-cardboard-boxes-cartoon-shipping-transportation-concept-white-website-banner-background-3d-rendering_56104-1912.jpg?t=st=1730591082~exp=1730594682~hmac=6984eb8ad23056d488c3c375328f4c7f54eea950181252471ea240b7640d3185&w=1060')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative h-full flex items-center justify-center text-white container mx-auto px-4">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Global Shipping Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-8"
            >
              Your one-stop platform for all shipping needs
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <Button size="lg" className="text-lg">
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="min-h-screen bg-white flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-300">
              Starting an E-Commerce Store? Let us look after your logistics
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Sell, ship, and track with ease by choosing multiple courier
              partners through one single shipping platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg">
                Register with us
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Join community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="min-h-screen bg-gray-50 flex items-center">
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-400">
              More reasons to choose ShipEase
            </h2>
            <p className="text-xl text-gray-600">
              Grow your ecommerce business with our shipping solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Users, number: "10,000+", label: "Happy customers" },
              { icon: Package, number: "25,000+", label: "Daily Shipments" },
              { icon: Map, number: "29,000+", label: "Pin codes" },
              { icon: Globe, number: "180", label: "Total countries" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-secondary mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="min-h-screen bg-white flex items-center overflow-hidden">
        <div className="container mx-auto px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-gray-400">
            Who We Are
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-lg"
              >
                <h3 className="text-2xl text-gray-400 font-bold mb-4">
                  {sliderContent[currentSlide].title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {sliderContent[currentSlide].description}
                </p>
                <div className="flex space-x-4">
                  <Button onClick={prevSlide} variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button onClick={nextSlide} variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full">
              {sliderContent.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    x: currentSlide === index ? 0 : 100,
                  }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <HeroSection/>
    </div>
  );
}
