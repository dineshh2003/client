'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Building2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import WarehouseForm from '@/utils/WarehouseForm'
import WarehousesPage from './Warehouse'

interface WarehouseManagerProps {
  open?: boolean;
  onClose?: () => void;
}

export default function WarehouseManager({ open = false, onClose }: WarehouseManagerProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  
  // Handle external open/close state
  useEffect(() => {
    if (open) {
      setIsFormOpen(true);
    }
  }, [open]);

  // Handle form close
  const handleFormClose = () => {
    setIsFormOpen(false);
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <h1 className="text-3xl font-bold text-purple-400">Warehouse Manager</h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="mr-2 h-5 w-5" /> Add Warehouse
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <WarehousesPage />
      </motion.div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WarehouseForm
              open={isFormOpen}
              onClose={handleFormClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}