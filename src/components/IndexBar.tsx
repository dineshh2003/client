"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Truck, Heart, FileOutputIcon as FileExport, Upload, Package, ChevronDown } from 'lucide-react'

const IndexBar = () => {
  return (
    <div className="bg-gray-900 mt-16 rounded-t-xl p-4 flex justify-between items-center">
      <Button variant="secondary" className="font-semibold text-white bg-gray-800 hover:bg-gray-700">
        <Truck className="mr-2 h-4 w-4" />
        All Orders
      </Button>
      
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
          <Heart className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700 text-white">
              <FileExport className="mr-2 h-4 w-4" />
              Export
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-gray-800 text-white border-gray-700">
            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700 text-white">
          <Upload className="mr-2 h-4 w-4" />
          Bulk Upload
        </Button>
        
        <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700 text-white">
          <Package className="mr-2 h-4 w-4" />
          Bulk Update
        </Button>
      </div>
    </div>
  )
}

export default IndexBar

