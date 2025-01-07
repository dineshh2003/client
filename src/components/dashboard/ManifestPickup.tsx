"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ManifestData {
  day: number
  days: string
  count: number
  isHighlighted?: boolean
}

interface ManifestToPickupProps {
  totalOrders: string
  data: ManifestData[]
  theme?: string
}

export function ManifestToPickup({ totalOrders, data, theme }: ManifestToPickupProps) {
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
          Manifest to Pickup
        </h2>
        <div className={cn(
          "text-sm font-medium",
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        )}>
          {totalOrders} Orders
        </div>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {data.map((item) => (
          <div key={item.day} className="text-center">
            <div className={cn(
              "mb-2 text-sm",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              {item.day}
              <br />
              {item.days}
            </div>
            <div className={cn(
              "text-lg font-semibold",
              item.isHighlighted
                ? "text-red-500"
                : theme === "dark"
                ? "text-white"
                : "text-gray-900"
            )}>
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

