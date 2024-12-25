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
import { Skeleton } from "@/components/ui/skeleton"

// GraphQL query definition
const GET_ORDERS = gql`
  query GetOrders($accountId: String!, $pagination: OrderPaginationInput) {
    getOrdersForAccount(accountId: $accountId, pagination: $pagination) {
      edges {
        node {
          id
          name
          totalPrice
          createdAt
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
  Email: string
  CreatedAt: string
  TotalPrice: number
}

interface OrderNode {
  id: string
  name: string
  totalPrice: number
  createdAt: string
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
      TotalPrice: node.totalPrice,
      CreatedAt: node.createdAt,
      Email: "Not Available",
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
            <TableHeader className="sticky top-0 bg-gray-900 z-10">
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
                <TableHead className="text-gray-400">EMAIL</TableHead>
                <TableHead className="text-gray-400">CREATED AT</TableHead>
                <TableHead className="text-gray-400">TOTAL PRICE</TableHead>
                <TableHead className="text-gray-400">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [...Array(5)].map((_, index) => (
                  <TableRow key={index} className="border-gray-800">
                    {[...Array(7)].map((_, idx) => (
                      <TableCell key={idx}>
                        <Skeleton className="h-4 w-full bg-gray-800" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : orders.filter(handleSearch).length === 0 ? (
                <TableRow className="border-gray-800">
                  <TableCell colSpan={7} className="text-center text-gray-400">
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
                    <TableCell className="text-blue-400 font-medium">
                      {order.ID || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-100">
                      {order.Name || "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-100">
                      {order.Email || "Not Provided"}
                    </TableCell>
                    <TableCell className="text-gray-100">
                      {order.CreatedAt
                        ? new Date(order.CreatedAt).toLocaleString()
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-gray-100">
                      {typeof order.TotalPrice === "number"
                        ? `$${order.TotalPrice.toFixed(2)}`
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-gray-800"
                        onClick={() => onSelectOrder(order)}
                      >
                        View Details
                      </Button>
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
  )
}

export default StoreOrderTable

