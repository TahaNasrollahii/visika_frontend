import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ProductCard } from "@/components/shared/ProductCard"
import { bestSellers, hotOffers, categories } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Hero } from "@/components/home/Hero"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <Hero />

      {/* Categories Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">دسته‌بندی‌ها</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/categories/${cat.id}`}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:-translate-y-1 group-hover:shadow-md ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {cat.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot Offers Section */}
      <section className="bg-destructive/5 py-12 border-y">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-8 bg-destructive rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-destructive tracking-tight">پیشنهادهای شگفت‌انگیز</h2>
            </div>
            <Link href="/offers" className="text-destructive font-medium flex items-center hover:bg-destructive/10 px-3 py-1.5 rounded-lg transition-colors">
              مشاهده همه
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hotOffers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-primary rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">پرفروش‌ترین کالاها</h2>
          </div>
          <Link href="/best-selling" className="text-primary font-medium flex items-center hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
            مشاهده همه
            <ChevronLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Banners Section */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-secondary h-48 md:h-64 flex items-center justify-between px-8 md:px-12 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
            <div className="space-y-3 z-10">
              <h3 className="text-2xl font-bold">خرید محصولات <br/> پروتئینی تازه</h3>
              <p className="text-muted-foreground">با تضمین کیفیت و بهداشت</p>
            </div>
            <div className="text-7xl group-hover:scale-110 transition-transform duration-500">🥩</div>
          </div>
          <div className="rounded-3xl bg-orange-100 h-48 md:h-64 flex items-center justify-between px-8 md:px-12 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
            <div className="space-y-3 z-10">
              <h3 className="text-2xl font-bold text-orange-900">نوشیدنی‌های <br/> خنک تابستانی</h3>
              <p className="text-orange-700">تا ۲۰٪ تخفیف</p>
            </div>
            <div className="text-7xl group-hover:scale-110 transition-transform duration-500">🍹</div>
          </div>
        </div>
      </section>
    </div>
  )
}
