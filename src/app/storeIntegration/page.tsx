"use client"

import React from "react"
import { motion } from "framer-motion"
import { useTheme } from 'next-themes'
import { Button } from "@/components/ui/button"

const StoreIntegrationPage: React.FC = () => {
  const { theme } = useTheme()

  const handleIntegrateStore = () => {
    window.location.href = "/api/shopify/auth?shop=quickstart-5091d5ef.myshopify.com"
  }

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
      >
        <h1 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Integrate Your Store
        </h1>
        <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Connect your Shopify store and start managing your orders seamlessly.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleIntegrateStore}
            size="lg"
            className="text-lg font-semibold"
          >
            Integrate Store with Shopify
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StoreIntegrationPage;

