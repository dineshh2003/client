"use client"

import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { format, subDays } from "date-fns"
import ActionMenu from "./ActionMenu"
import Action from "./Action"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"





// GraphQL query definition
const GET_ORDERS = gql`
  query GetOrders($accountId: String!, $pagination: OrderPaginationInput) {
    getOrdersForAccount(accountId: $accountId, pagination: $pagination) {
      edges {
        node {
         id
          name
          createdAt
          updatedAt
          cancelledAt
          closedAt
          processedAt
          currency
          totalPrice
          subtotalPrice
          totalDiscounts
          totalTax
          taxesIncluded
          financialStatus
          fulfillmentStatus
          orderNumber
          shopName
          accountId
        }
      }
      pageInfo {
        currentPage
        totalPages
      }
      totalCount
    }
  }
`

// Types
interface FirestoreOrder {
  ID: string
  Name: string
  CreatedAt: string
  UpdatedAt: string
  CancelledAt: string | null
  ClosedAt: string | null
  ProcessedAt: string
  Currency: string
  TotalPrice: number
  SubtotalPrice: number
  TotalDiscounts: number
  TotalTax: number
  TaxesIncluded: boolean
  FinancialStatus: string
  FulfillmentStatus: string
  OrderNumber: number
  ShopName: string
  AccountId: string
}

interface OrderNode {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  cancelledAt: string | null
  closedAt: string | null
  processedAt: string
  currency: string
  totalPrice: number
  subtotalPrice: number
  totalDiscounts: number
  totalTax: number
  taxesIncluded: boolean
  financialStatus: string
  fulfillmentStatus: string
  orderNumber: number
  shopName: string
  accountId: string
  
}

interface PageInfo {
  currentPage: number
  totalPages: number
}

interface OrdersResponse {
  getOrdersForAccount: {
    edges: { node: OrderNode }[]
    pageInfo: PageInfo
    totalCount: number
  }
}

interface StoreOrderTableProps {
  accountId: string
  onSelectOrder: (order: FirestoreOrder) => void
}

