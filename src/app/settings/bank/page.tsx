"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Check, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useSession } from "next-auth/react"
import { gql, useMutation } from '@apollo/client'

const ADD_BANK_ACCOUNT = gql`
  mutation AddBankAccount($userId: String!, $input: BankAccountInput!) {
    addBankAccount(userId: $userId, bankAccount: $input) {
      userId
      accountNumber
      accountType
      branchName
      beneficiaryName
      ifscCode
      bankName
    }
  }
`;

export default function BankDetailsPage() {
  const { data: session } = useSession()
  const [isVerified, setIsVerified] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    accountNumber: '',
    confirmAccount: '',
    accountType: '',
    beneficiaryName: '',
    ifscCode: '',
    bankName: '',
    branchName: ''
  })

  const [addBankAccount] = useMutation(ADD_BANK_ACCOUNT)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, accountType: value })
  }

  const handleSubmit = async () => {
    // Reset states
    setShowSuccess(false)
    setShowError(false)
    setErrorMessage("")

    // Validate account numbers match
    if (formData.accountNumber !== formData.confirmAccount) {
      setShowError(true)
      setErrorMessage("Account numbers don't match!")
      return
    }

    // Validate all fields are filled
    const requiredFields = ['accountNumber', 'accountType', 'beneficiaryName', 'ifscCode', 'bankName', 'branchName']
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData])
    
    if (missingFields.length > 0) {
      setShowError(true)
      setErrorMessage(`Please fill in all required fields: ${missingFields.join(', ')}`)
      return
    }

    try {
      const input = {
        accountNumber: formData.accountNumber,
        accountType: formData.accountType,
        beneficiaryName: formData.beneficiaryName,
        ifscCode: formData.ifscCode,
        bankName: formData.bankName,
        branchName: formData.branchName
      }

      await addBankAccount({
        variables: {
          userId: session?.user?.id,
          input
        }
      })

      setIsVerified(true)
      setShowSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)

    } catch (error) {
      console.error('Error adding bank account:', error)
      setShowError(true)
      setErrorMessage('Failed to add bank account. Please try again.')
    }
  }

  return (
    <div className={`space-y-6 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div>
        <h3 className={`text-lg font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Bank Details</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Add bank account details where you want your COD to be remitted.</p>
      </div>

      <Card className={isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}>
        <CardContent className="pt-6">
          {isVerified && (
            <Alert className={`mb-6 ${isDark ? 'border-green-800 bg-green-900/50 text-green-400' : 'border-green-200 bg-green-100 text-green-800'}`}>
              <Check className="h-4 w-4" />
              <AlertDescription>Congrats! Your Bank details have been verified.</AlertDescription>
            </Alert>
          )}

          {showSuccess && (
            <Alert className={`mb-6 ${isDark ? 'border-green-800 bg-green-900/50 text-green-400' : 'border-green-200 bg-green-100 text-green-800'}`}>
              <Check className="h-4 w-4" />
              <AlertDescription>Bank account added successfully!</AlertDescription>
            </Alert>
          )}

          {showError && (
            <Alert className={`mb-6 ${isDark ? 'border-red-800 bg-red-900/50 text-red-400' : 'border-red-200 bg-red-100 text-red-800'}`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="accountNumber" className={isDark ? "text-gray-200" : "text-gray-800"}>Account Number</Label>
              <Input
                id="accountNumber"
                type="password"
                placeholder="Enter account number"
                className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmAccount" className={isDark ? "text-gray-200" : "text-gray-800"}>Confirm Account Number</Label>
              <Input
                id="confirmAccount"
                placeholder="Confirm account number"
                className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                value={formData.confirmAccount}
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
                  <SelectItem value="Savings">Savings Account</SelectItem>
                  <SelectItem value="Current">Current Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="beneficiaryName" className={isDark ? "text-gray-200" : "text-gray-800"}>Beneficiary Name</Label>
              <Input
                id="beneficiaryName"
                placeholder="Enter beneficiary name"
                className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                value={formData.beneficiaryName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ifscCode" className={isDark ? "text-gray-200" : "text-gray-800"}>IFSC Code</Label>
              <Input
                id="ifscCode"
                placeholder="Enter IFSC code"
                className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bankName" className={isDark ? "text-gray-200" : "text-gray-800"}>Bank Name</Label>
              <Input
                id="bankName"
                placeholder="Enter bank name"
                className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div className="sm:col-span-2 grid gap-2">
              <Label htmlFor="branchName" className={isDark ? "text-gray-200" : "text-gray-800"}>Branch Name</Label>
              <Input
                id="branchName"
                placeholder="Enter branch name"
                className={isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-gray-100 border-gray-300 text-gray-800"}
                value={formData.branchName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

