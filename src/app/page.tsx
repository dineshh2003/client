"use client";

import { motion} from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MainContent from "@/components/MainContent";
import { Navbar } from "@/components/Navbar";
import { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Component() {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);



  return (
    <div className="min-h-[400vh]">
      {/* Initial animation overlay */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ originX: 0 }}
        className="fixed inset-0 bg-primary z-50"
      />
      <Navbar/>
      <MainContent/>
      <HeroSection/>
    </div>
  );
}
