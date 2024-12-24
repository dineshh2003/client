"use client"

import { useState } from "react"
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BankDetailsPage() {
  const [isVerified] = useState(true)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-200">Bank Details</h3>
        <p className="text-sm text-gray-400">Add bank account details where you want your COD to be remitted.</p>
      </div>

      <Card className="border-gray-800 bg-gray-900">
        <CardContent className="pt-6">
          {isVerified && (
            <Alert className="mb-6 border-green-800 bg-green-900/50 text-green-400">
              <Check className="h-4 w-4" />
              <AlertDescription>Congrats ! Your Bank details have been verified.</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="accountNumber" className="text-gray-200">Account Number</Label>
              <Input
                id="accountNumber"
                type="password"
                placeholder="Enter account number"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmAccount" className="text-gray-200">Confirm Account Number</Label>
              <Input
                id="confirmAccount"
                placeholder="Confirm account number"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountType" className="text-gray-200">Account Type</Label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="savings">Savings Account</SelectItem>
                  <SelectItem value="current">Current Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="beneficiaryName" className="text-gray-200">Beneficiary Name</Label>
              <Input
                id="beneficiaryName"
                placeholder="Enter beneficiary name"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ifsc" className="text-gray-200">IFSC Code</Label>
              <Input
                id="ifsc"
                placeholder="Enter IFSC code"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bankName" className="text-gray-200">Bank Name</Label>
              <Input
                id="bankName"
                placeholder="Enter bank name"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
            </div>
            <div className="sm:col-span-2 grid gap-2">
              <Label htmlFor="branchName" className="text-gray-200">Branch Name</Label>
              <Input
                id="branchName"
                placeholder="Enter branch name"
                className="bg-gray-800 border-gray-700 text-gray-200"
              />
            </div>
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4">
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

