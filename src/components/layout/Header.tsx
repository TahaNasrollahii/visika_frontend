"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, MapPin, ChevronDown, X, Plus } from "lucide-react"
import * as Dialog from '@radix-ui/react-dialog'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const defaultAddresses = [
  { id: 1, title: "خانه", detail: "تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۲، واحد ۳" },
  { id: 2, title: "محل کار", detail: "تهران، خیابان ولیعصر، برج سپهر، طبقه ۴، واحد ۴۰۲" }
]

export function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [addresses, setAddresses] = useState(defaultAddresses)
  const [selectedAddress, setSelectedAddress] = useState(defaultAddresses[0])
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("")

  // New address form state
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDetail, setNewDetail] = useState("")

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

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newDetail.trim()) {
      toast.error("لطفا عنوان و جزئیات آدرس را وارد کنید")
      return
    }
    
    const newAddress = {
      id: Date.now(),
      title: newTitle,
      detail: newDetail
    }
    
    setAddresses([...addresses, newAddress])
    setSelectedAddress(newAddress)
    setIsAddingNew(false)
    setNewTitle("")
    setNewDetail("")
    setIsAddressModalOpen(false)
    toast.success("آدرس جدید با موفقیت ثبت شد")
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

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Right Section: Logo & Location */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-sm">
                <Image src="/logo.png" alt="Vizika Logo" fill className="object-cover" />
              </div>
              <span className="font-bold text-2xl tracking-tight hidden md:block text-primary">
                ویزیکا
              </span>
            </Link>

            {/* Location selector (Desktop) via Radix Dialog */}
            <Dialog.Root open={isAddressModalOpen} onOpenChange={(open) => {
              setIsAddressModalOpen(open)
              if (!open) {
                // Reset form state when closed
                setTimeout(() => setIsAddingNew(false), 200)
              }
            }}>
              <Dialog.Trigger asChild>
                <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors bg-secondary/50 px-3 py-2 rounded-lg max-w-[200px]">
                  <MapPin className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate">ارسال به {selectedAddress.title}</span>
                  <ChevronDown className="w-3 h-3 shrink-0" />
                </div>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content 
                  dir="rtl"
                  className="fixed left-[50%] top-[50%] z-[100] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl"
                >
                  <div className="flex flex-col space-y-1.5 text-right">
                    <Dialog.Title className="text-xl font-bold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {isAddingNew ? "ثبت آدرس جدید" : "انتخاب آدرس"}
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-muted-foreground">
                      {isAddingNew ? "اطلاعات آدرس جدید خود را وارد کنید." : "آدرس مورد نظر برای دریافت سفارش را انتخاب کنید."}
                    </Dialog.Description>
                  </div>
                  
                  {isAddingNew ? (
                    <form onSubmit={handleAddNewAddress} className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">عنوان آدرس (مثلا: خانه، محل کار)</label>
                        <Input 
                          placeholder="عنوان آدرس" 
                          value={newTitle} 
                          onChange={(e) => setNewTitle(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">آدرس دقیق</label>
                        <textarea 
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="استان، شهر، خیابان، کوچه، پلاک..."
                          value={newDetail}
                          onChange={(e) => setNewDetail(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-3 mt-2">
                        <Button type="submit" className="flex-1">ثبت آدرس</Button>
                        <Button type="button" variant="outline" onClick={() => setIsAddingNew(false)} className="flex-1">انصراف</Button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                      {addresses.map((address) => (
                        <div 
                          key={address.id}
                          onClick={() => {
                            setSelectedAddress(address)
                            setIsAddressModalOpen(false)
                          }}
                          className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedAddress.id === address.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-muted hover:border-primary/50'}`}
                        >
                          <div className={`w-5 h-5 mt-0.5 shrink-0 rounded-full border-2 flex items-center justify-center ${selectedAddress.id === address.id ? 'border-primary' : 'border-muted-foreground'}`}>
                            {selectedAddress.id === address.id && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                          </div>
                          <div>
                            <div className={`font-bold ${selectedAddress.id === address.id ? 'text-primary' : 'text-foreground'}`}>{address.title}</div>
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{address.detail}</p>
                          </div>
                        </div>
                      ))}
                      
                      <Button onClick={() => setIsAddingNew(true)} variant="outline" className="w-full h-14 rounded-xl border-dashed gap-2 border-2 text-primary hover:text-primary hover:bg-primary/5 transition-colors">
                        <Plus className="w-5 h-5" />
                        ثبت آدرس جدید
                      </Button>
                    </div>
                  )}
                  
                  <Dialog.Close asChild>
                    <button className="absolute left-4 top-4 rounded-full p-2 opacity-70 transition-opacity hover:opacity-100 hover:bg-secondary focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                      <X className="h-4 w-4" />
                      <span className="sr-only">بستن</span>
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>

          {/* Middle Section: Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:flex">
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در هزاران محصول..."
                className="w-full pl-4 pr-10 h-12 rounded-full border-muted bg-secondary/50 focus-visible:bg-background focus-visible:ring-primary shadow-inner"
              />
            </form>
          </div>

          {/* Left Section: Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/search" className="md:hidden">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
            </Link>
            
            <div className="hidden sm:flex items-center gap-2 border-l pl-4 ml-2">
              <Link href="/login" tabIndex={-1}>
                <Button variant="ghost" className="gap-2 rounded-full px-4 font-semibold">
                  <User className="w-5 h-5" />
                  ورود | ثبت‌نام
                </Button>
              </Link>
            </div>

            <Link href="/cart" tabIndex={-1}>
              <Button variant="outline" className="relative rounded-full w-12 h-12 p-0 border-muted-foreground/20 hover:border-primary/50 transition-colors">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px]"
                >
                  3
                </Badge>
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Nav / Categories Menu (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 h-12 text-sm font-medium text-muted-foreground border-t">
          <Link href="/categories" tabIndex={-1}>
            <Button variant="ghost" className="gap-2 font-bold text-foreground hover:bg-secondary rounded-lg px-3">
              <Menu className="w-5 h-5" />
              دسته‌بندی کالاها
            </Button>
          </Link>
          <Link href="/offers" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            تخفیف‌ها و پیشنهادها
          </Link>
          <Link href="/best-selling" className="hover:text-primary transition-colors">پرفروش‌ترین‌ها</Link>
          <Link href="/newest" className="hover:text-primary transition-colors">جدیدترین‌ها</Link>
          <Link href="/about" className="hover:text-primary transition-colors">سوالی دارید؟</Link>
        </div>
      </div>
    </header>
  )
}
