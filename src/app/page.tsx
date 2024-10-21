"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const { isLoaded, userId } = useAuth(); // Check authentication state
  const { user } = useUser(); // Get user information if logged in
  const router = useRouter();

  // Redirect to store orders if authenticated
  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/storeorders");
    }
  }, [isLoaded, userId, router]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)] gap-4 bg-gradient-to-r from-b2 to-b3">
      {/* Image Section with Animation */}
      <motion.div
        className="flex flex-1 items-center justify-center md:justify-end my-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Image
          src="https://itl-website-aws.s3.ap-south-1.amazonaws.com/manage/assets/images/home-page-home-logistic-services2x.png"
          height={1000}
          width={1000}
          alt="Landing Image"
          className="max-w-full h-auto"
        />
      </motion.div>

      {/* Text Section with Animation */}
      <motion.div
        className="flex flex-1 flex-col justify-center items-center gap-5 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-7xl font-bold text-green"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.8 } }}
        >
          Welcome to Logistics
        </motion.h1>
        <motion.p
          className="text-5xl text-slate-400"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.8 } }}
        >
          Delivering the future, today.
        </motion.p>

        {/* Conditional Buttons with Loading State */}
        <motion.div
          className="flex gap-4 text-3xl "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.0, duration: 0.8 } }}
        >
          {isLoaded ? (
            userId ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className="bg-red-500 text-white py-2 px-4 rounded shadow-lg hover:bg-red-600"
                >
                  Logout
                </Link>
                <Link
                  href="/storeorders"
                  className="bg-blue-600 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-700"
                >
                  Go to Store Orders
                </Link>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600"
              >
                Login
              </Link>
            )
          ) : (
            <p>Loading...</p>
          )}
        </motion.div>

        {/* Social Media Links */}
      </motion.div>
    </div>
  );
}
