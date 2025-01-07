"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Copy } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

const orderData = [
  { week: "Week 1", orders: 420 },
  { week: "Week 2", orders: 350 },
  { week: "Week 3", orders: 470 },
  { week: "Week 4", orders: 380 },
];

interface AnalyticsProps {
  theme?: string;
}

export default function Analytics({ theme }: AnalyticsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className={cn(
        "transition-all duration-300",
        theme === "dark"
          ? "bg-[#111827] border-gray-800"
          : "bg-white border-gray-200"
      )}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className={cn(
            "text-lg font-medium",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Last 30 Days Orders
          </CardTitle>
          <span className={theme === "dark" ? "text-[#42C195]" : "text-[#2C7A7B]"}>
            4.30K
          </span>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer height={200}>
            <BarChart data={orderData}>
              <XAxis 
                dataKey="week" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                stroke={theme === "dark" ? "#9CA3AF" : "#4B5563"} 
              />
              <YAxis 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                stroke={theme === "dark" ? "#9CA3AF" : "#4B5563"} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: theme === "dark" ? '#1e293b' : '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: theme === "dark" ? '#fff' : '#000' }}
              />
              <Bar 
                dataKey="orders" 
                fill={theme === "dark" ? "#42C195" : "#2C7A7B"} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className={cn(
        "transition-all duration-300",
        theme === "dark"
          ? "bg-[#111827] border-gray-800"
          : "bg-white border-gray-200"
      )}>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className={cn(
            "text-lg font-medium",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Top Delivery Locations
          </CardTitle>
          <Copy className={theme === "dark" ? "text-[#42C195]" : "text-[#2C7A7B]"} />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { location: "Mumbai, Maharashtra", count: 1234 },
              { location: "Delhi, NCR", count: 856 },
              { location: "Bangalore, Karnataka", count: 743 },
            ].map((item) => (
              <div key={item.location} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className={theme === "dark" ? "text-[#42C195]" : "text-[#2C7A7B]"} />
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    {item.location}
                  </span>
                </div>
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

