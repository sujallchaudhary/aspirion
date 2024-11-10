'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Brain, Moon, Sun, User, LogOut } from "lucide-react"
import Link from "next/link"

interface UserData {
  name: string;
  email: string;
  profilePic?: string;
}

export default function Navbar() {
  const [theme, setTheme] = useState('dark')
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')

    const savedUserData = localStorage.getItem('userData')
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    setUserData(null)
    // Add any additional logout logic here (e.g., redirecting to home page)
  }

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 dark:border-gray-800">
      <Link className="flex items-center justify-center" href="/">
        <Brain className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Aspirion</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
          Features
        </Link>
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
          About
        </Link>
        <Link className="text-sm font-medium text-gray-900 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400" href="#">
          Contact
        </Link>
        <Button variant="ghost" size="icon" className="ml-2" onClick={toggleTheme}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        {userData ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userData.profilePic} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
            <Link href={'/dashboard'}>
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="font-medium">{userData.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</div>
              </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button variant="outline" size="sm" className="ml-2">
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        )}
      </nav>
    </header>
  )
}