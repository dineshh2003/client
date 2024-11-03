"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";


const StoreIntegrationPage: React.FC = () => {

  // const {data : session} = useSession();

  // if(!session?.user){
  //   return <h1>access denied</h1>
  // }

  const handleIntegrateStore = () => {
    // Redirect to backend route to handle Shopify OAuth flow
    window.location.href =
      "/api/shopify/auth?shop=quickstart-5091d5ef.myshopify.com";
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">
          Integrate Your Store
        </h1>
        <p className="text-lg text-white mb-8">
          Connect your Shopify store and start managing your orders seamlessly.
        </p>

        <motion.button
          onClick={handleIntegrateStore}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Integrate Store with Shopify
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StoreIntegrationPage;

