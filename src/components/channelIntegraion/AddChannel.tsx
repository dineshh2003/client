'use client'

import { useState } from 'react'
import { Search, CheckCircle, Pencil, X } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import Image from 'next/image'
import AddNewForm from './newForm'

interface Store {
  id: string
  name: string
  domain: string
  lastSync: string
  isActive: boolean
  storeId: string
}

const stores: Store[] = [
  {
    id: "1",
    name: "Yupods",
    domain: "43c9db-4c.myshopify.com",
    lastSync: "7 Dec 2024 06:10:24",
    isActive: true,
    storeId: "16010"
  },
  {
    id: "2",
    name: "yupods shop",
    domain: "d0698e-2.myshopify.com",
    lastSync: "31 Mar 2024 06:59:02",
    isActive: true,
    storeId: "15683"
  }
]

export default function AddChannelIntegration() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="h-screen bg-gray-800 text-white p-8 relative">
      <div className={`max-w-7xl mx-auto ${showForm ? 'blur-sm' : ''}`}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Store</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Store..."
                className="w-64 bg-zinc-700/50 border border-zinc-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              onClick={() => setShowForm(true)}
            >
              Add New
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-zinc-800 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg?height=30&width=100"
                    alt="Shopify"
                    width={100}
                    height={30}
                    className="h-8 w-auto"
                  />
                  <div className="flex items-center text-emerald-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Connected
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Store ID</div>
                  <div className="font-medium">{store.storeId}</div>
                </div>
                <div>
                  <div className="text-zinc-400 text-sm mb-1">Name</div>
                  <div className="font-medium">{store.name}</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-zinc-400 text-sm mb-1">Domain</div>
                <div className="font-medium">{store.domain}</div>
              </div>

              <div className="mb-6">
                <div className="text-zinc-400 text-sm mb-1">Last Order Sync</div>
                <div className="font-medium">{store.lastSync}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch checked={store.isActive} />
                  <span className="text-sm">Active</span>
                </div>
                <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showForm && (
        <div className="absolute inset-0 flex items-center justify-center">
          <AddNewForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  )
}

