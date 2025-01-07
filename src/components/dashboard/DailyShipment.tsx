"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface ShipmentData {
  date: string
  newOrder: number
  pickup: number
  inTransit: number
  ofd: number
  delivered: number
  undelivered: number
  rto: number
  other: number
}

interface DailyShipmentsProps {
  data?: ShipmentData[];
  theme?: string;
}

export function DailyShipments({ data = [], theme }: DailyShipmentsProps) {
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
          Daily Shipments Count
        </h2>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className={cn(
              "w-[180px] border transition-colors duration-300",
              theme === "dark"
                ? "bg-[#1e293b] border-gray-700 text-white"
                : "bg-gray-50 border-gray-200 text-gray-900"
            )}>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <div className={cn(
            "px-4 py-2 rounded border transition-colors duration-300",
            theme === "dark"
              ? "bg-[#1e293b] border-gray-700 text-white"
              : "bg-gray-50 border-gray-200 text-gray-900"
          )}>
            Date: 29-12-2024
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className={theme === "dark" ? "border-gray-800" : "border-gray-200"}>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Date</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>New Order</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Pickup</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>In Transit</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>OFD</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Delivered</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Undelivered</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>RTO</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Other</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4">
                <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  No shipment data available.
                </p>
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <TableRow 
                key={row.date}
                className={cn(
                  theme === "dark" ? "border-gray-800" : "border-gray-200",
                  theme === "dark" ? "text-gray-300" : "text-gray-900"
                )}
              >
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.newOrder}</TableCell>
                <TableCell>{row.pickup}</TableCell>
                <TableCell>{row.inTransit}</TableCell>
                <TableCell>{row.ofd}</TableCell>
                <TableCell>{row.delivered}</TableCell>
                <TableCell>{row.undelivered}</TableCell>
                <TableCell>{row.rto}</TableCell>
                <TableCell>{row.other}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}

