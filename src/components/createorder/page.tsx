"use client"

import * as React from "react"
import { Check, ChevronDown, Home, MapPin, Plus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Appbar } from "@/components/Appbar"

export default function CreateOrderComponent() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const totalSteps = 6

  const logistics = [
    { name: "Xpressbees", rating: 3.6, price: 0, logo: "X", bestMatch: true },
    { name: "Ecom Express", rating: 4.4, price: 0, logo: "E" },
    { name: "Delhivery", rating: 4.1, price: 0, logo: "D" },
    { name: "BlueDart", rating: 4.0, price: 0, logo: "B" },
  ]

  return (
    <div className="min-h-screen w-[90vw] bg-zinc-950 p-4 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
            <MapPin className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-semibold">Create Order</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {/* Shipping Address Section */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 text-sm font-medium text-emerald-500">
                    1
                  </div>
                  <h2 className="text-xl font-semibold">Where are you sending to?</h2>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="pincode">Pincode<span className="text-red-500">*</span></Label>
                      <Input
                        id="pincode"
                        placeholder="Enter PIN Code"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State<span className="text-red-500">*</span></Label>
                      <Select>
                        <SelectTrigger className="mt-1.5 bg-zinc-800">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="city">City<span className="text-red-500">*</span></Label>
                      <Select>
                        <SelectTrigger className="mt-1.5 bg-zinc-800">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-delhi">New Delhi</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="name">Name<span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        placeholder="Enter Name"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Enter Company Name"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter Email"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="mobile">Mobile Number<span className="text-red-500">*</span></Label>
                      <div className="mt-1.5 flex">
                        <div className="flex items-center gap-1 rounded-l-md border border-r-0 border-zinc-700 bg-zinc-800 px-3">
                          <span className="text-sm">🇮🇳</span>
                          <span className="text-sm">+91</span>
                        </div>
                        <Input
                          id="mobile"
                          placeholder="Enter Mobile Number"
                          className="rounded-l-none bg-zinc-800"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="alternate-mobile">Alternate Number</Label>
                      <div className="mt-1.5 flex">
                        <div className="flex items-center gap-1 rounded-l-md border border-r-0 border-zinc-700 bg-zinc-800 px-3">
                          <span className="text-sm">🇮🇳</span>
                          <span className="text-sm">+91</span>
                        </div>
                        <Input
                          id="alternate-mobile"
                          placeholder="Enter Mobile Number"
                          className="rounded-l-none bg-zinc-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address1">Address line 1<span className="text-red-500">*</span></Label>
                    <Input
                      id="address1"
                      placeholder="Enter Address line 1"
                      className="mt-1.5 bg-zinc-800"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address2">Address line 2</Label>
                    <Input
                      id="address2"
                      placeholder="Enter Address line 2"
                      className="mt-1.5 bg-zinc-800"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox id="billing-same" />
                    <label
                      htmlFor="billing-same"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Billing address same as delivery address
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Details Section */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 text-sm font-medium text-emerald-500">
                    2
                  </div>
                  <h2 className="text-xl font-semibold">Order Details</h2>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="order-id">Order ID<span className="text-red-500">*</span></Label>
                      <Input
                        id="order-id"
                        defaultValue="1733532061"
                        readOnly
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sub-order">Sub Order Number</Label>
                      <Input
                        id="sub-order"
                        placeholder="Enter Sub Order Number"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="order-date">Order Date</Label>
                      <Input
                        id="order-date"
                        type="date"
                        defaultValue="2024-07-12"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pickup-type">Pickup Type<span className="text-red-500">*</span></Label>
                    <Select defaultValue="forward">
                      <SelectTrigger className="mt-1.5 bg-zinc-800">
                        <SelectValue placeholder="Select Pickup Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forward">Forward</SelectItem>
                        <SelectItem value="reverse">Reverse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details Section */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 text-sm font-medium text-emerald-500">
                    3
                  </div>
                  <h2 className="text-xl font-semibold">Product Details</h2>
                </div>

                <div className="space-y-6">
                  <div className="rounded-lg border border-zinc-800 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-medium">#1</span>
                    </div>

                    <div className="grid gap-6">
                      <div className="grid gap-4 sm:grid-cols-4">
                        <div className="sm:col-span-2">
                          <Label htmlFor="product-name">Product Name<span className="text-red-500">*</span></Label>
                          <Input
                            id="product-name"
                            placeholder="Enter Product Name"
                            className="mt-1.5 bg-zinc-800"
                          />
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity<span className="text-red-500">*</span></Label>
                          <Input
                            id="quantity"
                            type="number"
                            placeholder="Add Qty"
                            className="mt-1.5 bg-zinc-800"
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Product Price<span className="text-red-500">*</span></Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="Enter Product Price"
                            className="mt-1.5 bg-zinc-800"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor="sku">SKU</Label>
                          <Input
                            id="sku"
                            placeholder="Enter SKU"
                            className="mt-1.5 bg-zinc-800"
                          />
                        </div>
                        <div>
                          <Label htmlFor="tax">Tax Rate (Optional)</Label>
                          <Input
                            id="tax"
                            type="number"
                            placeholder="Enter Tax Rate"
                            className="mt-1.5 bg-zinc-800"
                          />
                        </div>
                        <div>
                          <Label htmlFor="hsn">HSN Code</Label>
                          <Input
                            id="hsn"
                            placeholder="Enter HSN Code"
                            className="mt-1.5 bg-zinc-800"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Another
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 text-sm font-medium text-emerald-500">
                    4
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">Payment</h2>
                  </div>
                </div>

                <div className="space-y-6">
                  <RadioGroup defaultValue="prepaid" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">COD</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prepaid" id="prepaid" />
                      <Label htmlFor="prepaid">Prepaid</Label>
                    </div>
                  </RadioGroup>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="shipping" />
                      <Label htmlFor="shipping">Shipping</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="giftwrap" />
                      <Label htmlFor="giftwrap">Giftwrap</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="transaction" />
                      <Label htmlFor="transaction">Transaction</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="discount" />
                      <Label htmlFor="discount">Discount</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="first-attempt" />
                      <Label htmlFor="first-attempt">First Attempt Discount</Label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-4">
                        <span className="text-sm text-zinc-400">Sub Total</span>
                        <span className="font-medium">₹0.00</span>
                      </div>
                      <div className="mt-1 flex items-center justify-end gap-4">
                        <span className="text-sm text-zinc-400">Total (Prepaid)</span>
                        <span className="font-medium">₹0.00 (Prepaid)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parcel Size Section */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 text-sm font-medium text-emerald-500">
                    5
                  </div>
                  <h2 className="text-xl font-semibold">Parcel Size</h2>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="length">Length (cms)<span className="text-red-500">*</span></Label>
                      <Input
                        id="length"
                        type="number"
                        placeholder="Enter Length (cms)"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="width">Width (cms)<span className="text-red-500">*</span></Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="Enter Width (cms)"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (cms)<span className="text-red-500">*</span></Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="Enter Height (cms)"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="weight">Physical Weight (kg)<span className="text-red-500">*</span></Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Enter Physical Weight (kg)"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div className="flex items-end">
                      <span className="text-sm text-zinc-400">Volumetric wt: 0.000 kg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Details Section */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 text-sm font-medium text-emerald-500">
                    6
                  </div>
                  <h2 className="text-xl font-semibold">Other Details</h2>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="reseller">Reseller Name (Optional)</Label>
                      <Input
                        id="reseller"
                        placeholder="Enter Reseller Name"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="alt-number">Alternate Number (Optional)</Label>
                      <div className="mt-1.5 flex">
                        <div className="flex items-center gap-1 rounded-l-md border border-r-0 border-zinc-700 bg-zinc-800 px-3">
                          <span className="text-sm">🇮🇳</span>
                          <span className="text-sm">+91</span>
                        </div>
                        <Input
                          id="alt-number"
                          placeholder="Enter"
                          className="rounded-l-none bg-zinc-800"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="eway">Eway Bill Number (Optional)</Label>
                      <Input
                        id="eway"
                        placeholder="Enter Eway Bill Number"
                        className="mt-1.5 bg-zinc-800"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gstin">GSTIN Number (Optional)</Label>
                    <Input
                      id="gstin"
                      placeholder="Enter GSTIN Number"
                      className="mt-1.5 bg-zinc-800"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warehouse Section */}
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">Warehouse Address</h2>
                  </div>
                  <Button variant="outline" className="gap-2">
                    Add Address
                  </Button>
                </div>

                <div className="rounded-lg border border-zinc-800 p-4">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-700">
                      <Home className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium">shalu singhal</div>
                      <div className="mt-1 text-sm text-zinc-400">
                        sc 115 shastri nagar ghaziabad Ghaziabad uttar pradesh 201002
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="link" className="mt-4 h-auto p-0 text-blue-500">
                  Change Address
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="h-[300px] overflow-hidden rounded-lg border border-zinc-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.6743466881367!2d77.43681007538776!3d28.642052175665705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee22c60837b7%3A0x7c35343eceb7bde2!2sShastri%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201002!5e0!3m2!1sen!2sin!4v1704634110112!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Logistics</h3>
                  <Select defaultValue="fast">
                    <SelectTrigger className="w-[160px] bg-zinc-800">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fast">Fast shipping</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  {logistics.map((item) => (
                    <div
                      key={item.name}
                      className={cn(
                        "flex items-center justify-between rounded-lg border border-zinc-800 p-4",
                        item.bestMatch && "border-emerald-500/50 bg-emerald-500/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 font-medium">
                          {item.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.name}</span>
                            {item.bestMatch && (
                              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-500">
                                Best Matched
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1">
                            <span className="text-sm text-yellow-500">★</span>
                            <span className="text-sm text-zinc-400">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium">₹{item.price}</div>
                        </div>
                        <div
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-full border-2",
                            item.bestMatch
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-zinc-700"
                          )}
                        >
                          {item.bestMatch && <Check className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between border-t border-zinc-800 pt-4">
                  <span className="font-medium">Total (Incl. GST)</span>
                  <span className="font-medium">₹0.00</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


