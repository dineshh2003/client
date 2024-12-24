import React from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { Skeleton } from '@mui/material';

const OrderTableSkeleton: React.FC = () => {
  return (
      <Table>
        <TableBody>
          {[...Array(20)].map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton animation="wave" width={80} /></TableCell>
              <TableCell><Skeleton animation="wave" width={80} /></TableCell>
              <TableCell><Skeleton animation="wave" width={60} /></TableCell>
              <TableCell><Skeleton animation="wave" width={120} /></TableCell>
              <TableCell><Skeleton animation="wave" width={60} /></TableCell>
              <TableCell><Skeleton animation="wave" width={100} /></TableCell>
              <TableCell><Skeleton animation="wave" width={90} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
};

export default OrderTableSkeleton;
