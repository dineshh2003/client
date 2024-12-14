import { ArrowLeft, Search } from 'lucide-react'
import Image from "next/image"

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
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Channel Integration</h1>
        
        <div className="bg-zinc-800 rounded-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <p className="text-zinc-400">Integrate multiple channels to sync your orders.</p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search channel..."
              className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h2 className="text-xl font-semibold mb-6">Available Channels</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className="relative group bg-zinc-700/30 hover:bg-zinc-700/50 rounded-lg p-8 transition-all duration-200 flex items-center justify-center"
              >
                <Image
                  src={channel.logo}
                  alt={channel.name}
                  width={150}
                  height={40}
                  className="max-w-[150px] h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors">
                    Integrate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

