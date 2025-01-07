"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Check, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSession } from "next-auth/react"
import { gql, useMutation } from '@apollo/client'

const UPDATE_SELLER_REMITTANCE = gql`
  mutation UpdateSellerRemittance($userId: String!, $input: SellerRemittanceInput!) {
    updateSellerRemittance(userId: $userId, sellerRemittance: $input) {
      userId
      bankAccountNumber
      ifscCode
      accountType
      beneficiaryName
      earlyRemittanceEnabled
      postpaidPlanEnabled
    }
  }
`;

export default function SellerRemittancePage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("bank")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    bankAccountNumber: '',
    ifscCode: '',
    accountType: '',
    beneficiaryName: '',
    earlyRemittanceEnabled: false,
    postpaidPlanEnabled: false
  })

  const [updateSellerRemittance] = useMutation(UPDATE_SELLER_REMITTANCE)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, accountType: value })
  }

  const handleSubmit = async () => {
    setShowSuccess(false)
    setShowError(false)
    setErrorMessage("")

    const requiredFields = ['bankAccountNumber', 'ifscCode', 'accountType', 'beneficiaryName']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      setShowError(true)
      setErrorMessage(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    try {
      await updateSellerRemittance({
        variables: {
          userId: session?.user?.id,
          input: formData
        }
      })

      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

    } catch (error) {
      console.error('Error updating seller remittance:', error)
      setShowError(true)
      setErrorMessage('Failed to update seller remittance. Please try again.')
    }
  }

  return (
    <div className={`space-y-6 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Seller Remittance</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your remittance details and preferences.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className={isDark ? "bg-gray-800" : "bg-white"}>
          <TabsTrigger value="bank" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Bank Details</TabsTrigger>
          <TabsTrigger value="cod" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Early COD Remittance</TabsTrigger>
          <TabsTrigger value="postpaid" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Postpaid Plan</TabsTrigger>
        </TabsList>

        <TabsContent value="bank">
          <Card className={isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}>
            <CardHeader>
              <CardTitle className={isDark ? "text-gray-200" : "text-gray-800"}>Bank Details</CardTitle>
              <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>Add bank account details for COD remittance.</CardDescription>
            </CardHeader>
            <CardContent>
              {showSuccess && (
                <Alert className={`mb-6 ${isDark ? 'border-green-800 bg-green-900/50 text-green-400' : 'border-green-200 bg-green-100 text-green-800'}`}>
                  <Check className="h-4 w-4" />
                  <AlertDescription>Seller remittance details updated successfully!</AlertDescription>
                </Alert>
              )}

              {showError && (
                <Alert className={`mb-6 ${isDark ? 'border-red-800 bg-red-900/50 text-red-400' : 'border-red-200 bg-red-100 text-red-800'}`}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="bankAccountNumber" className={isDark ? "text-gray-200" : "text-gray-800"}>Account Number</Label>
                    <Input 
                      id="bankAccountNumber" 
                      type="text" 
                      placeholder="Enter account number" 
                      className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                      value={formData.bankAccountNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ifscCode" className={isDark ? "text-gray-200" : "text-gray-800"}>IFSC Code</Label>
                    <Input 
                      id="ifscCode" 
                      type="text" 
                      placeholder="Enter IFSC code" 
                      className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                      value={formData.ifscCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accountType" className={isDark ? "text-gray-200" : "text-gray-800"}>Account Type</Label>
                    <Select onValueChange={handleSelectChange}>
                      <SelectTrigger className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="current">Current</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="beneficiaryName" className={isDark ? "text-gray-200" : "text-gray-800"}>Beneficiary Name</Label>
                    <Input 
                      id="beneficiaryName" 
                      type="text" 
                      placeholder="Enter beneficiary name" 
                      className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                      value={formData.beneficiaryName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSubmit}>Save Bank Details</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other TabsContent components for Early COD Remittance and Postpaid Plan here */}
        
      </Tabs>
    </div>
  )
}

