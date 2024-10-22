import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input } from "@nextui-org/react";
import { LowIcon } from '../utils/Icons';
import { Order } from "../utils/ordersInterface";

const StoreOrderPage: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Filter orders based on Order ID and Date
  const filteredOrders = orders.filter((order) => {
    const matchesOrderId = order.id?.toString().toLowerCase().includes(filterValue.toLowerCase());
    const matchesDate = dateFilter && order.createdAt
      ? new Date(order.createdAt).toLocaleDateString() === new Date(dateFilter).toLocaleDateString()
      : true;
    return matchesOrderId && matchesDate;
  });

  // Toggle row selection (supports multiple selection)
  const toggleRowSelection = (orderId: number | undefined) => {
    if (!orderId) return;
    const updatedSelection = new Set(selectedRows);
    if (updatedSelection.has(orderId)) {
      updatedSelection.delete(orderId);
    } else {
      updatedSelection.add(orderId);
    }
    setSelectedRows(updatedSelection);
  };

  return (
    <div className="flex flex-col gap-4 my-4 rounded-xl p-4 bg-[#282A2F] text-black">
      {/* Search Fields */}
      <div className="flex flex-row gap-3">
        <Input
          isClearable
          className="w-64 sm:max-w-[44%] bg-slate-900 p-1"
          placeholder="Search by Order ID..."
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={(value) => setFilterValue(value)}
        />
        <Input
          type="date"
          className="w-64 sm:max-w-[44%] bg-slate-900 p-1"
          value={dateFilter}
          onValueChange={(value) => setDateFilter(value)}
          placeholder="Search by Date..."
        />
      </div>

      {/* Order Table with multiple row selection */}
      <Table aria-label="Order Table" selectionMode="multiple" color="success">
        <TableHeader className="bg-gray-600 text-white">
          <TableColumn>ORDER ID</TableColumn>
          <TableColumn>RISK</TableColumn>
          <TableColumn>BUYER INTENT</TableColumn>
          <TableColumn>CUSTOMER</TableColumn>
          <TableColumn>ITEMS</TableColumn>
          <TableColumn>ORDER DATE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow
              key={order.id}
              style={{ backgroundColor: selectedRows.has(order.id || 0) ? 'green' : 'gray-300' }}
            >
              <TableCell>{order.name}</TableCell>
              <TableCell>
                <LowIcon />
              </TableCell>
              <TableCell>{order.orderNumber|| 'Normal'}</TableCell>
              <TableCell>
                {order.customer
                  ? `${order.customer.firstName} ${order.customer.lastName}`
                  : 'Unknown'}
              </TableCell>
              <TableCell>{order.lineItems?.length || 0}</TableCell>
              <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</TableCell>
              <TableCell>
                <button
                  className="bg-[#292b35] text-[#BE74BA] px-4 py-2 rounded-md"
                  onClick={() => toggleRowSelection(order.id)}
                >
                  {selectedRows.has(order.id || 0) ? "Deselect" : "Select"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreOrderPage;
