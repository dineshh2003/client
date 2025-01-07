"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface DeliveryData {
  day: number
  percentage: number
  orders: number
  isHighlighted?: boolean
}

interface OFDSummaryProps {
  totalOrders: string
  data: DeliveryData[]
  theme?: string
}

export function OFDSummary({ totalOrders, data, theme }: OFDSummaryProps) {
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
          OFD Summary
        </h2>
        <div className={cn(
          "text-sm font-medium",
          theme === "dark" ? "text-blue-400" : "text-blue-600"
        )}>
          {totalOrders} Orders
        </div>
      </div>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.day} className="flex items-center gap-4">
            <div className="w-8">
              <span className={cn(
                "text-lg font-semibold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                {item.day}
              </span>
            </div>
            <div className="flex-1">
              <Progress value={item.percentage} className="h-2" />
            </div>
            <div className="w-24 text-right">
              <span className={cn(
                "text-sm",
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              )}>
                {item.orders} Orders
              </span>
            </div>
            <div className="w-16 text-right">
              <span className={cn(
                "text-sm font-medium",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

