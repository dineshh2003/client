"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Check, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSession } from "next-auth/react"
import { gql, useMutation } from '@apollo/client'

const UPDATE_VALUE_ADDED_SERVICES = gql`
  mutation UpdateValueAddedServices($userId: String!, $input: ValueAddedServicesInput!) {
    updateValueAddedServices(userId: $userId, valueAddedServices: $input) {
      userId
      rtoScoreEnabled
      autoSecureShipmentsEnabled
      deliveryBoostEnabled
    }
  }
`;

export default function ValueAddedServicesPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("rto")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    rtoScoreEnabled: false,
    autoSecureShipmentsEnabled: false,
    deliveryBoostEnabled: false
  })

  const [updateValueAddedServices] = useMutation(UPDATE_VALUE_ADDED_SERVICES)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleSwitchChange = (id: string) => {
    setFormData({ ...formData, [id]: !formData[id as keyof typeof formData] })
  }

  const handleSubmit = async () => {
    setShowSuccess(false)
    setShowError(false)
    setErrorMessage("")

    try {
      await updateValueAddedServices({
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
      console.error('Error updating value added services:', error)
      setShowError(true)
      setErrorMessage('Failed to update value added services. Please try again.')
    }
  }

  return (
    <div className={`space-y-6 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Value Added Services</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage additional services to enhance your shipping experience.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className={isDark ? "bg-gray-800" : "bg-white"}>
          <TabsTrigger value="rto" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>RTO Score</TabsTrigger>
          <TabsTrigger value="secure" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Auto-Secure Shipments</TabsTrigger>
          <TabsTrigger value="boost" className={`${isDark ? 'data-[state=active]:bg-gray-700' : 'data-[state=active]:bg-gray-200'}`}>Delivery Boost</TabsTrigger>
        </TabsList>

        <TabsContent value="rto">
          <Card className={isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}>
            <CardHeader>
              <CardTitle className={isDark ? "text-gray-200" : "text-gray-800"}>RTO Score</CardTitle>
              <CardDescription className={isDark ? "text-gray-400" : "text-gray-600"}>Enable RTO Score to improve your Delivery Success Rate and reduce RTO risk.</CardDescription>
            </CardHeader>
            <CardContent>
              {showSuccess && (
                <Alert className={`mb-6 ${isDark ? 'border-green-800 bg-green-900/50 text-green-400' : 'border-green-200 bg-green-100 text-green-800'}`}>
                  <Check className="h-4 w-4" />
                  <AlertDescription>Value added services updated successfully!</AlertDescription>
                </Alert>
              )}

              {showError && (
                <Alert className={`mb-6 ${isDark ? 'border-red-800 bg-red-900/50 text-red-400' : 'border-red-200 bg-red-100 text-red-800'}`}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <form className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rto-score" className={isDark ? "text-gray-200" : "text-gray-800"}>Enable RTO Score</Label>
                  <Switch 
                    id="rtoScoreEnabled"
                    checked={formData.rtoScoreEnabled}
                    onCheckedChange={() => handleSwitchChange('rtoScoreEnabled')}
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSubmit}>Save RTO Score Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add other TabsContent components for Auto-Secure Shipments and Delivery Boost here */}
        
      </Tabs>
    </div>
  )
}

