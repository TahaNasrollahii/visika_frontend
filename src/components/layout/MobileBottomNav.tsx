"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ShoppingCart, User, Grid2x2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "خانه", href: "/", icon: Home },
    { name: "دسته‌بندی", href: "/categories", icon: Grid2x2 },
    { name: "سبد خرید", href: "/cart", icon: ShoppingCart, badge: 3 },
    { name: "پروفایل", href: "/profile", icon: User },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg border-t pb-safe">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("w-6 h-6", isActive && "fill-primary/20")} strokeWidth={isActive ? 2.5 : 2} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-destructive text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-background">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
