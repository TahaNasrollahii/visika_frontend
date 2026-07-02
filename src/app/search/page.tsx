import React from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { bestSellers, hotOffers } from "@/lib/data"
import { ProductCard } from "@/components/shared/ProductCard"

export default function SearchPage() {
  const allProducts = [...bestSellers, ...hotOffers]

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-6">جستجوی محصولات</h1>
        <div className="relative w-full group shadow-md rounded-full">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="نام کالا، برند یا دسته‌بندی را وارد کنید..."
            className="w-full pl-4 pr-14 h-14 rounded-full border-muted bg-card focus-visible:ring-primary text-lg shadow-inner"
            defaultValue="شیر"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <h2 className="text-xl font-bold text-muted-foreground">
          نتایج جستجو برای: <span className="text-foreground">«شیر»</span>
        </h2>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          فیلتر نتایج
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
