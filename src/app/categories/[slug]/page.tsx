import React from "react"
import { notFound } from "next/navigation"
import { Filter, SlidersHorizontal, SortDesc } from "lucide-react"
import { categories, bestSellers, hotOffers } from "@/lib/data"
import { ProductCard } from "@/components/shared/ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FiltersSidebar } from "@/components/category/FiltersSidebar"

// Simple mock mapping to mix up products per category
const getProductsForCategory = (slug: string) => {
  return [...bestSellers, ...hotOffers].sort(() => Math.random() - 0.5)
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = categories.find(c => c.id === resolvedParams.slug)
  
  if (!category) {
    notFound()
  }

  const products = getProductsForCategory(resolvedParams.slug)

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Category Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-sm ${category.color}`}>
            {category.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.title}</h1>
            <p className="text-muted-foreground mt-1">{products.length} کالا یافت شد</p>
          </div>
        </div>
        
        {/* Desktop Sort Header */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 text-foreground font-bold">
            <SortDesc className="w-5 h-5" />
            مرتب‌سازی براساس:
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <button className="text-primary border-b-2 border-primary pb-1.5 font-bold px-1">پرفروش‌ترین</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors pb-1.5 px-1">جدیدترین</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors pb-1.5 px-1">ارزان‌ترین</button>
            <button className="text-muted-foreground hover:text-foreground transition-colors pb-1.5 px-1">گران‌ترین</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <FiltersSidebar />

        {/* Mobile Filters Trigger */}
        <div className="lg:hidden flex items-center gap-2 mb-4">
          <Button variant="outline" className="flex-1 gap-2">
            <Filter className="w-4 h-4" />
            فیلترها
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            مرتب‌سازی
          </Button>
        </div>

        {/* Product Grid */}
        <main className="flex-1">
          {/* Active Filters Badges */}
          <div className="hidden lg:flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="gap-1 pl-1">
              کاله
              <button className="w-4 h-4 rounded-full hover:bg-muted-foreground/20 flex items-center justify-center">×</button>
            </Badge>
            <Badge variant="secondary" className="gap-1 pl-1">
              موجود در انبار
              <button className="w-4 h-4 rounded-full hover:bg-muted-foreground/20 flex items-center justify-center">×</button>
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
