'use client'

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const sessionData = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.7)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const signInHandler = () => {
    router.push('/login')
  }

  const signupHandler = () => {
    router.push('/register')
  }

  const renderAuthButtons = () => {
    if (!sessionData) {
      return (
        <div className="text-gray-600">Loading...</div>
      )
    }

    if (sessionData.status === "authenticated") {
      return (
        <Button variant="outline" className="ml-4" onClick={() => signOut()}>
          Sign Out
        </Button>
      )
    }

    return (
      <>
        <Button variant="outline" className="ml-4" onClick={signInHandler}>
          Sign In
        </Button>
        <Button variant="outline" className="ml-4" onClick={signupHandler}>
          Sign Up
        </Button>
      </>
    )
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div
          className={`font-bold text-3xl transition-all duration-300 ease-in-out ${
            isScrolled ? "text-gray-600 hover:text-primary" : "text-white"
          }`}
        >
          ShipEase
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {["Solutions", "Pricing", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className={`transition-colors duration-300 ease-in-out ${
                isScrolled
                  ? "text-gray-600 hover:text-primary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
          {renderAuthButtons()}
        </nav>
        <Button
          variant={isScrolled ? "outline" : "secondary"}
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>
    </header>
  )
}

