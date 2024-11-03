import React, { useState , useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Skeleton, Button } from "@mui/material";
import { FirestoreOrder } from "@/interfaces/OrderInterface";
import { format, subDays } from "date-fns";
import { Session } from "next-auth";


interface StoreOrderTableProps {
  orders?: FirestoreOrder[];
  loading: boolean;
  onSelectOrder: (order: FirestoreOrder) => void;
}

const StoreOrderTable: React.FC<StoreOrderTableProps> = ({
  orders = [],
  loading,
  onSelectOrder,
}) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

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

  return (
    <div className="flex flex-col rounded-b-3xl px-4 bg-[#282A2F] text-black">
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
              [...Array(1)].map((_, index) => (
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
                    {order.TotalPrice || "N/A"}
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
      </div>
    </div>
  );
};

export default StoreOrderTable;