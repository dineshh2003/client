"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from 'lucide-react'

export default function CompanySetupPage() {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200">Company Setup</h3>
        <p className="text-sm text-gray-400">Manage your company details and related information.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="details" className="data-[state=active]:bg-gray-700">Company Details</TabsTrigger>
          <TabsTrigger value="kyc" className="data-[state=active]:bg-gray-700">Domestic KYC</TabsTrigger>
          <TabsTrigger value="pickup" className="data-[state=active]:bg-gray-700">Pickup Addresses</TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-gray-700">Billing & GSTIN</TabsTrigger>
          <TabsTrigger value="labels" className="data-[state=active]:bg-gray-700">Labels</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Company Details</CardTitle>
              <CardDescription className="text-gray-400">Manage your company's basic information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="companyName" className="text-gray-200">Company Name</Label>
                    <Input id="companyName" placeholder="Enter company name" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="brandName" className="text-gray-200">Brand Name</Label>
                    <Input id="brandName" placeholder="Enter brand name" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-gray-200">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="logo" className="text-gray-200">Company Logo</Label>
                    <Input id="logo" type="file" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Company Details</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyc">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Domestic KYC</CardTitle>
              <CardDescription className="text-gray-400">Submit KYC information for uninterrupted shipping.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="panCard" className="text-gray-200">PAN Card</Label>
                    <Input id="panCard" type="file" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gstCertificate" className="text-gray-200">GST Certificate</Label>
                    <Input id="gstCertificate" type="file" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Submit KYC Documents</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pickup">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Pickup Addresses</CardTitle>
              <CardDescription className="text-gray-400">Manage all your pickup addresses here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="addressName" className="text-gray-200">Address Name</Label>
                    <Input id="addressName" placeholder="E.g., Warehouse, Office" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fullAddress" className="text-gray-200">Full Address</Label>
                    <Textarea id="fullAddress" placeholder="Enter full address" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="city" className="text-gray-200">City</Label>
                      <Input id="city" placeholder="Enter city" className="bg-gray-800 border-gray-700 text-gray-200" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="pincode" className="text-gray-200">Pincode</Label>
                      <Input id="pincode" placeholder="Enter pincode" className="bg-gray-800 border-gray-700 text-gray-200" />
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Add Pickup Address</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Billing, Invoice, & GSTIN</CardTitle>
              <CardDescription className="text-gray-400">Manage your billing information and GSTIN details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="billingAddress" className="text-gray-200">Billing Address</Label>
                    <Textarea id="billingAddress" placeholder="Enter billing address" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="gstin" className="text-gray-200">GSTIN</Label>
                    <Input id="gstin" placeholder="Enter GSTIN" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Billing Information</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labels">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Labels</CardTitle>
              <CardDescription className="text-gray-400">Choose the suitable label format for your company.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="a4" name="labelFormat" className="text-purple-600 focus:ring-purple-500" />
                    <Label htmlFor="a4" className="text-gray-200">A4 Format</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="thermal" name="labelFormat" className="text-purple-600 focus:ring-purple-500" />
                    <Label htmlFor="thermal" className="text-gray-200">Thermal Format</Label>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Label Preference</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

