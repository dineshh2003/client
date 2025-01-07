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
import { useTheme } from "next-themes"

export default function CreateOrderComponent() {
  const [currentStep, setCurrentStep] = React.useState(1)
  const totalSteps = 6
  const { theme } = useTheme()

  const logistics = [
    { name: "Xpressbees", rating: 3.6, price: 0, logo: "X", bestMatch: true },
    { name: "Ecom Express", rating: 4.4, price: 0, logo: "E" },
    { name: "Delhivery", rating: 4.1, price: 0, logo: "D" },
    { name: "BlueDart", rating: 4.0, price: 0, logo: "B" },
  ]

  return (
    <div className={cn(
      "min-h-screen w-full p-4 transition-colors duration-300",
      theme === "dark" ? "bg-[#1e293b] text-gray-100" : "bg-gray-100 text-gray-900"
    )}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            theme === "dark" ? "bg-[#42C195]" : "bg-[#2C7A7B]"
          )}>
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-semibold">Create Order</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {/* Shipping Address Section */}
            <Card className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"
            )}>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    theme === "dark" ? "border-[#42C195] text-[#42C195]" : "border-[#2C7A7B] text-[#2C7A7B]"
                  )}>
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
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State<span className="text-red-500">*</span></Label>
                      <Select>
                        <SelectTrigger className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}>
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
                        <SelectTrigger className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}>
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
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Enter Company Name"
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter Email"
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="mobile">Mobile Number<span className="text-red-500">*</span></Label>
                      <div className="mt-1.5 flex">
                        <div className={cn(
                          "flex items-center gap-1 rounded-l-md border border-r-0 px-3",
                          theme === "dark" ? "border-gray-700 bg-[#1e293b]" : "border-gray-300 bg-gray-100"
                        )}>
                          <span className="text-sm">🇮🇳</span>
                          <span className="text-sm">+91</span>
                        </div>
                        <Input
                          id="mobile"
                          placeholder="Enter Mobile Number"
                          className={cn(
                            "rounded-l-none",
                            theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                          )}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="alternate-mobile">Alternate Number</Label>
                      <div className="mt-1.5 flex">
                        <div className={cn(
                          "flex items-center gap-1 rounded-l-md border border-r-0 px-3",
                          theme === "dark" ? "border-gray-700 bg-[#1e293b]" : "border-gray-300 bg-gray-100"
                        )}>
                          <span className="text-sm">🇮🇳</span>
                          <span className="text-sm">+91</span>
                        </div>
                        <Input
                          id="alternate-mobile"
                          placeholder="Enter Mobile Number"
                          className={cn(
                            "rounded-l-none",
                            theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address1">Address line 1<span className="text-red-500">*</span></Label>
                    <Input
                      id="address1"
                      placeholder="Enter Address line 1"
                      className={cn(
                        "mt-1.5",
                        theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                      )}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address2">Address line 2</Label>
                    <Input
                      id="address2"
                      placeholder="Enter Address line 2"
                      className={cn(
                        "mt-1.5",
                        theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                      )}
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
            <Card className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"
            )}>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    theme === "dark" ? "border-[#42C195] text-[#42C195]" : "border-[#2C7A7B] text-[#2C7A7B]"
                  )}>
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
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sub-order">Sub Order Number</Label>
                      <Input
                        id="sub-order"
                        placeholder="Enter Sub Order Number"
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="order-date">Order Date</Label>
                      <Input
                        id="order-date"
                        type="date"
                        defaultValue="2024-07-12"
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pickup-type">Pickup Type<span className="text-red-500">*</span></Label>
                    <Select defaultValue="forward">
                      <SelectTrigger className={cn(
                        "mt-1.5",
                        theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                      )}>
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
            <Card className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"
            )}>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    theme === "dark" ? "border-[#42C195] text-[#42C195]" : "border-[#2C7A7B] text-[#2C7A7B]"
                  )}>
                    3
                  </div>
                  <h2 className="text-xl font-semibold">Product Details</h2>
                </div>

                <div className="space-y-6">
                  <div className={cn(
                    "rounded-lg border p-4",
                    theme === "dark" ? "border-gray-800" : "border-gray-200"
                  )}>
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
                            className={cn(
                              "mt-1.5",
                              theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                            )}
                          />
                        </div>
                        <div>
                          <Label htmlFor="quantity">Quantity<span className="text-red-500">*</span></Label>
                          <Input
                            id="quantity"
                            type="number"
                            placeholder="Add Qty"
                            className={cn(
                              "mt-1.5",
                              theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                            )}
                          />
                        </div>
                        <div>
                          <Label htmlFor="price">Product Price<span className="text-red-500">*</span></Label>
                          <Input
                            id="price"
                            type="number"
                            placeholder="Enter Product Price"
                            className={cn(
                              "mt-1.5",
                              theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor="sku">SKU</Label>
                          <Input
                            id="sku"
                            placeholder="Enter SKU"
                            className={cn(
                              "mt-1.5",
                              theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                            )}
                          />
                        </div>
                        <div>
                          <Label htmlFor="tax">Tax Rate (Optional)</Label>
                          <Input
                            id="tax"
                            type="number"
                            placeholder="Enter Tax Rate"
                            className={cn(
                              "mt-1.5",
                              theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                            )}
                          />
                        </div>
                        <div>
                          <Label htmlFor="hsn">HSN Code</Label>
                          <Input
                            id="hsn"
                            placeholder="Enter HSN Code"
                            className={cn(
                              "mt-1.5",
                              theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className={cn(
                    "gap-2",
                    theme === "dark" ? "bg-[#1e293b] text-white hover:bg-[#2d3748]" : "bg-white text-gray-900 hover:bg-gray-100"
                  )}>
                    <Plus className="h-4 w-4" />
                    Add Another
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"
            )}>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    theme === "dark" ? "border-[#42C195] text-[#42C195]" : "border-[#2C7A7B] text-[#2C7A7B]"
                  )}>
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
                        <span className={cn(
                          "text-sm",
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        )}>Sub Total</span>
                        <span className="font-medium">₹0.00</span>
                      </div>
                      <div className="mt-1 flex items-center justify-end gap-4">
                        <span className={cn(
                          "text-sm",
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        )}>Total (Prepaid)</span>
                        <span className="font-medium">₹0.00 (Prepaid)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parcel Size Section */}
            <Card className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"
            )}>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    theme === "dark" ? "border-[#42C195] text-[#42C195]" : "border-[#2C7A7B] text-[#2C7A7B]"
                  )}>
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
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="width">Width (cms)<span className="text-red-500">*</span></Label>
                      <Input
                        id="width"
                        type="number"
                        placeholder="Enter Width (cms)"
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (cms)<span className="text-red-500">*</span></Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="Enter Height (cms)"
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
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
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div className="flex items-end">
                      <span className={cn(
                        "text-sm",
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      )}>Volumetric wt: 0.000 kg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Details Section */}
            <Card className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"
            )}>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    theme === "dark" ? "border-[#42C195] text-[#42C195]" : "border-[#2C7A7B] text-[#2C7A7B]"
                  )}>
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
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="alt-number">Alternate Number (Optional)</Label>
                      <div className="mt-1.5 flex">
                        <div className={cn(
                          "flex items-center gap-1 rounded-l-md border border-r-0 px-3",
                          theme === "dark" ? "border-gray-700 bg-[#1e293b]" : "border-gray-300 bg-gray-100"
                        )}>
                          <span className="text-sm">🇮🇳</span>
                          <span className="text-sm">+91</span>
                        </div>
                        <Input
                          id="alt-number"
                          placeholder="Enter"
                          className={cn(
                            "rounded-l-none",
                            theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                          )}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="eway">Eway Bill Number (Optional)</Label>
                      <Input
                        id="eway"
                        placeholder="Enter Eway Bill Number"
                        className={cn(
                          "mt-1.5",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="gstin">GSTIN Number (Optional)</Label>
                    <Input
                      id="gstin"
                      placeholder="Enter GSTIN Number"
                      className={cn(
                        "mt-1.5",
                        theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warehouse Section */}
            <Card className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"
            )}>
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">Warehouse Address</h2>
                  </div>
                  <Button variant="outline" className={cn(
                    "gap-2",
                    theme === "dark" ? "bg-[#1e293b] text-white hover:bg-[#2d3748]" : "bg-white text-gray-900 hover:bg-gray-100"
                  )}>
                    Add Address
                  </Button>
                </div>

                <div className={cn(
                  "rounded-lg border p-4",
                  theme === "dark" ? "border-gray-800" : "border-gray-200"
                )}>
                  <div className="flex gap-4">
                    <div className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg border",
                      theme === "dark" ? "border-gray-700" : "border-gray-300"
                    )}>
                      <Home className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-medium">shalu singhal</div>
                      <div className={cn(
                        "mt-1 text-sm",
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      )}>
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
            <div className={cn(
              "h-[300px] overflow-hidden rounded-lg border",
              theme === "dark" ? "border-gray-800" : "border-border-gray-200"
            )}>
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

            <Card className={cn(
              "transition-colors duration-300",
              theme === "dark" ? "border-gray-800 bg-[#111827]" : "border-gray-200 bg-white"
            )}>
              <CardContent className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Logistics</h3>
                  <Select defaultValue="fast">
                    <SelectTrigger className={cn(
                      "w-[160px]",
                      theme === "dark" ? "bg-[#1e293b]" : "bg-gray-50"
                    )}>
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
                        "flex items-center justify-between rounded-lg border p-4 transition-colors duration-300",
                        theme === "dark"
                          ? item.bestMatch ? "border-[#42C195]/50 bg-[#42C195]/10" : "border-gray-800"
                          : item.bestMatch ? "border-[#2C7A7B]/50 bg-[#2C7A7B]/10" : "border-gray-200"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg font-medium",
                          theme === "dark" ? "bg-[#1e293b]" : "bg-gray-100"
                        )}>
                          {item.logo}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.name}</span>
                            {item.bestMatch && (
                              <span className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                theme === "dark"
                                  ? "bg-[#42C195]/20 text-[#42C195]"
                                  : "bg-[#2C7A7B]/20 text-[#2C7A7B]"
                              )}>
                                Best Matched
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1">
                            <span className="text-sm text-yellow-500">★</span>
                            <span className={cn(
                              "text-sm",
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            )}>
                              {item.rating}
                            </span>
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
                              ? theme === "dark"
                                ? "border-[#42C195] bg-[#42C195] text-white"
                                : "border-[#2C7A7B] bg-[#2C7A7B] text-white"
                              : theme === "dark"
                                ? "border-gray-700"
                                : "border-gray-300"
                          )}
                        >
                          {item.bestMatch && <Check className="h-4 w-4" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={cn(
                  "mt-4 flex justify-between border-t pt-4",
                  theme === "dark" ? "border-gray-800" : "border-gray-200"
                )}>
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

