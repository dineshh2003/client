import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { type OrderSummary } from "../types/order"
  
  interface SndOrderSummaryProps {
    date: string
    data: OrderSummary[]
  }
  
  export function SndOrderSummary({ date, data }: SndOrderSummaryProps) {
    const grandTotal = data.reduce(
      (acc, row) => ({
        prepaid: acc.prepaid + row.prepaid,
        cod: acc.cod + row.cod,
        total: acc.total + row.total,
      }),
      { prepaid: 0, cod: 0, total: 0 }
    )
  
    return (
      <div className="rounded-lg bg-gray-900 p-6 text-white">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">SND Order Summary</h2>
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-gray-700">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-gray-700">
                <SelectValue placeholder="Courier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <div className="rounded bg-gray-700 px-4 py-2">Date: {date}</div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-gray-800">
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Prepaid</TableHead>
              <TableHead className="text-gray-300">COD</TableHead>
              <TableHead className="text-gray-300">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.status} className="border-gray-700 hover:bg-gray-800">
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.prepaid}</TableCell>
                <TableCell>{row.cod}</TableCell>
                <TableCell>{row.total}</TableCell>
              </TableRow>
            ))}
            <TableRow className="border-gray-700 font-semibold hover:bg-gray-800">
              <TableCell>Grand Total</TableCell>
              <TableCell>{grandTotal.prepaid}</TableCell>
              <TableCell>{grandTotal.cod}</TableCell>
              <TableCell>{grandTotal.total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
  
  