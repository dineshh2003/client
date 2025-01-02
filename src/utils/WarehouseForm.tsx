'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSession } from "next-auth/react"
import { useMutation, gql } from '@apollo/client';
import { useState } from "react"

interface WarehouseFormProps {
  onClose: () => void;
  open: boolean;
}


const ADD_WAREHOUSE = gql`
  mutation AddWareHouse($userID: String!, $input: WareHouseInput!) {
    addWareHouse(userId: $userID, warehouse: $input) {
      id userId contactPerson contactNumber emailAddress 
      completeAddress landmark pincode city state country
    }
  }
`;



export default function WarehouseForm({ onClose, open }: WarehouseFormProps) {
  if (!open) return null;

  const { data: session } = useSession();
  const userId = session?.user.id;
  const [formData, setFormData] = useState({
    contactPerson: '',
    contactNumber: '',
    emailAddress: '',
    completeAddress: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    country: ''
  });

  const [addWarehouse] = useMutation(ADD_WAREHOUSE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const input = {
        ...formData,
        landmark: formData.landmark || null // Make landmark optional
      };
  
      await addWarehouse({
        variables: {
          userID: session?.user.id,
          input
        }
      });
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-[80vw] h-[80vh] max-w-3xl dark border border-purple-500/20 shadow-lg shadow-purple-500/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-purple-500/20">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Add New Pick Up Address</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 space-y-6 overflow-y-auto">
          <div className="space-y-4">
            {/* Radio group section remains the same */}
            <div>
              <Label>Tag this address as</Label>
              <RadioGroup defaultValue="home" className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center space-x-2 bg-purple-500/10 px-4 py-2 rounded-full">
                  <RadioGroupItem value="home" id="home" className="border-purple-500" />
                  <Label htmlFor="home">Home</Label>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full">
                  <RadioGroupItem value="work" id="work" className="border-blue-500" />
                  <Label htmlFor="work">Work</Label>
                </div>
                <div className="flex items-center space-x-2 bg-violet-500/10 px-4 py-2 rounded-full">
                  <RadioGroupItem value="warehouse" id="warehouse" className="border-violet-500" />
                  <Label htmlFor="warehouse">Warehouse</Label>
                </div>
                <div className="flex items-center space-x-2 bg-indigo-500/10 px-4 py-2 rounded-full">
                  <RadioGroupItem value="other" id="other" className="border-indigo-500" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Contact information for this location</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    placeholder="Name of the person to be contacted"
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-number">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    placeholder="Enter 10 digit mobile number"
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    placeholder="i.e acd@gmail.com"
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Address section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Address Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complete-address">Complete address</Label>
                  <Input
                    id="completeAddress"
                    placeholder="House/Floor No., Building Name or Street, Locality"
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                    value={formData.completeAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input
                    id="landmark"
                    placeholder="Any nearby post office, market, Hospital"
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all"
                    value={formData.landmark}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input 
                    id="pincode" 
                    placeholder="Add Pincode" 
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all" 
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    placeholder="City" 
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all" 
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    placeholder="State" 
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all" 
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    placeholder="India" 
                    className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20 transition-all" 
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose} className="border-purple-500/20 hover:bg-purple-500/10">
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" onClick={handleSubmit}>
              Verify and Save Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}