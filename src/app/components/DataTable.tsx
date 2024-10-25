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
}

const StoreOrderTable: React.FC<StoreOrderTableProps> = ({
  orders = [],
  loading,
}) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Toggle row selection and log selected order data
  const toggleRowSelection = (order: FirestoreOrder) => {
    if (!order.ID) return;

    const updatedSelection = new Set(selectedRows);
    if (updatedSelection.has(order.ID)) {
      updatedSelection.delete(order.ID);
    } else {
      updatedSelection.add(order.ID);
      console.log("Selected row data:", order); // Log entire row data
    }

    setSelectedRows(updatedSelection);
  };

  return (
    <div className="flex flex-col gap-4 my-4 rounded-xl p-4 bg-[#282A2F] text-black">
      <Table aria-label="Order Table" selectionMode="multiple" color="success">
        <TableHeader className="bg-gray-600 text-white">
          <TableColumn>ORDER ID</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>PROCESSED AT</TableColumn>
          <TableColumn>TOTAL PRICE</TableColumn>
          <TableColumn>FINANCIAL STATUS</TableColumn>
          <TableColumn>SHIPPING ADDRESS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>

        <TableBody className="overflow-scroll scrollbar-hide max-h-96 text-white">
          {loading ? (
            // Skeleton loading state
            [...Array(10)].map((_, index) => (
              <TableRow key={index}>
                {[...Array(8)].map((_, idx) => (
                  <TableCell key={idx}>
                    <Skeleton animation="wave" width="100%" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : orders.length === 0 ? (
            // "No data found" message
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4 text-white">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            // Render the orders if they exist
            orders.map((order) => (
              <TableRow
                key={order.ID}
                style={{
                  backgroundColor: selectedRows.has(order.ID || "")
                    ? "#42C195"
                    : "#e5e7eb",
                }}
              >
                <TableCell>{order.ID || "N/A"}</TableCell>
                <TableCell>{order.Name || "N/A"}</TableCell>
                <TableCell>{order.Email ?? "Not Provided"}</TableCell>
                <TableCell>
                  {order.CreatedAt
                    ? new Date(order.CreatedAt).toLocaleString()
                    : order.CreatedAt}
                </TableCell>
                <TableCell>{order.ProcessedAt || "N/A"}</TableCell>
                <TableCell>
                  {order.TotalPrice} {order.currency}
                </TableCell>
                <TableCell>{order.FinancialStatus}</TableCell>
                <TableCell>
                  {order.ShippingAddress ? (
                    <>
                      <div>{order.ShippingAddress.address1}</div>
                      <div>{order.ShippingAddress.address2}</div>
                      <div>
                        {order.ShippingAddress.city},{" "}
                        {order.ShippingAddress.zip}
                      </div>
                      <div>{order.ShippingAddress.country}</div>
                    </>
                  ) : (
                    "Not Provided"
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => toggleRowSelection(order)}
                  >
                    {selectedRows.has(order.ID || "") ? "Deselect" : "Select"}
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
