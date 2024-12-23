"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Skeleton, Button } from "@mui/material";
import { format, subDays } from "date-fns";

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
`;

// Types
interface FirestoreOrder {
  ID: string;
  Name: string;
  Email: string;
  CreatedAt: string;
  TotalPrice: number;
}

interface OrderNode {
  id: string;
  name: string;
  totalPrice: number;
  createdAt: string;
}

interface PageInfo {
  currentPage: number;
  totalPages: number;
}

interface OrdersResponse {
  getOrdersForAccount: {
    edges: { node: OrderNode }[];
    pageInfo: PageInfo;
    totalCount: number;
  };
}

interface StoreOrderTableProps {
  accountId: string;
  onSelectOrder: (order: FirestoreOrder) => void;
}

const StoreOrderTable: React.FC<StoreOrderTableProps> = ({
  accountId,
  onSelectOrder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // GraphQL query hook
  const { loading, error, data } = useQuery<OrdersResponse>(GET_ORDERS, {
    variables: {
      accountId,
      pagination: {
        page,
        pageSize,
      },
    },
  });

  // Transform GraphQL response to FirestoreOrder format
  const orders: FirestoreOrder[] = data?.getOrdersForAccount.edges.map(
    ({ node }) => ({
      ID: node.id,
      Name: node.name,
      TotalPrice: node.totalPrice,
      CreatedAt: node.createdAt,
      Email: "Not Available", // Default value since not in query
    })
  ) || [];

  const handleSearch = (order: FirestoreOrder) => {
    const matchesSearch =
      order.ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.Name.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesDate = true;
    const createdAt = new Date(order.CreatedAt);

    if (dateRange !== "all") {
      switch (dateRange) {
        case "24 hours":
          matchesDate = createdAt >= subDays(new Date(), 1);
          break;
        case "2 days":
          matchesDate = createdAt >= subDays(new Date(), 2);
          break;
        case "1 week":
          matchesDate = createdAt >= subDays(new Date(), 7);
          break;
        case "custom":
          if (customStartDate && customEndDate) {
            matchesDate =
              createdAt >= new Date(customStartDate) &&
              createdAt <= new Date(customEndDate);
          }
          break;
      }
    }

    return matchesSearch && matchesDate;
  };

  if (error) {
    return (
      <div className="text-red-500 p-4">Error loading orders: {error.message}</div>
    );
  }

  return (
    <div className="flex flex-col rounded-b-3xl px-4 bg-gray-900 text-black">
      {/* Search and Filter Controls */}
      <div className="search-container flex flex-row py-1 gap-4">
        <input
          className="bg-[#12121256] p-4 rounded-xl border border-[#3d3d3d] text-gray-300 mb-4 w-72"
          type="text"
          placeholder="Search by Order ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-[#12121256] p-4 rounded-xl border border-[#3d3d3d] text-gray-300 mb-4 w-72"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="all">All Orders</option>
          <option value="24 hours">Last 24 Hours</option>
          <option value="2 days">Last 2 Days</option>
          <option value="1 week">Last 1 Week</option>
          <option value="custom">Custom Range</option>
        </select>

        {dateRange === "custom" && (
          <div className="flex gap-4">
            <input
              type="date"
              className="bg-[#12121256] p-4 rounded-xl border border-[#3d3d3d] text-gray-300 mb-4 w-72"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              className="bg-[#12121256] p-4 rounded-xl border border-[#3d3d3d] text-gray-300 mb-4 w-72"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
        )}
      </div>

      {/* Table */}
      <div className="pb-6">
        <Table aria-label="Order Table">
          <TableHeader>
            <TableColumn>ORDER ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>CREATED AT</TableColumn>
            <TableColumn>TOTAL PRICE</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  {[...Array(6)].map((_, idx) => (
                    <TableCell key={idx}>
                      <Skeleton animation="wave" width="100%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : orders.filter(handleSearch).length === 0 ? (
              <TableRow>
                <TableCell>No orders found.</TableCell>
                <TableCell>.</TableCell>
                <TableCell>.</TableCell>
                <TableCell>.</TableCell>
                <TableCell>.</TableCell>
                <TableCell>.</TableCell>
              </TableRow>
            ) : (
              orders.filter(handleSearch).map((order) => (
                <TableRow key={order.ID} className="text-gray-100">
                  <TableCell>{order.ID || "N/A"}</TableCell>
                  <TableCell>{order.Name || "N/A"}</TableCell>
                  <TableCell>{order.Email || "Not Provided"}</TableCell>
                  <TableCell>
                    {order.CreatedAt
                      ? new Date(order.CreatedAt).toLocaleString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {typeof order.TotalPrice === "number"
                      ? `$${order.TotalPrice.toFixed(2)}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
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

        {/* Pagination Controls */}
        {data?.getOrdersForAccount.pageInfo && (
          <div className="flex justify-end mt-4 gap-2 text-gray-300">
            <Button
              variant="contained"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-blue-600"
            >
              Previous
            </Button>
            <span className="px-4 py-2">
              Page {data.getOrdersForAccount.pageInfo.currentPage} of{" "}
              {data.getOrdersForAccount.pageInfo.totalPages}
            </span>
            <Button
              variant="contained"
              disabled={page === data.getOrdersForAccount.pageInfo.totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-blue-600"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreOrderTable;