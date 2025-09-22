"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"
import { Menu, X, ShoppingCart, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

type CustomerUser = {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  role?: string
}

export function Header() {
  const router = useRouter()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { getCartCount } = useCart()
  const cartCount = getCartCount()
  const [user, setUser] = useState<CustomerUser | null>(null)

  // Load user from localStorage
  useEffect(() => {
    const raw = localStorage.getItem("user")
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    toast({ title: "You have successfully logged out.", duration: 3000 })
    router.push("/")
  }

  const menuLinks = [
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
    { name: "Partners", href: "/partners" },
    { name: "Newsroom", href: "/news-room" },
    { name: "Services", href: "/services" },
  ]

  return (
    <header className="sticky top-0 z-50 py-2 bg-white border-b border-primary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-36">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/">
            <img
              className="w-36 px-2 object-cover"
              src="/chopNow.png"
              alt="ChopNow Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/restaurants" className="text-foreground hover:text-primary transition-colors">
              Restaurants
            </Link>
            <Link href="/offers" className="text-foreground hover:text-primary transition-colors">
              Offers
            </Link>
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Cart */}
            <Button variant="tertiary" size="sm" className="relative text-foreground cursor-pointer" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {cartCount > 0 && (
                  <Badge className="absolute bg-primary text-white -top-1 -right-1 text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full cursor-pointer" asChild>
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-transparent px-2 py-1 rounded-full shadow-none hover:bg-transparent"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold">
                      {user.firstName?.charAt(0).toUpperCase()}
                      {user.lastName?.charAt(0).toUpperCase()}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border border-primary/50 bg-white">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-foreground leading-none">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary/50" />
                  <DropdownMenuItem
                    className="hover:bg-primary text-foreground hover:text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2 hover:text-white" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/user-signIn">
                <Button size="sm" className="flex items-center gap-2 cursor-pointer bg-primary text-white px-8 py-5">
                  <span className="text-[15px]">Log In</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden cursor-pointer"
              onClick={() => setIsSheetOpen(true)}
            >
              <Menu className="w-5 h-5 transition-all duration-300" />
            </Button>
          </div>
        </div>

        {/* Mobile Sheet Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
            isSheetOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSheetOpen(false)}
        />

        {/* Mobile Sheet Panel (from left) */}
        <div
          className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 shadow-xl transform transition-transform duration-300 ${
            isSheetOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 space-y-4">
          <Button
  onClick={() => setIsSheetOpen(false)}
  className="bg-gray-200 text-gray-700 w-10 h-10 flex items-center justify-center rounded-full p-0"
>
  <X className="w-5 h-5" />
</Button>


            <Link href="/restaurants" onClick={() => setIsSheetOpen(false)} className="block text-lg text-foreground hover:text-primary transition-colors">
              Restaurants
            </Link>
            <Link href="/offers" onClick={() => setIsSheetOpen(false)} className="block text-lg text-foreground hover:text-primary transition-colors">
              Offers
            </Link>
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsSheetOpen(false)}
                className="block text-lg text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
