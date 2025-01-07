"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Truck, Heart, FileOutputIcon as FileExport, Upload, Package, ChevronDown, Sun, Moon } from 'lucide-react'
import { useTheme } from "next-themes"

const IndexBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-t-xl p-4 flex justify-between items-center`}>
      <Button variant="secondary" className={`font-semibold ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
        <Truck className="mr-2 h-4 w-4" />
        All Orders
      </Button>
      
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" className={`${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
          <Heart className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
              <FileExport className="mr-2 h-4 w-4" />
              Export
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={`w-48 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-200'}`}>
            <DropdownMenuItem className={`${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} cursor-pointer`}>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem className={`${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} cursor-pointer`}>
              Export as PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="secondary" className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
          <Upload className="mr-2 h-4 w-4" />
          Bulk Upload
        </Button>
        
        <Button variant="secondary" className={`${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
          <Package className="mr-2 h-4 w-4" />
          Bulk Update
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}

export default IndexBar

