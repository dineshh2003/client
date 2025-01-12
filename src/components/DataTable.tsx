// "use client";

// import React, { useState } from "react"
// import { useQuery } from "@apollo/client"
// import { gql } from "@apollo/client"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { format, subDays } from "date-fns"
// import ActionMenu from "./ActionMenu"
// import Action from "./Action"
// import { Skeleton } from "@/components/ui/skeleton"
// import { motion, AnimatePresence } from "framer-motion"
// import { useTheme } from "next-themes"


// // GraphQL query definition
// const GET_ORDERS = gql`
//   query GetOrders($accountId: String!, $pagination: OrderPaginationInput) {
//     getOrdersForAccount(accountId: $accountId, pagination: $pagination) {
//       edges {
//         node {
//          id
//           name
//           createdAt
//           updatedAt
//           cancelledAt
//           closedAt
//           processedAt
//           currency
//           totalPrice
//           subtotalPrice
//           totalDiscounts
//           totalTax
//           taxesIncluded
//           financialStatus
//           fulfillmentStatus
//           orderNumber
//           shopName
//           accountId
//         }
//       }
//       pageInfo {
//         currentPage
//         totalPages
//       }
//       totalCount
//     }
//   }
// `

// interface FirestoreOrder {
//   ID: string
//   Name: string
//   CreatedAt: string
//   UpdatedAt: string
//   CancelledAt: string | null
//   ClosedAt: string | null
//   ProcessedAt: string
//   Currency: string
//   TotalPrice: number | Float64Array
//   SubtotalPrice: number
//   TotalDiscounts: number
//   TotalTax: number
//   TaxesIncluded: boolean
//   FinancialStatus: string
//   FulfillmentStatus: string
//   OrderNumber: number
//   ShopName: string
//   AccountId: string
// }



// interface OrderNode {
//   id: string
//   name: string
//   createdAt: string
//   updatedAt: string
//   cancelledAt: string | null
//   closedAt: string | null
//   processedAt: string
//   currency: string
//   totalPrice: number | Float64Array;
//   subtotalPrice: number
//   totalDiscounts: number
//   totalTax: number
//   taxesIncluded: boolean
//   financialStatus: string
//   fulfillmentStatus: string
//   orderNumber: number
//   shopName: string
//   accountId: string
  
// }

// interface PageInfo {
//   currentPage: number
//   totalPages: number
// }

// interface OrdersResponse {
//   getOrdersForAccount: {
//     edges: { node: OrderNode }[]
//     pageInfo: PageInfo
//     totalCount: number
//   }
// }

// interface StoreOrderTableProps {
//   accountId: string
//   onSelectOrder: (order: FirestoreOrder) => void
// }

// const StoreOrderTable: React.FC<StoreOrderTableProps> = ({
//   accountId,
//   onSelectOrder,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [dateRange, setDateRange] = useState("all")
//   const [customStartDate, setCustomStartDate] = useState("")
//   const [customEndDate, setCustomEndDate] = useState("")
//   const [page, setPage] = useState(1)
//   const pageSize = 10
//   const [selectedOrders, setSelectedOrders] = useState<string[]>([])
//   const [showShipNow, setShowShipNow] = useState(false)
//   const [selectedActionOrder, setSelectedActionOrder] = useState<FirestoreOrder | null>(null)
//   const { theme } = useTheme();
//   const handleShipNow = (order: FirestoreOrder) => {
//     setSelectedActionOrder(order)
//     setShowShipNow(true)
//   }

//   const handleViewDetails = (order: FirestoreOrder) => {
//     onSelectOrder(order)
//   }
  


//   const { loading, error, data } = useQuery<OrdersResponse>(GET_ORDERS, {
//     variables: {
//       accountId,
//       pagination: {
//         page,
//         pageSize,
//       },
//     },
//     fetchPolicy: "network-only",
//   })

