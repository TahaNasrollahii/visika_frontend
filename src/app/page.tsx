import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { ProductCard } from "@/components/shared/ProductCard"
import { bestSellers, hotOffers, categories } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 pt-6">
        <div className="w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-3xl bg-gradient-to-r from-primary to-blue-400 relative overflow-hidden flex items-center shadow-lg">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 px-8 md:px-16 max-w-2xl text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              خرید تازه، <br /> تحویل سریع
            </h1>
            <p className="text-lg md:text-xl text-blue-50 max-w-md leading-relaxed">
              هر آنچه برای خانه نیاز دارید، با بهترین قیمت و کیفیت در کمتر از یک ساعت درب منزل شماست.
            </p>
            <div className="pt-4">
              <Link href="/categories">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold rounded-full px-8 text-base shadow-md">
                  شروع خرید
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
          <Link href="/best-sellers" className="text-primary font-medium flex items-center hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
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
