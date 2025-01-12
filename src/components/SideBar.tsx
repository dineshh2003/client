// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Home,
//   Mail,
//   ShoppingBag,
//   Truck,
//   ArrowLeftRight,
//   Wallet,
//   ChevronDown,
//   ChevronRight,
//   Package,
//   AlertCircle,
//   Repeat,
//   Sun,
//   Scale,
//   Grid,
//   Settings
// } from "lucide-react"; // Replace with ShadCN-compatible icons
// import { Button } from "@/components/ui/button";

// const bgColor = "#121212"; // Drawer background color

// const menuItems = [
//   { text: "Home", icon: <Home />, route: "/dashboard" },
//   {
//     text: "Forward Order",
//     icon: <ShoppingBag />,
//     subItems: [
//       { text: "Create Order", route: "/createorder" },
//       { text: "Store Order", route: "/storeorders" },
//       { text: "Ready to Dispatch", route: "/ready-to-dispatch" },
//       { text: "Manifest", route: "/manifest" },
//       { text: "Intransit", route: "/intransit" },
//       { text: "Delivered", route: "/delivered" },
//       { text: "RTO", route: "/rto" },
//       { text: "All", route: "/all" },
//     ],
//   },
//   { text: "Reverse Order", icon: <ArrowLeftRight />, subItems: [
//     { text: "Create Order", route: "/createorder" },
//     { text: "Store Order", route: "/storeorders" },
//     { text: "Ready to Dispatch", route: "/ready-to-dispatch" },
//     { text: "Manifest", route: "/manifest" },
//     { text: "Intransit", route: "/intransit" },
//     { text: "Delivered", route: "/delivered" },
//     { text: "RTO", route: "/rto" },
//     { text: "All", route: "/all" },
//   ], },
//   { text: "Billing", icon: <Wallet />, route: "/billing" },
//   { text: "Forward Order", icon: <Package />, route: "/forward-order" },
//   { text: "Reverse Order", icon: <ArrowLeftRight />, route: "/reverse-order" },
//   { text: "NDR", icon: <AlertCircle />, route: "/ndr" },
//   { text: "Billing", icon: <Repeat />, route: "/billing" },
//   { text: "Post Shipping", icon: <Truck />, route: "/post-shipping" },
//   { text: "Insights", icon: <Sun />, route: "/insights" },
//   { text: "Weight Module", icon: <Scale />, route: "/weight-module" },
//   { text: "Store Integration", icon: <Grid />,  subItems: [
//     { text: "view store", route: "/viewstore" },
//     { text: "add store", route: "/addstore" },
//     {text  : "storeIntegrate" , route : "/storeIntegration"}
// ]},
// {
//   text: "Settings", icon: <Settings/>, subItems: [
//     { text: "bank", route: "/settings/bank" },
//     { text: "company", route: "/settings/bank" },
//     { text: "bank", route: "/settings/bank" },
//   ]
// },
// ];

// const FixedSideBar: React.FC = () => {
//   const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
//   const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
//   const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
//   const router = useRouter();

//   const handleListItemClick = (route: string) => {
//     setSelectedIndex(route);
//     router.push(route);
//   };

//   const toggleSubMenu = (menu: string) => {
//     setExpandedMenu(expandedMenu === menu ? null : menu);
//   };

//   return (
//     <div className="flex h-screen overflow-scroll scrollbar-hide">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarExpanded ? "w-72" : "w-20"
//         } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
//         onMouseEnter={() => setIsSidebarExpanded(true)}
//         onMouseLeave={() => setIsSidebarExpanded(false)}
//       >
//         {/* Logo Section */}
//         <div className="flex items-center justify-center p-4">
//           <img
//             src="/path-to-logo.png" // Replace with the correct path to your logo
//             alt="Logo"
//             className={`${
//               isSidebarExpanded ? "w-20 h-20" : "w-12 h-12"
//             } transition-all duration-300`}
//           />
//         </div>

