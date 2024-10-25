import React from 'react';
import { TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Skeleton } from '@mui/material'; // Import Skeleton from MUI

const OrderTableSkeleton: React.FC = () => {
  return (
    <TableBody>
      {/* Render 20 skeleton rows */}
      {[...Array(20)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton animation="wave" width={80} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" width={80} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" width={60} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" width={120} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" width={60} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" width={100} />
          </TableCell>
          <TableCell>
            <Skeleton animation="wave" width={90} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OrderTableSkeleton;
