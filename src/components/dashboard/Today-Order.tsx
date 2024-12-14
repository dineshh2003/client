import { Package, Truck, ArrowRight, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import { type OrderStats } from "../types/order"

interface TodaysOrderProps {
  date: string
  stats: OrderStats
}

export function TodaysOrder({ date, stats }: TodaysOrderProps) {
  return (
    <div className="rounded-lg bg-gray-900 p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Today&apos;s Order</h2>
        <div className="rounded bg-gray-700 px-4 py-2">Date: {date}</div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <Package className="mb-2 h-6 w-6" />
          <span className="text-sm text-gray-400">Pickup</span>
          <span className="text-2xl font-semibold">{stats.pickup}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <Truck className="mb-2 h-6 w-6" />
          <span className="text-sm text-gray-400">In Transit</span>
          <span className="text-2xl font-semibold">{stats.inTransit}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <ArrowRight className="mb-2 h-6 w-6" />
          <span className="text-sm text-gray-400">OFD</span>
          <span className="text-2xl font-semibold">{stats.ofd}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <CheckCircle className="mb-2 h-6 w-6" />
          <span className="text-sm text-gray-400">Delivered</span>
          <span className="text-2xl font-semibold">{stats.delivered}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <XCircle className="mb-2 h-6 w-6" />
          <span className="text-sm text-gray-400">Undelivered</span>
          <span className="text-2xl font-semibold">{stats.undelivered}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-gray-800 p-4">
          <RotateCcw className="mb-2 h-6 w-6" />
          <span className="text-sm text-gray-400">RTO</span>
          <span className="text-2xl font-semibold">{stats.rto}</span>
        </div>
      </div>
    </div>
  )
}

