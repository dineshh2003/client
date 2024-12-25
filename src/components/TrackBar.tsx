"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RefreshCw } from 'lucide-react'

interface TrackBarProps {
  onSync: () => void;
}

const TrackBar: React.FC<TrackBarProps> = ({ onSync }) => {
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const handleRefresh = () => {
    onSync();
    setLastSync(new Date());
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
    <div className="bg-gray-900 font-sans text-gray-400">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {trackOptions.map((option, index) => (
              <Button
                key={index}
                variant="ghost"
                className="text-gray-400 hover:text-[#42C195] hover:bg-gray-800"
              >
                {option}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              Last sync: {lastSync ? formatTime(lastSync) : 'Not synced yet'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className="text-gray-400 hover:text-[#42C195] hover:bg-gray-800"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Separator className="bg-gray-800" />
    </div>
  );
};

export default TrackBar;