//   const orders: FirestoreOrder[] = data?.getOrdersForAccount.edges.map(
//     ({ node }) => ({
//       ID: node.id,
//       Name: node.name,
//       CreatedAt: node.createdAt,
//       UpdatedAt: node.updatedAt,
//       CancelledAt: node.cancelledAt,
//       ClosedAt: node.closedAt,
//       ProcessedAt: node.processedAt,
//       Currency: node.currency,
//       TotalPrice: node.totalPrice,
//       SubtotalPrice: node.subtotalPrice,
//       TotalDiscounts: node.totalDiscounts,
//       TotalTax: node.totalTax,
//       TaxesIncluded: node.taxesIncluded,
//       FinancialStatus: node.financialStatus,
//       FulfillmentStatus: node.fulfillmentStatus,
//       OrderNumber: node.orderNumber,
//       ShopName: node.shopName,
//       AccountId: node.accountId,
//     })
//   ) || []


//   const handleSearch = (order: FirestoreOrder) => {
//     const matchesSearch =
//       order.ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.Name.toLowerCase().includes(searchTerm.toLowerCase())

//     let matchesDate = true
//     const createdAt = new Date(order.CreatedAt)

//     if (dateRange !== "all") {
//       switch (dateRange) {
//         case "24 hours":
//           matchesDate = createdAt >= subDays(new Date(), 1)
//           break
//         case "2 days":
//           matchesDate = createdAt >= subDays(new Date(), 2)
//           break
//         case "1 week":
//           matchesDate = createdAt >= subDays(new Date(), 7)
//           break
//         case "custom":
//           if (customStartDate && customEndDate) {
//             matchesDate =
//               createdAt >= new Date(customStartDate) &&
//               createdAt <= new Date(customEndDate)
//           }
//           break
//       }
//     }

//     return matchesSearch && matchesDate
//   }

//   const toggleOrderSelection = (orderId: string) => {
//     setSelectedOrders(prev => 
//       prev.includes(orderId)
//         ? prev.filter(id => id !== orderId)
//         : [...prev, orderId]
//     )
//   }

//   const toggleAllOrders = () => {
//     if (selectedOrders.length === orders.length) {
//       setSelectedOrders([])
//     } else {
//       setSelectedOrders(orders.map(order => order.ID))
//     }
//   }







//   if (error) {
//     return (
//       <div className="text-red-500 p-4">
//         Error loading orders: {error.message}
//       </div>
//     )
//   }

"use client";

