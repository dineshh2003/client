"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type OrderSummary } from "../types/order";
import { cn } from "@/lib/utils";

interface SndOrderSummaryProps {
  date: string;
  data: OrderSummary[];
  theme?: string;
}

export function SndOrderSummary({ date, data, theme }: SndOrderSummaryProps) {
  const grandTotal = data.reduce(
    (acc, row) => ({
      prepaid: acc.prepaid + row.prepaid,
      cod: acc.cod + row.cod,
      total: acc.total + row.total,
    }),
    { prepaid: 0, cod: 0, total: 0 }
  );

  return (
    <div className={cn(
      "rounded-lg p-6 shadow-lg border transition-all duration-300",
      theme === "dark"
        ? "bg-[#111827] border-gray-800"
        : "bg-white border-gray-200"
    )}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className={cn(
          "text-xl font-semibold",
          theme === "dark" ? "text-white" : "text-gray-900"
        )}>
          SND Order Summary
        </h2>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className={cn(
              "w-[180px] border transition-colors duration-300",
              theme === "dark"
                ? "bg-[#1e293b] border-gray-700 text-white"
                : "bg-gray-50 border-gray-200 text-gray-900"
            )}>
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className={cn(
              "border transition-colors duration-300",
              theme === "dark"
                ? "bg-[#1e293b] border-gray-700"
                : "bg-white border-gray-200"
            )}>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className={cn(
              "w-[180px] border transition-colors duration-300",
              theme === "dark"
                ? "bg-[#1e293b] border-gray-700 text-white"
                : "bg-gray-50 border-gray-200 text-gray-900"
            )}>
              <SelectValue placeholder="Courier" />
            </SelectTrigger>
            <SelectContent className={cn(
              "border transition-colors duration-300",
              theme === "dark"
                ? "bg-[#1e293b] border-gray-700"
                : "bg-white border-gray-200"
            )}>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <div className={cn(
            "rounded px-4 py-2 border transition-colors duration-300",
            theme === "dark"
              ? "bg-[#1e293b] border-gray-700 text-white"
              : "bg-gray-50 border-gray-200 text-gray-900"
          )}>
            Date: {date}
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className={cn(
            "border transition-colors duration-300",
            theme === "dark"
              ? "border-gray-700 hover:bg-[#1e293b]"
              : "border-gray-200 hover:bg-gray-50"
          )}>
            <TableHead className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Status</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Prepaid</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>COD</TableHead>
            <TableHead className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow 
              key={row.status}
              className={cn(
                "border transition-colors duration-300",
                theme === "dark"
                  ? "border-gray-700 hover:bg-[#1e293b] text-white"
                  : "border-gray-200 hover:bg-gray-50 text-gray-900"
              )}
            >
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.prepaid}</TableCell>
              <TableCell>{row.cod}</TableCell>
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
          <TableRow className={cn(
            "border font-semibold transition-colors duration-300",
            theme === "dark"
              ? "border-gray-700 hover:bg-[#1e293b] text-[#42C195]"
              : "border-gray-200 hover:bg-gray-50 text-[#2C7A7B]"
          )}>
            <TableCell>Grand Total</TableCell>
            <TableCell>{grandTotal.prepaid}</TableCell>
            <TableCell>{grandTotal.cod}</TableCell>
            <TableCell>{grandTotal.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

