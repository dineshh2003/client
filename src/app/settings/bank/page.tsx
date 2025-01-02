"use client"

import { useState } from "react"
import { Check } from 'lucide-react'
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
  const { data: session } = useSession();
  const [isVerified, setIsVerified] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    accountNumber: '',
    confirmAccount: '',
    accountType: '',
    beneficiaryName: '',
    ifscCode: '',
    bankName: '',
    branchName: ''
  });

  const [addBankAccount] = useMutation(ADD_BANK_ACCOUNT);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, accountType: value });
  };

  const handleSubmit = async () => {
    // Validate account numbers match
    if (formData.accountNumber !== formData.confirmAccount) {
      alert("Account numbers don't match!");
      return;
    }

    // Validate all fields are filled
    const requiredFields = ['accountNumber', 'accountType', 'beneficiaryName', 'ifscCode', 'bankName', 'branchName'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const input = {
        accountNumber: formData.accountNumber,
        accountType: formData.accountType,
        beneficiaryName: formData.beneficiaryName,
        ifscCode: formData.ifscCode,
        bankName: formData.bankName,
        branchName: formData.branchName
      };

      await addBankAccount({
        variables: {
          userId: session?.user?.id,
          input
        }
      });

      setIsVerified(true);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error adding bank account:', error);
      alert('Failed to add bank account. Please try again.');
    }
  };

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
              <AlertDescription>Congrats! Your Bank details have been verified.</AlertDescription>
            </Alert>
          )}

          {showSuccess && (
            <Alert className="mb-6 border-green-800 bg-green-900/50 text-green-400">
              <Check className="h-4 w-4" />
              <AlertDescription>Bank account added successfully!</AlertDescription>
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
                value={formData.accountNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmAccount" className="text-gray-200">Confirm Account Number</Label>
              <Input
                id="confirmAccount"
                placeholder="Confirm account number"
                className="bg-gray-800 border-gray-700 text-gray-200"
                value={formData.confirmAccount}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="accountType" className="text-gray-200">Account Type</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Savings">Savings Account</SelectItem>
                  <SelectItem value="Current">Current Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="beneficiaryName" className="text-gray-200">Beneficiary Name</Label>
              <Input
                id="beneficiaryName"
                placeholder="Enter beneficiary name"
                className="bg-gray-800 border-gray-700 text-gray-200"
                value={formData.beneficiaryName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ifscCode" className="text-gray-200">IFSC Code</Label>
              <Input
                id="ifscCode"
                placeholder="Enter IFSC code"
                className="bg-gray-800 border-gray-700 text-gray-200"
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bankName" className="text-gray-200">Bank Name</Label>
              <Input
                id="bankName"
                placeholder="Enter bank name"
                className="bg-gray-800 border-gray-700 text-gray-200"
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div className="sm:col-span-2 grid gap-2">
              <Label htmlFor="branchName" className="text-gray-200">Branch Name</Label>
              <Input
                id="branchName"
                placeholder="Enter branch name"
                className="bg-gray-800 border-gray-700 text-gray-200"
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