"use client"

import { ArrowLeft, Search } from 'lucide-react'
import Image from "next/image"
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface Channel {
  name: string
  logo: string
  isActive?: boolean
}

const channels: Channel[] = [
  {
    name: "Amazon India",
    logo: "/placeholder.svg?height=40&width=150",
    isActive: true
  },
  {
    name: "Amazon.com",
    logo: "/placeholder.svg?height=40&width=150"
  },
  {
    name: "Shopify",
    logo: "/placeholder.svg?height=40&width=150"
  },
  {
    name: "Magento",
    logo: "/placeholder.svg?height=40&width=150"
  },
  {
    name: "WooCommerce",
    logo: "/placeholder.svg?height=40&width=150"
  },
  {
    name: "OpenCart",
    logo: "/placeholder.svg?height=40&width=150"
  },
  {
    name: "CS.Cart",
    logo: "/placeholder.svg?height=40&width=150"
  },
  {
    name: "PrestaShop",
    logo: "/placeholder.svg?height=40&width=150"
  }
]

export default function ViewChannelIntegration() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Channel Integration</h1>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <p className="text-gray-500 dark:text-gray-400">Integrate multiple channels to sync your orders.</p>
            </div>

            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search channel..."
                className="pl-10"
              />
            </div>

            <h2 className="text-2xl font-semibold mb-6">Available Channels</h2>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {channels.map((channel) => (
                <motion.div
                  key={channel.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="group relative overflow-hidden">
                    <CardContent className="p-8 flex items-center justify-center">
                      <Image
                        src={channel.logo}
                        alt={channel.name}
                        width={150}
                        height={40}
                        className="max-w-[150px] h-auto"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                        <Button>
                          Integrate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

