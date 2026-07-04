"use client"

import React, { useState } from "react"
import { Filter, ChevronDown, ChevronUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

// --- Helper Components for the Sidebar ---

function Accordion({ title, isOpen, onToggle, children }: { title: string, isOpen: boolean, onToggle: () => void, children: React.ReactNode }) {
  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-background transition-shadow hover:shadow-sm">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-background text-right focus:outline-none"
      >
        <span className="font-bold text-foreground text-sm">{title}</span>
        <div className="w-6 h-6 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-border/50 bg-background/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CustomCheckbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-2" onClick={(e) => { e.preventDefault(); onChange(); }}>
      <span className={`text-sm transition-colors ${checked ? 'font-bold text-foreground' : 'font-medium text-muted-foreground group-hover:text-foreground'}`}>
        {label}
      </span>
      <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all ${
        checked 
          ? 'bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/30' 
          : 'border-muted-foreground/30 bg-background group-hover:border-primary/50'
      }`}>
        {checked && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
      </div>
    </label>
  )
}

function CustomToggle({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group py-3 px-4 rounded-2xl border border-border/50 bg-background hover:border-primary/30 transition-all hover:shadow-sm" onClick={(e) => { e.preventDefault(); onChange(); }}>
      <span className="text-sm font-bold text-foreground">{label}</span>
      <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${checked ? 'bg-primary shadow-inner shadow-black/10' : 'bg-secondary'}`}>
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${checked ? 'left-1' : 'left-6'}`} />
      </div>
    </label>
  )
}

// --- Main Sidebar Component ---

export function FiltersSidebar() {
  const [openSections, setOpenSections] = useState({
    category: true,
    seller: false,
    price: false,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  // Mock State
  const [activeCategory, setActiveCategory] = useState("لبنیات")
  const [selectedSellers, setSelectedSellers] = useState<string[]>(["دلوسه", "اوامامی"])
  const [onlyDiscounted, setOnlyDiscounted] = useState(false)
  const [onlyInStock, setOnlyInStock] = useState(true)

  const toggleSeller = (seller: string) => {
    setSelectedSellers(prev => 
      prev.includes(seller) ? prev.filter(s => s !== seller) : [...prev, seller]
    )
  }

  const categories = [
    "لبنیات", "تنقلات", "شیرینی", "چاشنی و افزودنی", 
    "کنسرو و غذای آماده", "شوینده و ظروف یکبارمصرف", 
    "میوه و سبزیجات", "پروتئین و تخم مرغ"
  ]
  const sellers = ["گلها", "دلوسه", "فامیل", "اوامامی", "پاکبان", "تازه بار", "باستی", "نان آوران", "گلستان"]

  return (
    <aside className="w-full lg:w-[300px] shrink-0 space-y-5 sticky top-28 z-10 hidden lg:block">
      
      {/* Header */}
      <div className="flex items-center justify-between px-2 mb-2">
        <h3 className="font-extrabold text-xl flex items-center gap-2 text-foreground tracking-tight">
          <Filter className="w-5 h-5 text-primary" strokeWidth={2.5} />
          فیلترها
        </h3>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 h-8 font-bold text-xs rounded-xl">
          حذف همه
        </Button>
      </div>

      <div className="space-y-4">
        
        {/* Category Accordion */}
        <Accordion title="دسته‌بندی‌ها" isOpen={openSections.category} onToggle={() => toggleSection('category')}>
          <div className="flex flex-col gap-1 pt-2">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat}>
                <button 
                  onClick={() => setActiveCategory(cat)}
                  className={`text-right py-2.5 text-sm transition-all flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:ml-2 ${
                    activeCategory === cat 
                      ? "font-extrabold text-primary before:bg-primary" 
                      : "font-medium text-muted-foreground hover:text-foreground before:bg-transparent"
                  }`}
                >
                  {cat}
                </button>
                {idx !== categories.length - 1 && <div className="h-px bg-border/40 ml-4"></div>}
              </React.Fragment>
            ))}
          </div>
        </Accordion>

        {/* Seller Accordion */}
        <Accordion title="فروشنده" isOpen={openSections.seller} onToggle={() => toggleSection('seller')}>
          <div className="flex flex-col pt-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
            {sellers.map((seller, idx) => (
              <React.Fragment key={seller}>
                <CustomCheckbox 
                  label={seller} 
                  checked={selectedSellers.includes(seller)}
                  onChange={() => toggleSeller(seller)} 
                />
                {idx !== sellers.length - 1 && <div className="h-px bg-border/40 my-0.5"></div>}
              </React.Fragment>
            ))}
          </div>
        </Accordion>

        {/* Price Range Accordion */}
        <Accordion title="محدوده قیمت" isOpen={openSections.price} onToggle={() => toggleSection('price')}>
          <div className="pt-4 flex flex-col gap-6">
            
            {/* Input fields */}
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">از</span>
                <input type="text" defaultValue="۰" className="w-full bg-secondary/50 border-none rounded-xl h-10 pr-8 pl-12 text-sm font-bold text-center focus:ring-1 focus:ring-primary outline-none" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-medium">تومان</span>
              </div>
              <div className="flex-1 relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">تا</span>
                <input type="text" defaultValue="۱۰,۰۰۰,۰۰۰" className="w-full bg-secondary/50 border-none rounded-xl h-10 pr-8 pl-12 text-sm font-bold text-center focus:ring-1 focus:ring-primary outline-none" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-medium">تومان</span>
              </div>
            </div>

            {/* Visual Custom Slider */}
            <div className="px-2 pb-2 mt-2">
              <div className="h-1.5 w-full bg-secondary rounded-full relative">
                {/* Active track */}
                <div className="absolute top-0 bottom-0 left-[20%] right-[10%] bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.4)]"></div>
                {/* Left Thumb (Max Price) */}
                <div className="absolute top-1/2 left-[20%] -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"></div>
                {/* Right Thumb (Min Price) */}
                <div className="absolute top-1/2 right-[10%] -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"></div>
              </div>
              <div className="flex justify-between items-center mt-4 text-[11px] font-bold text-muted-foreground">
                <span>از ۰ تومان</span>
                <span>تا ۱۰,۰۰۰,۰۰۰ تومان</span>
              </div>
            </div>

          </div>
        </Accordion>

        {/* Independent Toggles */}
        <div className="pt-2 space-y-3">
          <CustomToggle 
            label="فقط تخفیف دارها" 
            checked={onlyDiscounted} 
            onChange={() => setOnlyDiscounted(!onlyDiscounted)} 
          />
          <CustomToggle 
            label="فقط کالاهای موجود" 
            checked={onlyInStock} 
            onChange={() => setOnlyInStock(!onlyInStock)} 
          />
        </div>

      </div>

    </aside>
  )
}