//         <nav className="flex-grow">
//           {menuItems.map((item) => (
//             <div key={item.text}>
//               <div
//                 className={`flex items-center justify-between gap-4 p-3 cursor-pointer transition-colors duration-200 ${
//                   selectedIndex === item.route
//                     ? "bg-gray-800 text-green-400"
//                     : "text-gray-400 hover:bg-gray-800"
//                 }`}
//                 onClick={() =>
//                   item.subItems
//                     ? toggleSubMenu(item.text)
//                     : handleListItemClick(item.route!)
//                 }
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="text-xl">{item.icon}</div>
//                   {isSidebarExpanded && <span>{item.text}</span>}
//                 </div>
//                 {isSidebarExpanded &&
//                   item.subItems &&
//                   (expandedMenu === item.text ? (
//                     <ChevronDown className="w-5 h-5" />
//                   ) : (
//                     <ChevronRight className="w-5 h-5" />
//                   ))}
//               </div>
//               {/* Submenu */}
//               {isSidebarExpanded && expandedMenu === item.text && item.subItems && (
//                 <div className="ml-8">
//                   {item.subItems.map((subItem) => (
//                     <div
//                       key={subItem.text}
//                       className={`flex items-center gap-4 p-2 cursor-pointer transition-colors duration-200 ${
//                         selectedIndex === subItem.route
//                           ? "bg-gray-800 text-green-400"
//                           : "text-gray-400 hover:bg-gray-800"
//                       }`}
//                       onClick={() => handleListItemClick(subItem.route)}
//                     >
//                       {isSidebarExpanded && <span>{subItem.text}</span>}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default FixedSideBar;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Home,
  ShoppingBag,
  ArrowLeftRight,
  Wallet,
  Package,
  AlertCircle,
  Repeat,
  Sun,
  Scale,
  Grid,
  Settings,
  ChevronDown,
  ChevronRight,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = [
  { text: "Home", icon: Home, route: "/dashboard", color: "text-blue-400" },
  {
    text: "Forward Order",
    icon: ShoppingBag,
    color: "text-green-400",
    subItems: [
      { text: "Create Order", route: "/createorder" },
      { text: "Store Order", route: "/storeorders" },
      { text: "Ready to Dispatch", route: "/ready-to-dispatch" },
      { text: "Manifest", route: "/manifest" },
      { text: "Intransit", route: "/intransit" },
      { text: "Delivered", route: "/delivered" },
      { text: "RTO", route: "/rto" },
      { text: "All", route: "/all" },
    ],
  },
  {
    text: "Reverse Order",
    icon: ArrowLeftRight,
    color: "text-yellow-400",
    subItems: [
      { text: "Create Order", route: "/" },
      { text: "Store Order", route: "/" },
      { text: "Ready to Dispatch", route: "/" },
      { text: "Manifest", route: "/" },
      { text: "Intransit", route: "/" },
      { text: "Delivered", route: "/" },
      { text: "RTO", route: "/" },
      { text: "All", route: "/" },
    ],
  },
  {
    text: "Billing",
    icon: Wallet,
    route: "/billing",
    color: "text-purple-400",
  },
  {
    text: "Forward Order",
    icon: Package,
    route: "/forward-order",
    color: "text-indigo-400",
  },
  {
    text: "Reverse Order",
    icon: ArrowLeftRight,
    route: "/reverse-order",
    color: "text-pink-400",
  },
  { text: "NDR", icon: AlertCircle, route: "/ndr", color: "text-red-400" },
  {
    text: "Billing",
    icon: Repeat,
    route: "/billing",
    color: "text-orange-400",
  },
  {
    text: "Post Shipping",
    icon: Truck,
    route: "/post-shipping",
    color: "text-teal-400",
  },
  { text: "Insights", icon: Sun, route: "/insights", color: "text-yellow-400" },
  {
    text: "Weight Module",
    icon: Scale,
    route: "/weight-module",
    color: "text-green-400",
  },
  {
    text: "Store Integration",
    icon: Grid,
    color: "text-blue-400",
    subItems: [
      { text: "View Store", route: "/viewstore" },
      { text: "Add Store", route: "/addstore" },
      { text: "Store Integrate", route: "/storeIntegration" },
    ],
  },
  {
    text: "Settings",
    icon: Settings,
    color: "text-gray-400",
    subItems: [
      { text: "Bank", route: "/settings/bank" },
      { text: "Company", route: "/settings/company" },
      { text: "Profile", route: "/settings/profile" },
    ],
  },
];

const FixedSideBar: React.FC = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleListItemClick = (route: string) => {
    setSelectedIndex(route);
    router.push(route);
  };

  const toggleSubMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <div className="flex h-screen">
      <div
        className={cn(
          "transition-all duration-300 flex flex-col",
          theme === "dark"
            ? "bg-[#111827] text-gray-100"
            : "bg-white text-gray-900",
          isSidebarExpanded ? "w-64" : "w-20"
        )}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <div
          className={cn(
            "flex items-center justify-center p-4 border-b",
            theme === "dark" ? "border-gray-900" : "border-gray-200"
          )}
        >
          <img
            src="/rocket.png"
            alt="Logo"
            className={cn(
              "transition-all duration-300",
              isSidebarExpanded ? "w-16 h-16" : "w-8 h-8"
            )}
          />
        </div>

        <ScrollArea className="flex-grow">
          <nav className="p-2">
            {menuItems.map((item) => (
              <div key={item.text} className="mb-2">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    selectedIndex === item.route &&
                      (theme === "dark"
                        ? "bg-gray-800 text-white"
                        : "bg-gray-200 text-gray-900"),
                    !isSidebarExpanded && "px-2",
                    theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  )}
                  onClick={() =>
                    item.subItems
                      ? toggleSubMenu(item.text)
                      : handleListItemClick(item.route!)
                  }
                >
                  <item.icon className={cn("h-5 w-5 mr-2", item.color)} />
                  {isSidebarExpanded && (
                    <span className="flex-grow">{item.text}</span>
                  )}
                  {isSidebarExpanded &&
                    item.subItems &&
                    (expandedMenu === item.text ? (
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    ) : (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    ))}
                </Button>
                {isSidebarExpanded &&
                  expandedMenu === item.text &&
                  item.subItems && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            selectedIndex === item.route &&
                              (theme === "dark"
                                ? "bg-[#1e293b] text-[#42C195]"
                                : "bg-gray-200 text-gray-900"),
                            !isSidebarExpanded && "px-2",
                            theme === "dark"
                              ? "hover:bg-[#1e293b] hover:text-[#42C195]"
                              : "hover:bg-gray-100"
                          )}
                          onClick={() => handleListItemClick(subItem.route)}
                        >
                          {subItem.text}
                        </Button>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
};

export default FixedSideBar;
