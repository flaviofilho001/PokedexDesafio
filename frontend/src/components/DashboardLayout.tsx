'use client'

import { motion } from 'framer-motion'
import { LogOut, Menu, X, LayoutDashboard, Boxes } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/features/auth/hooks/useAuthStore'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Boxes, label: 'Pokémons', href: '/dashboard/pokemons' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-card border-b border-border"
      >
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
            >
              <svg viewBox="0 0 100 100" className="w-6 h-6 text-white">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" />
                <circle cx="50" cy="50" r="12" fill="currentColor" />
                <line x1="5" y1="50" x2="38" y2="50" stroke="currentColor" strokeWidth="5" />
                <line x1="62" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="5" />
              </svg>
            </motion.div>
            <h1 className="text-xl font-bold text-foreground hidden sm:block">
              Centro Pokémon
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                onClick={() => router.push(item.href)}
                className="gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2 pr-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-white text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium">{user?.name || 'Usuário'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-30 md:hidden p-4"
          >
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    router.push(item.href)
                    setIsSidebarOpen(false)
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </motion.aside>
        </>
      )}

      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
