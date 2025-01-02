import { Suspense } from 'react'
import { useSession } from "next-auth/react"
import { gql, useQuery } from '@apollo/client'
import { Warehouse } from '@/types/warehouse'
import { WarehouseGrid } from './WarehouseGrid'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface WarehousesPageProps {
  open?: boolean;
  onClose?: () => void;
}

const GET_WAREHOUSES = gql`
  query GetWarehouses($userID: String!) {
    getWareHouses(userID: $userID) {
      id
      userID
      contactPerson
      contactNumber
      emailAddress
      completeAddress
      landmark
      pincode
      city
      state
      country
    }
  }
`;

function WarehouseSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

function WarehouseGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <WarehouseSkeleton key={i} />
      ))}
    </div>
  )
}

function WarehouseList() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { loading, error, data } = useQuery(GET_WAREHOUSES, {
    variables: { userID: userId },
    skip: !userId,
  });

  if (loading) return <WarehouseGridSkeleton />;
  if (error) return <div className="text-red-500">Error loading warehouses: {error.message}</div>;
  if (!data) return <div className="text-gray-500">No warehouses found</div>;

  return <WarehouseGrid warehouses={data.getWareHouses} />;
}

export default function WarehousesPage({ open = false, onClose }: WarehousesPageProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-[90vw] h-[90vh] max-w-7xl dark border border-purple-500/20 shadow-lg shadow-purple-500/10 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b border-purple-500/20">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Warehouses
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6 overflow-y-auto h-[calc(90vh-5rem)]">
          <WarehouseList />
        </CardContent>
      </Card>
    </div>
  )
}