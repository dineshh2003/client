"use client"

import { CalendarIcon, Package2Icon, TruckIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NDRDashboard() {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-zinc-800 p-2 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              <span>01-12-2024 31-12-2024</span>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-zinc-800">
                <SelectValue placeholder="Select Courier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">Quick Links</span>
            <button className="flex items-center gap-2 bg-zinc-800 px-4 py-2 rounded-lg">
              <Package2Icon className="h-5 w-5" />
              Pincode
            </button>
          </div>
        </div>

        {/* Main Stats Card */}
        <Card className="bg-zinc-800 border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">Non-Delivery Report</h1>
                <p className="text-zinc-400 max-w-xl">
                  All the information about Non-delivery orders can be viewed here, Please
                  follow Few Simple steps to get your order delivered
                </p>
                <div className="flex gap-4 mt-6">
                  <StatCard number={118} label="Action Required" color="text-orange-500" />
                  <StatCard number={322} label="Action Requested" color="text-yellow-500" />
                  <StatCard number={282} label="ITL Attempted" color="text-red-500" />
                </div>
              </div>
              <div className="hidden lg:block">
                <DeliveryIllustration />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-zinc-800 border-none">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500/20 p-4 rounded-full">
                  <Package2Icon className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">945</h2>
                  <p className="text-zinc-400">NDR Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-4 rounded-full">
                    <TruckIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">67</h2>
                    <p className="text-zinc-400">Delivered</p>
                  </div>
                </div>
                <Progress value={15} className="w-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 border-none">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-500/20 p-4 rounded-full">
                    <Package2Icon className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">524</h2>
                    <p className="text-zinc-400">RTO</p>
                  </div>
                </div>
                <Progress value={3} className="w-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DelayDispatchCard />
          <ReasonsCard />
        </div>
      </div>
    </div>
  )
}

function StatCard({ number, label, color }: { number: number; label: string; color: string }) {
  return (
    <div className="bg-zinc-900/50 px-6 py-4 rounded-lg">
      <span className={`text-xl font-bold ${color}`}>{number}</span>
      <p className="text-sm text-zinc-400">{label}</p>
    </div>
  )
}

function DeliveryIllustration() {
  return (
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 bg-orange-500/20 rounded-full" />
      <img
        src="/placeholder.svg?height=256&width=256"
        alt="Delivery Illustration"
        className="relative z-10"
      />
    </div>
  )
}

function DelayDispatchCard() {
  const delays = [
    { days: 1, rto: "2%", orders: 5 },
    { days: 2, rto: "0%", orders: 0 },
    { days: 3, rto: "0%", orders: 0 },
    { days: 4, rto: "0%", orders: 0 },
    { days: 5, rto: "0%", orders: 0 },
    { days: 6, rto: "0%", orders: 0 },
    { days: "6+", rto: "0%", orders: 0 },
  ]

  return (
    <Card className="bg-zinc-800 border-none">
      <CardHeader>
        <CardTitle className="text-lg">Delay Dispatch (In Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {delays.map((delay) => (
            <div
              key={delay.days}
              className="bg-zinc-900/50 p-4 rounded-lg text-center"
            >
              <div className="text-xl font-bold">{delay.days}</div>
              <div className="text-sm text-zinc-400">RTO</div>
              <div className="text-sm font-medium">{delay.rto}</div>
              <div className="text-xs text-zinc-400 mt-1">
                {delay.orders} Orders
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ReasonsCard() {
  const reasons = [
    { reason: "address incomplete / Unlocatable", percentage: 19.1 },
    { reason: "cod amount not ready with customer", percentage: 0.1 },
    { reason: "customer cancelled the order", percentage: 41.1 },
    { reason: "customer not available at the time of delivery", percentage: 23.4 },
    { reason: "customer requested for future delivery", percentage: 1.0 },
    { reason: "customer residence closed at the time of delivery", percentage: 2.9 },
    { reason: "customer shifted to different address", percentage: 0.5 },
  ]

  return (
    <Card className="bg-zinc-800 border-none">
      <CardHeader>
        <CardTitle className="text-lg">Reasons for NDR</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reasons.map((reason) => (
            <div key={reason.reason} className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">{reason.reason}</span>
              <div className="flex items-center gap-2">
                <Progress value={reason.percentage} className="w-24" />
                <span className="text-sm font-medium">{reason.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

