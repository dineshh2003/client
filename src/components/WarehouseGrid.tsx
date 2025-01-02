'use client'

import { Warehouse } from '@/types/warehouse'
import { WarehouseCard } from './WarehouseCard'

interface WarehouseGridProps {
  warehouses: Warehouse[]
}

export function WarehouseGrid({ warehouses }: WarehouseGridProps) {
  console.log("Rendering WarehouseGrid", warehouses) // Debug log

  if (!warehouses || warehouses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground">No warehouses found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {warehouses.map((warehouse) => (
        <WarehouseCard key={warehouse.ID} warehouse={warehouse} />
      ))}
    </div>
  )
}

