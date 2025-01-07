"use client"

import { useState } from 'react'
import { Search, CheckCircle, Pencil, Plus } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import Image from 'next/image'
import AddNewForm from './NewForm'
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

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
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen p-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`max-w-7xl mx-auto ${showForm ? 'blur-sm' : ''}`}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Store Integration</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search Store..."
                className="w-64 pl-10"
              />
            </div>
            
            <Button
              onClick={() => setShowForm(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {stores.map((store) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/placeholder.svg?height=30&width=100"
                        alt="Shopify"
                        width={100}
                        height={30}
                        className="h-8 w-auto"
                      />
                      <div className="flex items-center text-emerald-500 text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Connected
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Store ID</div>
                      <div className="font-medium">{store.storeId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Name</div>
                      <div className="font-medium">{store.name}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Domain</div>
                    <div className="font-medium">{store.domain}</div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Order Sync</div>
                    <div className="font-medium">{store.lastSync}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch checked={store.isActive} />
                      <span className="text-sm font-medium">Active</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {showForm && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AddNewForm onClose={() => setShowForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

