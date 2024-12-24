"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { Appbar } from "@/components/Appbar";
import FixedSideBar from "@/components/SideBar";
import { motion, AnimatePresence } from "framer-motion";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [view, setView] = useState<'home' | 'warehouse'>('home');

  // List of authenticated routes where sidebar and navbar should be shown
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

  // Check if current route is an authenticated route
  const isAuthenticatedRoute = authenticatedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If not an authenticated route or no session, render children normally
  if (!session || !isAuthenticatedRoute) {
    return <>{children}</>;
  }

  // Render layout for authenticated routes
  return (
    <div className="flex h-screen bg-slate-800 overflow-hidden">
      {/* Sidebar */}
      <FixedSideBar />

      {/* Main Content Area with Fixed Appbar */}
      <div className="flex-grow flex flex-col overflow-hidden relative">
        {/* Fixed Appbar */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Appbar setView={setView} />
        </div>

        {/* Scrollable Content Area */}
        <div 
          className="flex-grow overflow-y-auto pt-16 p-4"
          style={{
            filter: view === 'warehouse' ? "blur(8px)" : "none"
          }}
        >
          {children}
        </div>
      </div>

      {/* Warehouse View (if applicable) */}
      <AnimatePresence>
        {view === 'warehouse' && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-[80vw] bg-[#292b35] z-10 p-4 border-l border-[#42C195]"
          >
            {/* Warehouse Component Placeholder */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthenticatedLayout;