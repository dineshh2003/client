"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Building2, CreditCard, Package, Settings, Shield } from 'lucide-react'

const sections = [
  {
    title: "COMPANY SETUP",
    icon: Building2,
    items: [
      { title: "Company Details", href: "/settings/company", description: "View, edit and update the company related details like brand name, email, logo" },
      { title: "Domestic KYC", href: "/settings/kyc", description: "Submit Know Your Customer (KYC) information for uninterrupted shipping" },
      { title: "Pickup Addresses", href: "/settings/addresses", description: "Manage all your pickup addresses here" },
      { title: "Billing, Invoice, & GSTIN", href: "/settings/billing", description: "Add your billing address, invoice preferences, or set up GSTIN invoicing" },
      { title: "Labels", href: "/settings/labels", description: "Choose the suitable label format for your company" },
    ],
  },
  {
    title: "SELLER REMITTANCE",
    icon: CreditCard,
    items: [
      { title: "Bank Details", href: "/settings/bank", description: "Add bank account details where you want your COD to be remitted" },
      { title: "Early COD Remittance", href: "/settings/cod", description: "Receive guaranteed early COD remittance within 2-4 days from the shipment delivered date as per chosen plan" },
      { title: "Postpaid Plan", href: "/settings/postpaid", description: "Convert your COD remittance into shipping credits for uninterrupted shipping experience" },
    ],
  },
  {
    title: "VALUE ADDED SERVICES",
    icon: Shield,
    items: [
      { title: "RTO Score", href: "/settings/rto", description: "Enable RTO Score to improve your Delivery Success Rate and reduce RTO risk" },
      { title: "Auto-Secure Shipments", href: "/settings/secure", description: "Automatically secure all shipments above Rs 5,000 without any additional cost" },
      { title: "Delivery Boost", href: "/settings/boost", description: "Smart AI powered engine to increase your delivery conversion" },
    ],
  },
]

export function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-gray-900 mt-[2vh] rounded-md">
      <div className="hidden border-r border-gray-800 lg:block">
        <div className="flex flex-col gap-2 p-6">
          <div className="flex items-center gap-2 px-2">
            <Settings className="h-6 w-6 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-200">Settings</h2>
          </div>
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="space-y-2">
                <div className="flex items-center gap-2 px-2 py-1">
                  <section.icon className="h-4 w-4 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-400">{section.title}</h3>
                </div>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-2 py-1 text-sm hover:bg-gray-800",
                      pathname === item.href ? "bg-gray-800 text-gray-200" : "text-gray-400"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