const StoreOrderTable: React.FC<StoreOrderTableProps> = ({
  accountId,
  onSelectOrder,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("all")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [showShipNow, setShowShipNow] = useState(false)
  const [selectedActionOrder, setSelectedActionOrder] = useState<FirestoreOrder | null>(null)

  const handleShipNow = (order: FirestoreOrder) => {
    setSelectedActionOrder(order)
    setShowShipNow(true)
  }

  const handleViewDetails = (order: FirestoreOrder) => {
    onSelectOrder(order)
  }
  


  const { loading, error, data } = useQuery<OrdersResponse>(GET_ORDERS, {
    variables: {
      accountId,
      pagination: {
        page,
        pageSize,
      },
    },
    fetchPolicy: "network-only",
  })

  const orders: FirestoreOrder[] = data?.getOrdersForAccount.edges.map(
    ({ node }) => ({
      ID: node.id,
      Name: node.name,
      CreatedAt: node.createdAt,
      UpdatedAt: node.updatedAt,
      CancelledAt: node.cancelledAt,
      ClosedAt: node.closedAt,
      ProcessedAt: node.processedAt,
      Currency: node.currency,
      TotalPrice: node.totalPrice,
      SubtotalPrice: node.subtotalPrice,
      TotalDiscounts: node.totalDiscounts,
      TotalTax: node.totalTax,
      TaxesIncluded: node.taxesIncluded,
      FinancialStatus: node.financialStatus,
      FulfillmentStatus: node.fulfillmentStatus,
      OrderNumber: node.orderNumber,
      ShopName: node.shopName,
      AccountId: node.accountId,
    })
  ) || []


  const handleSearch = (order: FirestoreOrder) => {
    const matchesSearch =
      order.ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.Name.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesDate = true
    const createdAt = new Date(order.CreatedAt)

    if (dateRange !== "all") {
      switch (dateRange) {
        case "24 hours":
          matchesDate = createdAt >= subDays(new Date(), 1)
          break
        case "2 days":
          matchesDate = createdAt >= subDays(new Date(), 2)
          break
        case "1 week":
          matchesDate = createdAt >= subDays(new Date(), 7)
          break
        case "custom":
          if (customStartDate && customEndDate) {
            matchesDate =
              createdAt >= new Date(customStartDate) &&
              createdAt <= new Date(customEndDate)
          }
          break
      }
    }

    return matchesSearch && matchesDate
  }

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const toggleAllOrders = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map(order => order.ID))
    }
  }







  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading orders: {error.message}
      </div>
    )
  }

  return (
    <>
    <div className="flex flex-col rounded-b-3xl px-4 bg-gray-900">
      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4 py-4">
        <Input
          className="w-72 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400"
          placeholder="Search by Order ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-72 bg-gray-800 border-gray-700 text-gray-100">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all" className="text-gray-100">All Orders</SelectItem>
            <SelectItem value="24 hours" className="text-gray-100">Last 24 Hours</SelectItem>
            <SelectItem value="2 days" className="text-gray-100">Last 2 Days</SelectItem>
            <SelectItem value="1 week" className="text-gray-100">Last 1 Week</SelectItem>
            <SelectItem value="custom" className="text-gray-100">Custom Range</SelectItem>
          </SelectContent>
        </Select>

        {dateRange === "custom" && (
          <div className="flex gap-4">
            <Input
              type="date"
              className="w-72 bg-gray-800 border-gray-700 text-gray-100"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
            />
            <Input
              type="date"
              className="w-72 bg-gray-800 border-gray-700 text-gray-100"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Scrollable Table Container */}
      <div className="relative overflow-auto max-h-[600px] scrollbar-hide">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader className="sticky rounded-lg p-2 top-0 bg-gray-800 z-10">
              <TableRow className="border-gray-800 hover:bg-gray-800">
                <TableHead className="w-[50px] text-gray-400">
                  <Checkbox
                    checked={selectedOrders.length === orders.length}
                    onCheckedChange={toggleAllOrders}
                    aria-label="Select all orders"
                    className="border-gray-600"
                  />
                </TableHead>
                <TableHead className="text-gray-400">ORDER ID</TableHead>
                <TableHead className="text-gray-400">NAME</TableHead>
                <TableHead className="text-gray-400">CREATED AT</TableHead>
                <TableHead className="text-gray-400">UPDATED AT</TableHead>
                <TableHead className="text-gray-400">CANCELLED AT</TableHead>
                <TableHead className="text-gray-400">CLOSED AT</TableHead>
                <TableHead className="text-gray-400">PROCESSED AT</TableHead>
                <TableHead className="text-gray-400">CURRENCY</TableHead>
                <TableHead className="text-gray-400">TOTAL PRICE</TableHead>
                <TableHead className="text-gray-400">SUBTOTAL PRICE</TableHead>
                <TableHead className="text-gray-400">TOTAL DISCOUNTS</TableHead>
                <TableHead className="text-gray-400">TOTAL TAX</TableHead>
                <TableHead className="text-gray-400">TAXES INCLUDED</TableHead>
                <TableHead className="text-gray-400">FINANCIAL STATUS</TableHead>
                <TableHead className="text-gray-400">FULFILLMENT STATUS</TableHead>
                <TableHead className="text-gray-400">ORDER NUMBER</TableHead>
                <TableHead className="text-gray-400">SHOP NAME</TableHead>
                <TableHead className="text-gray-400">ACCOUNT ID</TableHead>
                <TableHead className="text-gray-400">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="border-gray-800">
                    {[...Array(40)].map((_, idx) => (
                      <TableCell key={idx}>
                        <Skeleton className="h-4 w-full bg-gray-800" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : orders.filter(handleSearch).length === 0 ? (
                <TableRow className="border-gray-800">
                  <TableCell colSpan={40} className="text-center text-gray-400">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.filter(handleSearch).map((order) => (
                  <TableRow key={order.ID} className="border-gray-800 hover:bg-gray-800">
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.ID)}
                        onCheckedChange={() => toggleOrderSelection(order.ID)}
                        aria-label={`Select order ${order.ID}`}
                        className="border-gray-600"
                      />
                    </TableCell>
                    <TableCell className="text-gray-400">{order.ID}</TableCell>
        <TableCell className="text-gray-400">{order.Name}</TableCell>
        <TableCell className="text-gray-400">{order.CreatedAt}</TableCell>
        <TableCell className="text-gray-400">{order.UpdatedAt}</TableCell>
        <TableCell className="text-gray-400">{order.CancelledAt}</TableCell>
        <TableCell className="text-gray-400">{order.ClosedAt}</TableCell>
        <TableCell className="text-gray-400">{order.ProcessedAt}</TableCell>
        <TableCell className="text-gray-400">{order.Currency}</TableCell>
        <TableCell className="text-gray-400">{order.TotalPrice}</TableCell>
        <TableCell className="text-gray-400">{order.SubtotalPrice}</TableCell>
        <TableCell className="text-gray-400">{order.TotalDiscounts}</TableCell>
        <TableCell className="text-gray-400">{order.TotalTax}</TableCell>
        <TableCell className="text-gray-400">{order.TaxesIncluded ? 'Yes' : 'No'}</TableCell>
        <TableCell className="text-gray-400">{order.FinancialStatus}</TableCell>
        <TableCell className="text-gray-400">{order.FulfillmentStatus}</TableCell>
        <TableCell className="text-gray-400">{order.OrderNumber}</TableCell>
        <TableCell className="text-gray-400">{order.ShopName}</TableCell>
        <TableCell className="text-gray-400">{order.AccountId}</TableCell>

                    <TableCell>
                    <ActionMenu
            onShipNow={() => handleShipNow(order)}
            onViewDetails={() => handleViewDetails(order)}
          />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination Controls */}
      {data?.getOrdersForAccount.pageInfo && (
        <div className="flex justify-between items-center mt-4 p-4">
          <div className="text-gray-100">
            {selectedOrders.length} order(s) selected
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700"
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-gray-100">
              Page {data.getOrdersForAccount.pageInfo.currentPage} of{" "}
              {data.getOrdersForAccount.pageInfo.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === data.getOrdersForAccount.pageInfo.totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>

<AnimatePresence>
{showShipNow && selectedActionOrder && (
  <Action
    order={selectedActionOrder}
    onBack={() => setShowShipNow(false)}
  />
)}
</AnimatePresence>
</>

  )
}

export default StoreOrderTable