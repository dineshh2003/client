"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SellerRemittancePage() {
  const [activeTab, setActiveTab] = useState("bank")

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200">Seller Remittance</h3>
        <p className="text-sm text-gray-400">Manage your remittance details and preferences.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="bank" className="data-[state=active]:bg-gray-700">Bank Details</TabsTrigger>
          <TabsTrigger value="cod" className="data-[state=active]:bg-gray-700">Early COD Remittance</TabsTrigger>
          <TabsTrigger value="postpaid" className="data-[state=active]:bg-gray-700">Postpaid Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="bank">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Bank Details</CardTitle>
              <CardDescription className="text-gray-400">Add bank account details for COD remittance.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="accountNumber" className="text-gray-200">Account Number</Label>
                    <Input id="accountNumber" type="text" placeholder="Enter account number" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ifsc" className="text-gray-200">IFSC Code</Label>
                    <Input id="ifsc" type="text" placeholder="Enter IFSC code" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accountType" className="text-gray-200">Account Type</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="current">Current</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bankName" className="text-gray-200">Bank Name</Label>
                    <Input id="bankName" type="text" placeholder="Enter bank name" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Bank Details</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cod">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Early COD Remittance</CardTitle>
              <CardDescription className="text-gray-400">Set up early COD remittance preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="remittancePlan" className="text-gray-200">Remittance Plan</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue placeholder="Select remittance plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2days">2 Days</SelectItem>
                        <SelectItem value="3days">3 Days</SelectItem>
                        <SelectItem value="4days">4 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Remittance Plan</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="postpaid">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-gray-200">Postpaid Plan</CardTitle>
              <CardDescription className="text-gray-400">Set up your postpaid plan for shipping credits.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="postpaidPlan" className="text-gray-200">Postpaid Plan</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                        <SelectValue placeholder="Select postpaid plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="creditLimit" className="text-gray-200">Credit Limit</Label>
                    <Input id="creditLimit" type="number" placeholder="Enter credit limit" className="bg-gray-800 border-gray-700 text-gray-200" />
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Save Postpaid Plan</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

