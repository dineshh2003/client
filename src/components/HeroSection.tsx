'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion'
import { 
  Store, 
  Globe, 
  Package, 
  Clock, 
  ShoppingCart, 
  Users, 
  Facebook,
  Instagram,
  Youtube,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { Button } from "@/components/ui/button"

const courierLogos = [
  { name: "Courier 1", url: "https://sr-website.shiprocket.in/wp-content/uploads/2023/07/cl-logo-4.png" },
  { name: "Courier 2", url: "https://sr-website.shiprocket.in/wp-content/uploads/2023/07/cl-logo-2.png" },
  { name: "Courier 3", url: "https://sr-website.shiprocket.in/wp-content/uploads/2023/07/cl-logo-3.png" },
  { name: "Courier 4", url: "https://sr-website.shiprocket.in/wp-content/uploads/2023/07/cl-logo-7.png" },
  { name: "Courier 5", url: "https://sr-website.shiprocket.in/wp-content/uploads/2023/07/cl-logo-8.png" },
  { name: "Courier 6", url: "https://sr-website.shiprocket.in/wp-content/uploads/2023/07/cl-logo-8.png" },
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

export default function HeroSection() {
  const controls = useAnimation()
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header remains the same as previous version */}
      
      {/* Hero Section with Floating Logos */}
      <section className="min-h-screen bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-300 mb-6">
                From anywhere
                <br />
                <span className="text-yellow-300">to everywhere</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Our multi-courier network spread across 24000+ pin codes lets you say yes to every order, even from remote areas.
              </p>
              <Button size="lg" variant="secondary" className="text-lg">
                Explore integrations <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
            
            <div className="relative h-[600px] hidden lg:block">
              {courierLogos.map((logo, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ y: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                  animate={{ 
                    y: [index % 2 === 0 ? -100 : 100, index % 2 === 0 ? 100 : -100],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    delay: index * 2,
                    ease: "linear"
                  }}
                  style={{
                    left: `${(index % 3) * 33}%`,
                    top: `${Math.floor(index / 3) * 33}%`
                  }}
                >
                  <div className="bg-white p-4 rounded-lg shadow-lg w-[200px] h-[100px] flex items-center justify-center">
                    <img src={logo.url} alt={logo.name} className="max-w-full h-auto" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Steps Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-orange-300 font-bold mb-4">Ship in 4 simple steps</h2>
            <p className="text-xl text-gray-600">
              Our online shipping platform is easy to use. Here is all you need to do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-lg p-6 shadow-lg h-full">
                  <div className="text-gray-500 text-5xl font-bold mb-4">{step.number}</div>
                  <step.icon className="w-12 h-12 text-gray-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary w-8 h-8" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seller Types Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perfect for every seller</h2>
            <p className="text-xl text-gray-300">
              Choose the solution that best fits your business
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {sellerTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-navy-800 rounded-lg p-8 hover:bg-navy-700 transition-colors"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-primary/10 rounded-full p-4">
                    <type.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                    <p className="text-gray-300">{type.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white min-h-[80vh] py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">ShipEase</h3>
              <p className="text-gray-300 mb-6">
                Your trusted partner in global logistics and shipping solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['About Us', 'Services', 'Pricing', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-4">
                {['International Shipping', 'Domestic Shipping', 'Warehousing', 'API Integration'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">support@shipease.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">123 Shipping Lane, Logistics City</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="grid md:grid-cols-2 gap-4">
              <p className="text-gray-400">
                © 2024 ShipEase. All rights reserved.
              </p>
              <div className="flex space-x-6 md:justify-end">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}