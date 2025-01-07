"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MapPin, Copy } from 'lucide-react'

interface NotDispatchedProps {
  totalOrders: string
  incorrectAddress: number
  duplicateOrder: number
  theme?: string
}

export function NotDispatched({ totalOrders, incorrectAddress, duplicateOrder, theme }: NotDispatchedProps) {
  return (
    <Card className={cn(
      "p-6 transition-all duration-300",
      theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-white"
    )}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={cn(
          "text-xl font-semibold",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          Not Dispatched Summary
        </h2>
        <div className={cn(
          "text-sm font-medium",
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        )}>
          {totalOrders} Orders
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className={cn(
          "p-4 rounded-lg border transition-all duration-300",
          theme === "dark"
            ? "bg-[#1e293b] border-gray-800"
            : "bg-gray-50 border-gray-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className={cn(
                "text-xl font-semibold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                {incorrectAddress}
              </p>
              <p className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                Incorrect Address
              </p>
            </div>
          </div>
        </div>
        <div className={cn(
          "p-4 rounded-lg border transition-all duration-300",
          theme === "dark"
            ? "bg-[#1e293b] border-gray-800"
            : "bg-gray-50 border-gray-200"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Copy className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className={cn(
                "text-xl font-semibold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                {duplicateOrder}
              </p>
              <p className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                Duplicate Order
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

