"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Appbar } from "@/components/Appbar";
import FixedSideBar from "@/components/SideBar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [view, setView] = useState<'home' | 'warehouse' | 'AddWarehouse'>('home');
  
  const authenticatedRoutes = [
    '/dashboard', 
    '/storeorders', 
    '/createorder', 
    '/billing', 
    '/forward-order', 
    '/reverse-order',
    '/ndr',
    '/post-shipping',
    '/insights',
    '/weight-module',
    '/store-integration',
    '/addstore',
    '/settings',
    '/viewstore'
  ];

  const isAuthenticatedRoute = authenticatedRoutes.some(route => 
    pathname.startsWith(route)
  );

  if (!session || !isAuthenticatedRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Sidebar */}
      <div className="h-screen flex-shrink-0">
        <FixedSideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen overflow-hidden">
        {/* Fixed Appbar */}
        <div className="sticky top-0 z-50 shadow-md">
          <Appbar setView={setView} />
        </div>

        {/* Scrollable Content Area */}
        <div 
          // className="flex-grow overflow-y-auto p-6"
           className={cn(
                          "transition-all duration-300 flex-grow overflow-y-auto p-6",
                          theme === "dark"
                            ? "bg-[#1e293b] text-gray-100"
                            : "bg-gray-200 text-gray-900",
                        )}
          style={{
            filter: view === 'warehouse' ? "blur(8px)" : "none",
            // backgroundColor: '#1e293b'
          }}
        >
          {children}
        </div>
      </div>

      {/* Warehouse View Overlay */}
      <AnimatePresence>
        {view === 'warehouse' && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-[80vw] bg-[#1e293b] z-50 p-6 border-l border-[#42C195] shadow-xl"
          >
            {/* Warehouse content goes here */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthenticatedLayout;