import React, { useState } from "react"
import { useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
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
import { useTheme } from "next-themes"
import { toast } from "sonner"

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

interface FirestoreOrder {
  ID: string
  Name: string
  CreatedAt: string
  UpdatedAt: string
  CancelledAt: string | null
  ClosedAt: string | null
  ProcessedAt: string
  Currency: string
  TotalPrice: number | Float64Array
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
  totalPrice: number | Float64Array
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
  onSelectOrder: (order: FirestoreOrder) => void
}

const StoreOrderTable: React.FC<StoreOrderTableProps> = ({
  onSelectOrder,
}) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("all")
  const [customStartDate, setCustomStartDate] = useState("")
  const [customEndDate, setCustomEndDate] = useState("")
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [showShipNow, setShowShipNow] = useState(false)
  const [selectedActionOrder, setSelectedActionOrder] = useState<FirestoreOrder | null>(null)
  const { theme } = useTheme()

  // Redirect if not authenticated
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }
  }, [status, router])

  const { loading, error, data } = useQuery<OrdersResponse>(GET_ORDERS, {
    variables: {
      accountId: session?.user?.id,
      pagination: {
        page,
        pageSize,
      },
    },
    skip: !session?.user?.id,
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

  const handleShipNow = (order: FirestoreOrder) => {
    setSelectedActionOrder(order)
    setShowShipNow(true)
  }

  const handleViewDetails = (order: FirestoreOrder) => {
    onSelectOrder(order)
  }

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

  // Show loading state while checking authentication
  if (status === 'loading' || !session?.user?.id) {
    return (
      <div className={`flex flex-col rounded-b-3xl px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="relative overflow-auto max-h-[600px] scrollbar-hide">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="mb-4">
              <Skeleton className={`h-12 w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    toast.error(`Error loading orders: ${error.message}`)
    return null
  }


  return (
    <>
      <div className={`flex flex-col rounded-b-3xl px-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Search and Filter Controls */}
        <div className="flex flex-wrap gap-4 py-4">
          <Input
            className={`w-72 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-800 placeholder:text-gray-500'}`}
            placeholder="Search by Order ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className={`w-72 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-800'}`}>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}>
              <SelectItem value="all" className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>All Orders</SelectItem>
              <SelectItem value="24 hours" className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>Last 24 Hours</SelectItem>
              <SelectItem value="2 days" className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>Last 2 Days</SelectItem>
              <SelectItem value="1 week" className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>Last 1 Week</SelectItem>
              <SelectItem value="custom" className={theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}>Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {dateRange === "custom" && (
            <div className="flex gap-4">
              <Input
                type="date"
                className={`w-72 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
              />
              <Input
                type="date"
                className={`w-72 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-800'}`}
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
              <TableHeader className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <TableRow className={theme === 'dark' ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-200'}>
                  <TableHead className={`w-[50px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Checkbox
                      checked={selectedOrders.length === orders.length}
                      onCheckedChange={toggleAllOrders}
                      aria-label="Select all orders"
                      className={theme === 'dark' ? 'border-gray-500' : 'border-gray-400'}
                    />
                  </TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>ORDER ID</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>NAME</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>CREATED AT</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>UPDATED AT</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>CANCELLED AT</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>CLOSED AT</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>PROCESSED AT</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>CURRENCY</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>TOTAL PRICE</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>SUBTOTAL PRICE</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>TOTAL DISCOUNTS</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>TOTAL TAX</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>TAXES INCLUDED</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>FINANCIAL STATUS</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>FULFILLMENT STATUS</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>ORDER NUMBER</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>SHOP NAME</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>ACCOUNT ID</TableHead>
                  <TableHead className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, index) => (
                    <TableRow key={index} className={theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}>
                      {[...Array(40)].map((_, idx) => (
                        <TableCell key={idx}>
                          <Skeleton className={`h-4 w-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : orders.filter(handleSearch).length === 0 ? (
                  <TableRow className={theme === 'dark' ? 'border-gray-600' : 'border-gray-200'}>
                    <TableCell colSpan={40} className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.filter(handleSearch).map((order) => (
                    <TableRow key={order.ID} className={`${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-100'}`}>
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.ID)}
                          onCheckedChange={() => toggleOrderSelection(order.ID)}
                          aria-label={`Select order ${order.ID}`}
                          className={theme === 'dark' ? 'border-gray-500' : 'border-gray-400'}
                        />
                      </TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.ID}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.Name}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.CreatedAt}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.UpdatedAt}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.CancelledAt}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.ClosedAt}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.ProcessedAt}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.Currency}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.TotalPrice}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.SubtotalPrice}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.TotalDiscounts}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.TotalTax}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.TaxesIncluded ? 'Yes' : 'No'}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.FinancialStatus}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.FulfillmentStatus}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.OrderNumber}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.ShopName}</TableCell>
                      <TableCell className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{order.AccountId}</TableCell>
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
          <div className={`flex justify-between items-center mt-4 p-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <div>
              {selectedOrders.length} order(s) selected
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'}`}
              >
                Previous
              </Button>
              <span className="px-4 py-2">
                Page {data.getOrdersForAccount.pageInfo.currentPage} of{" "}
                {data.getOrdersForAccount.pageInfo.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={page === data.getOrdersForAccount.pageInfo.totalPages}
                onClick={() => setPage(page + 1)}
                className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'}`}
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
