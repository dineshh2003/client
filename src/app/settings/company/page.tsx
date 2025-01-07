"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Check, AlertTriangle, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSession } from "next-auth/react"
import { gql, useMutation } from '@apollo/client'

const UPDATE_COMPANY_DETAILS = gql`
  mutation UpdateCompanyDetails($userId: String!, $input: CompanyDetailsInput!) {
    updateCompanyDetails(userId: $userId, companyDetails: $input) {
      userId
      companyName
      brandName
      email
      logo
      address
      gstin
      pan
    }
  }
`;

export default function CompanySetupPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("details")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    companyName: '',
    brandName: '',
    email: '',
    logo: null as File | null,
    address: '',
    gstin: '',
    pan: ''
  })

  const [updateCompanyDetails] = useMutation(UPDATE_COMPANY_DETAILS)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, logo: e.target.files[0] })
    }
  }

  const handleSubmit = async () => {
    setShowSuccess(false)
    setShowError(false)
    setErrorMessage("")

    const requiredFields = ['companyName', 'brandName', 'email', 'address', 'gstin', 'pan']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      setShowError(true)
      setErrorMessage(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    try {
      const input = {
        ...formData,
        logo: formData.logo ? await fileToBase64(formData.logo) : null
      }

      await updateCompanyDetails({
        variables: {
          userId: session?.user?.id,
          input
        }
      })

      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

    } catch (error) {
      console.error('Error updating company details:', error)
      setShowError(true)
      setErrorMessage('Failed to update company details. Please try again.')
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  return (
    <div className={`space-y-6 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Company Setup</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage your company details and related information.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className={isDark ? "bg-gray-800" : "bg-white"}>
          <TabsTrigger value="details" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Company Details</TabsTrigger>
          <TabsTrigger value="kyc" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Domestic KYC</TabsTrigger>
          <TabsTrigger value="pickup" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Pickup Addresses</TabsTrigger>
          <TabsTrigger value="billing" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Billing & GSTIN</TabsTrigger>
          <TabsTrigger value="labels" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Labels</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className={isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}>
            <CardHeader>
              <CardTitle className={isDark ? "text-gray-200" : "text-gray-800"}>Company Details</CardTitle>
              <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>Manage your company's basic information.</CardDescription>
            </CardHeader>
            <CardContent>
              {showSuccess && (
                <Alert className={`mb-6 ${isDark ? 'border-green-800 bg-green-900/50 text-green-400' : 'border-green-200 bg-green-100 text-green-800'}`}>
                  <Check className="h-4 w-4" />
                  <AlertDescription>Company details updated successfully!</AlertDescription>
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
                    <Label htmlFor="companyName" className={isDark ? "text-gray-200" : "text-gray-800"}>Company Name</Label>
                    <Input 
                      id="companyName" 
                      placeholder="Enter company name" 
                      className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="brandName" className={isDark ? "text-gray-200" : "text-gray-800"}>Brand Name</Label>
                    <Input 
                      id="brandName" 
                      placeholder="Enter brand name" 
                      className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                      value={formData.brandName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className={isDark ? "text-gray-200" : "text-gray-800"}>Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter email" 
                      className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="logo" className={isDark ? "text-gray-200" : "text-gray-800"}>Company Logo</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="logo"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={isDark ? "text-gray-200" : "text-gray-800"}
                        onClick={() => document.getElementById('logo')?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                      {formData.logo && <span className="text-sm">{formData.logo.name}</span>}
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address" className={isDark ? "text-gray-200" : "text-gray-800"}>Address</Label>
                  <Textarea 
                    id="address" 
                    placeholder="Enter company address" 
                    className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="gstin" className={isDark ? "text-gray-200" : "text-gray-800"}>GSTIN</Label>
                    <Input 
                      id="gstin" 
                      placeholder="Enter GSTIN" 
                      className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                      value={formData.gstin}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="pan" className={isDark ? "text-gray-200" : "text-gray-800"}>PAN</Label>
                    <Input 
                      id="pan" 
                      placeholder="Enter PAN" 
                      className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                      value={formData.pan}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSubmit}>Save Company Details</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other TabsContent components for KYC, Pickup Addresses, Billing & GSTIN, and Labels here */}
        
      </Tabs>
    </div>
  )
}
