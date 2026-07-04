"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("")

  // Add scroll event listener for sticky header styling (glassmorphism)
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-background border-b"
      }`}
    >
      {/* Top Banner (Optional for promos) */}
      <div className="bg-primary text-primary-foreground py-1.5 text-xs text-center font-medium">
        ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان!
      </div>

      <div className="container mx-auto px-4 lg:px-8 pb-3 md:pb-0">
        {/* Desktop: Single Row. Mobile: Two Rows (Top Nav + Search) */}
        <div className="flex flex-col md:flex-row md:h-[88px] justify-center md:items-center justify-between gap-3 md:gap-4 pt-3 md:pt-0">
          
          {/* Mobile Top Row */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Right Section: Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-3">
              <div className="w-10 h-10 md:w-[42px] md:h-[42px] bg-primary rounded-full flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl md:text-[22px] tracking-tight text-foreground leading-tight">
                  ویزیکا
                </span>
                <span className="text-[10px] md:text-[11px] text-muted-foreground font-medium hidden md:block">
                  فروشگاه هوشمند
                </span>
              </div>
            </Link>

            {/* Mobile Actions (Hidden on Desktop) */}
            <div className="flex md:hidden items-center gap-1">
              <Link href="/login" tabIndex={-1}>
                <Button variant="ghost" size="icon" className="text-foreground/80 hover:bg-secondary/80 rounded-full h-10 w-10">
                  <User className="w-[22px] h-[22px]" />
                </Button>
              </Link>
              <Link href="/cart" tabIndex={-1}>
                <Button variant="ghost" size="icon" className="relative text-foreground/80 hover:bg-secondary/80 rounded-full h-10 w-10">
                  <ShoppingBag className="w-[22px] h-[22px]" />
                  <div className="absolute top-1.5 right-1.5 bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background">
                    ۱
                  </div>
                </Button>
              </Link>
            </div>
          </div>

          {/* Middle Section: Search Bar (Full width on mobile, flexible on desktop) */}
          <div className="flex-1 w-full md:max-w-3xl md:mx-6">
            <form onSubmit={handleSearch} className="relative w-full group flex items-center">
              <Search 
                strokeWidth={1.5}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-muted-foreground group-focus-within:text-primary transition-colors" 
              />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جست‌وجو در بین بیش از ۱۰,۰۰۰ محصول..."
                className="w-full pr-11 md:pr-[46px] pl-4 md:pl-[70px] h-12 md:h-[48px] rounded-full border-none md:border-solid border-input bg-secondary/60 md:bg-background focus-visible:ring-1 focus-visible:ring-primary shadow-none text-[13px] md:text-[13.5px] font-medium placeholder:text-muted-foreground/70"
              />
              <div className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[11px] font-medium px-3 py-1.5 rounded-xl">
                Ctrl K
              </div>
            </form>
          </div>

          {/* Desktop Left Section: Actions (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-2 md:gap-5 shrink-0">
            <Link href="/login" tabIndex={-1}>
              <Button variant="ghost" className="gap-2 text-foreground/80 hover:text-foreground font-semibold text-sm px-3 hover:bg-secondary/80 h-11 rounded-xl">
                <User className="w-[22px] h-[22px]" />
                حساب کاربری
              </Button>
            </Link>

            <Link href="/cart" tabIndex={-1}>
              <Button className="h-[46px] px-5 rounded-full gap-2 font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all flex items-center text-sm">
                <ShoppingBag className="w-5 h-5" />
                <span>سبد خرید</span>
                <div className="bg-white/20 text-white w-6 h-6 rounded-full flex items-center justify-center text-[13px] pt-[2px] ml-1">
                  ۱
                </div>
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Nav / Categories Menu (Desktop) */}
        <div className="hidden lg:flex items-center justify-between h-14 text-sm font-medium text-muted-foreground border-t mt-2">
          
          <div className="flex items-center gap-6 h-full">
            <div className="relative group h-full flex items-center">
              <Link href="/categories" tabIndex={-1}>
                <Button variant="ghost" className="gap-2 font-bold text-foreground hover:bg-secondary rounded-lg px-3">
                  <LayoutGrid className="w-5 h-5" />
                  همه دسته‌بندی‌ها
                </Button>
              </Link>

              {/* Mega Menu Dropdown */}
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[650px] z-50">
                <div className="bg-background border rounded-3xl shadow-xl overflow-hidden p-6 flex flex-col gap-6">
                  
                  {/* Categories Columns */}
                  <div className="grid grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-3">
                      <Link href="/categories/fruits" className="font-bold text-foreground flex items-center gap-2 hover:text-primary transition-colors">
                        <span className="text-xl">🍎</span>
                        میوه‌جات
                      </Link>
                      <div className="flex flex-col gap-2.5 pr-7 text-[13px] text-muted-foreground">
                        <Link href="#" className="hover:text-foreground transition-colors">سیب و گلابی</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">مرکبات</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">موز و آناناس</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">میوه‌های فصلی</Link>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-3">
                      <Link href="/categories/dairy" className="font-bold text-foreground flex items-center gap-2 hover:text-primary transition-colors">
                        <span className="text-xl">🧀</span>
                        لبنیات و پروتئین
                      </Link>
                      <div className="flex flex-col gap-2.5 pr-7 text-[13px] text-muted-foreground">
                        <Link href="#" className="hover:text-foreground transition-colors">شیر و ماست</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">پنیر</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">تخم‌مرغ</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">مرغ و گوشت</Link>
                      </div>
                    </div>

                    {/* Column 3 */}
                    <div className="flex flex-col gap-3">
                      <Link href="/categories/bakery" className="font-bold text-foreground flex items-center gap-2 hover:text-primary transition-colors">
                        <span className="text-xl">🍞</span>
                        نان و غلات
                      </Link>
                      <div className="flex flex-col gap-2.5 pr-7 text-[13px] text-muted-foreground">
                        <Link href="#" className="hover:text-foreground transition-colors">نان تازه</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">برنج و حبوبات</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">ماکارونی</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">صبحانه</Link>
                      </div>
                    </div>
                  </div>

                  {/* Promotional Banner */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-bold text-blue-600 dark:text-blue-400">تخفیف ویژه میوه‌های تابستانی 🍉</span>
                      <span className="text-[11px] text-muted-foreground mt-1">تا ۳۰٪ تخفیف روی محصولات منتخب</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 h-8 text-xs font-bold shadow-md">
                      مشاهده
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <Link href="/" className="text-primary border-b-2 border-primary py-4 font-bold">خانه</Link>
            <Link href="/categories/fruits" className="hover:text-foreground py-4 transition-colors">میوه و سبزیجات</Link>
            <Link href="/categories/dairy" className="hover:text-foreground py-4 transition-colors">لبنیات و پروتئین</Link>
            <Link href="/categories/bakery" className="hover:text-foreground py-4 transition-colors">نان و غلات</Link>
            <Link href="/offers" className="text-destructive hover:text-destructive/80 py-4 transition-colors font-bold">
              پیشنهادهای داغ 🔥
            </Link>
          </div>

          <div className="flex items-center gap-6 h-full text-[13px]">
            <Link href="/about" className="hover:text-foreground transition-colors">درباره ما</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">تماس با ما</Link>
            <Link href="/faq" className="hover:text-foreground transition-colors">سوالات متداول</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
