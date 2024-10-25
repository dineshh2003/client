// StoreOrderTable.tsx

import React, { useState } from "react";
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

interface StoreOrderTableProps {
  orders?: FirestoreOrder[];
  loading: boolean;
  onSelectOrder: (order: FirestoreOrder) => void; // Pass order to parent
}

const StoreOrderTable: React.FC<StoreOrderTableProps> = ({
  orders = [],
  loading,
  onSelectOrder,
}) => {
  return (
    <div className="flex flex-col gap-4 my-4 rounded-xl p-4 bg-[#282A2F] text-black">
      <Table aria-label="Order Table" selectionMode="multiple" color="success">
        <TableHeader className="bg-gray-600 text-white">
          <TableColumn>ORDER ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody>
          {loading ? (
            [...Array(10)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(6)].map((_, idx) => (
                  <TableCell key={idx}>
                    <Skeleton animation="wave" width="100%" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 text-white">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.ID}>
                <TableCell>{order.ID}</TableCell>
                <TableCell>{order.Name || "N/A"}</TableCell>
                <TableCell>{order.Email || "Not Provided"}</TableCell>
                <TableCell>
                  {order.CreatedAt ? new Date(order.CreatedAt).toLocaleString() : "N/A"}
                </TableCell>
                <TableCell>
                  {order.TotalPrice} {order.currency}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onSelectOrder(order)} // Pass selected order
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
  );
};

export default StoreOrderTable;
