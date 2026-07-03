"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, Filter, SortDesc, ChevronDown, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { bestSellers, hotOffers } from "@/lib/data"
import { ProductCard, Product } from "@/components/shared/ProductCard"

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryParam = searchParams.get('q') || ""

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [filterMode, setFilterMode] = useState<"all" | "discounted">("all")
  const [sortMode, setSortMode] = useState<"default" | "cheap" | "expensive">("default")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const allProducts = [...bestSellers, ...hotOffers]

  // Filter and sort logic
  useEffect(() => {
    let result = allProducts

    // 1. Filter by search query
    if (queryParam) {
      result = result.filter(p => p.title.includes(queryParam))
    }

    // 2. Filter by discount
    if (filterMode === "discounted") {
      result = result.filter(p => p.discountPrice && p.discountPrice < p.price)
    }

    // 3. Sort
    if (sortMode === "cheap") {
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
    } else if (sortMode === "expensive") {
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
    }

    // Deduplicate by ID just in case
    const uniqueIds = new Set()
    result = result.filter(p => {
      if (uniqueIds.has(p.id)) return false
      uniqueIds.add(p.id)
      return true
    })

    setFilteredProducts(result)
  }, [queryParam, filterMode, sortMode])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/search')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-6">جستجوی محصولات</h1>
        <form onSubmit={handleSearch} className="relative w-full group shadow-md rounded-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="نام کالا، برند یا دسته‌بندی را وارد کنید..."
            className="w-full pl-14 pr-14 h-14 rounded-full border-muted bg-card focus-visible:ring-primary text-lg shadow-inner"
          />
          <Button type="submit" size="sm" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-10 px-6">
            جستجو
          </Button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b pb-4 gap-4">
        <h2 className="text-xl font-bold text-muted-foreground">
          {queryParam ? (
            <>نتایج جستجو برای: <span className="text-foreground">«{queryParam}»</span></>
          ) : (
            <>همه محصولات</>
          )}
        </h2>
        
        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-secondary/50 rounded-lg p-1">
            <Button 
              variant={filterMode === "all" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setFilterMode("all")}
              className="text-xs"
            >
              همه
            </Button>
            <Button 
              variant={filterMode === "discounted" ? "default" : "ghost"} 
              size="sm" 
              onClick={() => setFilterMode("discounted")}
              className="text-xs"
            >
              فقط تخفیف‌دار
            </Button>
          </div>
          
          <div className="relative flex items-center gap-2 border-r pr-3">
            <SortDesc className="w-4 h-4 text-muted-foreground" />
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 bg-transparent text-sm font-bold focus:outline-none hover:text-primary transition-colors"
            >
              {sortMode === "default" && "مرتبط‌ترین"}
              {sortMode === "cheap" && "ارزان‌ترین"}
              {sortMode === "expensive" && "گران‌ترین"}
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
            
            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-2xl shadow-lg z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                  <div 
                    onClick={() => { setSortMode("default"); setIsDropdownOpen(false); }}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer hover:bg-secondary transition-colors ${sortMode === "default" ? "font-bold text-primary bg-primary/5" : ""}`}
                  >
                    <span>مرتبط‌ترین</span>
                    {sortMode === "default" && <Check className="w-4 h-4" />}
                  </div>
                  <div 
                    onClick={() => { setSortMode("cheap"); setIsDropdownOpen(false); }}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer hover:bg-secondary transition-colors ${sortMode === "cheap" ? "font-bold text-primary bg-primary/5" : ""}`}
                  >
                    <span>ارزان‌ترین</span>
                    {sortMode === "cheap" && <Check className="w-4 h-4" />}
                  </div>
                  <div 
                    onClick={() => { setSortMode("expensive"); setIsDropdownOpen(false); }}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer hover:bg-secondary transition-colors ${sortMode === "expensive" ? "font-bold text-primary bg-primary/5" : ""}`}
                  >
                    <span>گران‌ترین</span>
                    {sortMode === "expensive" && <Check className="w-4 h-4" />}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/30 rounded-2xl border-2 border-dashed">
          <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-muted-foreground mb-2">محصولی پیدا نشد</h2>
          <p className="text-sm text-muted-foreground">لطفاً عبارت دیگری را جستجو کنید یا فیلترها را تغییر دهید.</p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">در حال بارگذاری نتایج...</div>}>
      <SearchContent />
    </Suspense>
  )
}
