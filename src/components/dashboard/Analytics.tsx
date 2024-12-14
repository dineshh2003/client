'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Copy } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const orderData = [
  { week: "Week 1", orders: 820 },
  { week: "Week 2", orders: 932 },
  { week: "Week 3", orders: 801 },
  { week: "Week 4", orders: 1134 },
  { week: "Week 5", orders: 621 }
]

const remittanceData = [
  { week: "Week 1", amount: 500000 },
  { week: "Week 2", amount: 780000 },
  { week: "Week 3", amount: 1000000 },
  { week: "Week 4", amount: 780000 },
  { week: "Week 5", amount: 550000 }
]

const delayData = [
  { days: "1 Day", manifest: 5120, pickup: 5000 },
  { days: "2 Days", manifest: 1400, pickup: 1330 },
  { days: "3 Days", manifest: 349, pickup: 501 },
  { days: "4 Days", manifest: 188, pickup: 143 },
  { days: "5 Days", manifest: 152, pickup: 97 },
  { days: "6 Days", manifest: 58, pickup: 93 },
  { days: "6+ Days", manifest: 180, pickup: 241 }
]

export default function Analytics() {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 bg-gray-900 text-gray-100">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">Last 30 Days Orders</CardTitle>
          <span className="text-blue-400">4.30K</span>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={200}>
            <BarChart data={orderData}>
              <XAxis dataKey="week" fontSize={12} tickLine={false} axisLine={false} stroke="#9CA3AF" />
              <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#9CA3AF" />
              <Bar dataKey="orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium">My COD Remittance</CardTitle>
          <span className="text-blue-400">₹3.70M</span>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={200}>
            <BarChart data={remittanceData}>
              <XAxis dataKey="week" fontSize={12} tickLine={false} axisLine={false} stroke="#9CA3AF" />
              <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#9CA3AF" />
              <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Delay Dispatch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <h4 className="text-sm font-medium">Order to Manifest</h4>
              <span className="text-sm text-blue-400">7.44K Orders</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {delayData.map((item) => (
                <div key={item.days} className="space-y-2">
                  <div className="text-gray-400">{item.days}</div>
                  <div className="font-medium">{(item.manifest / 1000).toFixed(2)}K</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <h4 className="text-sm font-medium">Manifest to Pickup</h4>
              <span className="text-sm text-blue-400">7.40K Orders</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {delayData.map((item) => (
                <div key={item.days} className="space-y-2">
                  <div className="text-gray-400">{item.days}</div>
                  <div className="font-medium">{(item.pickup / 1000).toFixed(2)}K</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Not Dispatched Summary</CardTitle>
          <span className="text-sm text-blue-400">584 Orders</span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-900 p-2">
                <MapPin className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">584</div>
                <div className="text-sm text-gray-400">Incorrect Address</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gray-700 p-2">
                <Copy className="h-4 w-4 text-gray-400" />
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-400">Duplicate Order</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

