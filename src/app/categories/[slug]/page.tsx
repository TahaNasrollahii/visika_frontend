import React from "react"
import { notFound } from "next/navigation"
import { Filter, SlidersHorizontal } from "lucide-react"
import { categories, bestSellers, hotOffers } from "@/lib/data"
import { ProductCard } from "@/components/shared/ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
        
        {/* Desktop Filters Trigger */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-background">
            <SlidersHorizontal className="w-4 h-4" />
            مرتب‌سازی: پربازدیدترین
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-1/4 shrink-0 space-y-6">
          <div className="border rounded-2xl p-6 bg-card sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                فیلترها
              </h3>
              <Button variant="ghost" size="sm" className="text-destructive h-8">حذف همه</Button>
            </div>
            
            <div className="space-y-6">
              {/* Brand Filter Mock */}
              <div>
                <h4 className="font-semibold mb-4 border-b pb-2">برندها</h4>
                <div className="space-y-3">
                  {['کاله', 'پگاه', 'میهن', 'هراز'].map((brand) => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border-2 border-muted-foreground/30 flex items-center justify-center group-hover:border-primary transition-colors">
                        {/* Checkbox mock */}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price Range Mock */}
              <div>
                <h4 className="font-semibold mb-4 border-b pb-2">محدوده قیمت</h4>
                <div className="h-2 bg-secondary rounded-full relative mt-6">
                  <div className="absolute inset-y-0 right-[20%] left-[30%] bg-primary rounded-full"></div>
                  <div className="absolute top-1/2 right-[20%] -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md"></div>
                  <div className="absolute top-1/2 left-[30%] -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-md"></div>
                </div>
                <div className="flex justify-between mt-4 text-xs font-medium text-muted-foreground">
                  <span>۲۰,۰۰۰ تومان</span>
                  <span>۵۰۰,۰۰۰ تومان</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-4 pt-4 border-t">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-semibold">فقط کالاهای موجود</span>
                  <div className="w-10 h-6 bg-primary rounded-full relative">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-semibold">فقط کالاهای تخفیف‌دار</span>
                  <div className="w-10 h-6 bg-secondary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </aside>

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
