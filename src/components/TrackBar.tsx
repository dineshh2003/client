"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RefreshCw } from 'lucide-react'
import { useTheme } from "next-themes"
import { useSession } from "next-auth/react"
import { useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import { toast } from "sonner"

const SYNC_ORDERS = gql`
  mutation SyncOrders($accountId: String!) {
    syncOrders(accountId: $accountId) {
      overallSuccess
      message
      shopResults {
        shopName
        status {
          success
          errorMessage
          ordersCount
        }
      }
    }
  }
`;

interface TrackBarProps {
  onSync?: () => void;  // Made optional since we're handling sync internally now
}

const TrackBar: React.FC<TrackBarProps> = ({ onSync }) => {
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const { theme } = useTheme();
  const { data: session } = useSession();
  const [isSyncing, setIsSyncing] = useState(false);

  const [syncOrders] = useMutation(SYNC_ORDERS, {
    onCompleted: (data) => {
      setIsSyncing(false);
      if (data.syncOrders.overallSuccess) {
        toast.success(data.syncOrders.message || "Sync completed successfully");
        // Update last sync time
        setLastSync(new Date());
        // Call the optional onSync callback if provided
        if (onSync) onSync();
      } else {
        toast.error(data.syncOrders.message || "Sync failed");
      }
    },
    onError: (error) => {
      setIsSyncing(false);
      toast.error(error.message || "Failed to sync orders");
    }
  });

  const handleRefresh = async () => {
    if (!session?.user?.id) {
      toast.error("Please sign in to sync orders");
      return;
    }

    setIsSyncing(true);
    await syncOrders({
      variables: {
        accountId: session.user.id
      }
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const trackOptions = [
    "Store Order",
    "Ready to Dispatch",
    "Manifest",
    "In Transit",
    "Delivered",
    "RTO",
    "All"
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} font-sans`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 overflow-x-auto">
            {trackOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`${theme === 'dark' ? 'text-gray-300 hover:text-[#42C195] hover:bg-gray-700' : 'text-gray-600 hover:text-[#2C7A7B] hover:bg-gray-100'}`}
              >
                {option}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Last sync: {lastSync ? formatTime(lastSync) : 'Not synced yet'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isSyncing}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-[#42C195] hover:bg-gray-700' : 'text-gray-600 hover:text-[#2C7A7B] hover:bg-gray-100'}`}
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </div>
      <Separator className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} />
    </div>
  );
};

export default TrackBar;