"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CODRemittanceProps {
  remittedAmount: string
  unremittedAmount: string
  billDue: string
  avgShippingCost: string
  theme?: string
}

export function CODRemittance({
  remittedAmount,
  unremittedAmount,
  billDue,
  avgShippingCost,
  theme
}: CODRemittanceProps) {
  return (
    <Card className={cn(
      "p-6 transition-all duration-300",
      theme === "dark" ? "bg-[#111827] border-gray-800" : "bg-white"
    )}>
      <h2 className={cn(
        "text-xl font-semibold mb-6",
        theme === "dark" ? "text-white" : "text-gray-900"
      )}>
        COD Remittance
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className={cn(
            "text-sm mb-1",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            Remitted Amount
          </p>
          <p className={cn(
            "text-2xl font-semibold",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            ₹{remittedAmount}
          </p>
        </div>
        <div>
          <p className={cn(
            "text-sm mb-1",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            Unremitted Amount
          </p>
          <p className={cn(
            "text-2xl font-semibold",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            ₹{unremittedAmount}
          </p>
        </div>
        <div>
          <p className={cn(
            "text-sm mb-1",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            Bill Due
          </p>
          <p className="text-xl font-semibold text-red-500">
            ₹{billDue}
          </p>
        </div>
        <div>
          <p className={cn(
            "text-sm mb-1",
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          )}>
            Avg.shipping cost
          </p>
          <p className={cn(
            "text-xl font-semibold",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            ₹{avgShippingCost}
          </p>
        </div>
      </div>
    </Card>
  )
}

