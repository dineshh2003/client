'use client'

import { motion } from "framer-motion"
import { Building2, Mail, MapPin, Phone, User } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { WareHouse } from "@/types/warehouse"

interface WarehouseCardProps {
  warehouse: WareHouse
}

export function WarehouseCard({ warehouse }: WarehouseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-purple-500" />
            <h3 className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Warehouse ID: {warehouse.id}
            </h3>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-500" />
              <span className="text-sm">{warehouse.contactPerson}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-purple-500" />
              <span className="text-sm">{warehouse.contactNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-purple-500" />
              <span className="text-sm">{warehouse.emailAddress}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-purple-500 mt-0.5" />
              <div className="grid gap-1">
                <span className="text-sm">{warehouse.completeAddress}</span>
                {warehouse.landmark && (
                  <span className="text-sm text-muted-foreground">
                    Near {warehouse.landmark}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">
                  {warehouse.city}, {warehouse.state} {warehouse.pincode}
                </span>
                <span className="text-sm text-muted-foreground">
                  {warehouse.country}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}