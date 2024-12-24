"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function ValueAddedServicesPage() {
  const [activeTab, setActiveTab] = useState("rto")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200">Value Added Services</h3>
        <p className="text-sm text-gray-400">Manage additional services to enhance your shipping experience.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="rto" className="data-[state=active]:bg-gray-700">RTO Score</TabsTrigger>
          <TabsTrigger value="secure" className="data-[state=active]:bg-gray-700">Auto-Secure Shipments</TabsTrigger>
          <TabsTrigger value="boost" className="data-[state=active]:bg-gray-700">Delivery Boost</TabsTrigger>
        </TabsList>

        <TabsContent value="rto">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">RTO Score</CardTitle>
              <CardDescription className="text-gray-400">Enable RTO Score to improve your Delivery Success Rate and reduce RTO risk.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rto-score" className="text-gray-200">Enable RTO Score</Label>
                  <Switch id="rto-score" />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save RTO Score Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secure">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Auto-Secure Shipments</CardTitle>
              <CardDescription className="text-gray-400">Automatically secure all shipments above Rs 5,000 without any additional cost.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-secure" className="text-gray-200">Enable Auto-Secure Shipments</Label>
                  <Switch id="auto-secure" />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Auto-Secure Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="boost">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Delivery Boost</CardTitle>
              <CardDescription className="text-gray-400">Smart AI powered engine to increase your delivery conversion.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="delivery-boost" className="text-gray-200">Enable Delivery Boost</Label>
                  <Switch id="delivery-boost" />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Delivery Boost Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

