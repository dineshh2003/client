import React, { useState } from "react";
import { 
  Table, TableHeader, TableColumn, TableBody, 
  TableRow, TableCell 
} from "@nextui-org/react";
import { LowIcon } from "../utils/Icons";
import { Skeleton } from "@mui/material"; 
import { FirestoreOrder } from "@/types/order";

const StoreOrderPage: React.FC<{ orders?: FirestoreOrder[]; loading: boolean }> = ({ orders = [], loading }) => {

  console.log(orders);

  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Toggle row selection
  const toggleRowSelection = (orderID: string | undefined) => {
    if (!orderID) return;
    const updatedSelection = new Set(selectedRows);
    updatedSelection.has(orderID) ? updatedSelection.delete(orderID) : updatedSelection.add(orderID);
    setSelectedRows(updatedSelection);
  };

  return (
    <div className="flex flex-col gap-4 my-4 rounded-xl p-4 bg-[#282A2F] text-black">
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

        <TableBody className="overflow-scroll scrollbar-hIDe max-h-96">
          {loading ? (
            // Render skeleton loading state
            [...Array(20)].map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton animation="wave" width={80} /></TableCell>
                <TableCell><Skeleton animation="wave" width={40} /></TableCell>
                <TableCell><Skeleton animation="wave" width={60} /></TableCell>
                <TableCell><Skeleton animation="wave" width={120} /></TableCell>
                <TableCell><Skeleton animation="wave" width={30} /></TableCell>
                <TableCell><Skeleton animation="wave" width={100} /></TableCell>
                <TableCell><Skeleton animation="wave" width={90} /></TableCell>
              </TableRow>
            ))
            ) : orders == null? (
              // Render "No data found" message if no orders are available
              <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-white">
                No data found
              </TableCell>
              <TableCell colSpan={7} className="text-center py-4 text-white">
                No data found
              </TableCell>
              <TableCell colSpan={7} className="text-center py-4 text-white">
                No data found
              </TableCell>
              <TableCell colSpan={7} className="text-center py-4 text-white">
                No data found
              </TableCell>
              <TableCell colSpan={7} className="text-center py-4 text-white">
                No data found
              </TableCell>
              <TableCell colSpan={7} className="text-center py-4 text-white">
                No data found
              </TableCell>
              <TableCell colSpan={7} className="text-center py-4 text-white">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            // Render the orders if they exist
            orders.map((order) => (
              <TableRow
                key={order.ID}
                style={{
                  backgroundColor: selectedRows.has(order.ID || "") ? "green" : "#d1d5db",
                }}
              >
                <TableCell key={order.ID}>{order.ID || "N/A"}</TableCell>
                <TableCell key={order.ID}><LowIcon /></TableCell>
                <TableCell key={order.ID}>{order.createdAt || "Normal"}</TableCell>
                <TableCell key={order.ID}>
                  {order.customer 
                    ? `${order.customer}` 
                    : "Unknown"}
                </TableCell>
                <TableCell key={order.ID}>{order.Name?.length || 0}</TableCell>
                <TableCell key={order.ID}>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}</TableCell>
                <TableCell key={order.ID}>
                  <button
                    className="bg-[#292b35] text-[#BE74BA] px-4 py-2 rounded-md"
                    onClick={() => toggleRowSelection(order.ID)}
                    >
                    {selectedRows.has(order.ID || "") ? "Deselect" : "Select"}
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      </div>
  );
};

export default StoreOrderPage;
