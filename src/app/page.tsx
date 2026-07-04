import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-primary rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-stretch gap-8 overflow-hidden relative shadow-lg shadow-primary/20">
          
          {/* Intro Block (Right Side in RTL) */}
          <div className="w-full md:w-56 shrink-0 flex flex-col items-center justify-center text-white text-center space-y-6 md:space-y-10 py-4">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-[1.4] md:leading-[1.5]">
              تخفیف‌ها و<br/>پیشنهادها
            </h2>
            
            {/* Percent Icon Mock */}
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <span className="text-6xl font-black italic drop-shadow-md">%</span>
            </div>

            {/* Navigation Arrows */}
            <div className="hidden md:flex items-center gap-3">
               <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md">
                 <ChevronRight className="w-6 h-6" />
               </button>
               <button className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md">
                 <ChevronLeft className="w-6 h-6" />
               </button>
            </div>
          </div>

          {/* Cards Carousel */}
          <div className="flex-1 w-full overflow-x-auto flex gap-4 pb-4 md:pb-0 custom-scrollbar snap-x items-center">
            {hotOffers.map((product) => (
              <div key={product.id} className="w-[200px] md:w-[240px] shrink-0 snap-center">
                <ProductCard product={product} />
              </div>
            ))}
            
            {/* View All Card */}
            <div className="w-[180px] md:w-[200px] shrink-0 snap-center h-full min-h-[300px] md:min-h-[360px] flex items-center justify-center p-2">
              <Link href="/offers" className="flex flex-col items-center justify-center w-full h-full bg-white/10 hover:bg-white/20 transition-colors rounded-2xl border-2 border-dashed border-white/40 text-white gap-4 group">
                <div className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <ChevronLeft className="w-7 h-7" />
                </div>
                <span className="font-bold text-lg">مشاهده همه</span>
              </Link>
            </div>
          </div>
          
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
    </div>
  )
}
