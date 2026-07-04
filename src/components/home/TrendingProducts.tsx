import Link from "next/link"
import { ArrowLeft, Sparkles } from "lucide-react"
import { ProductCard } from "@/components/shared/ProductCard"

export function TrendingProducts({ products }: { products: any[] }) {
  // Take top 4 products
  const displayProducts = products.slice(0, 4);

  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="relative rounded-[2.5rem] bg-slate-900 overflow-hidden p-6 md:p-10 lg:p-12 shadow-2xl shadow-slate-900/50">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col xl:flex-row gap-10 xl:gap-16 items-center xl:items-start">
          {/* Header */}
          <div className="w-full xl:w-1/3 flex flex-col space-y-6 text-white text-center xl:text-right mt-4 xl:mt-8">
            <div className="inline-flex items-center gap-2 bg-white/10 w-fit mx-auto xl:mx-0 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold tracking-wide">برترین‌های هفته</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight drop-shadow-md">
              محصولات ویژه <br className="hidden xl:block" /> و پرطرفدار
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto xl:mx-0">
              مجموعه‌ای از محبوب‌ترین و پرفروش‌ترین محصولات که توسط مشتریان ما بیشترین امتیاز را دریافت کرده‌اند.
            </p>
            <div className="pt-4 flex justify-center xl:justify-start">
              <Link href="/trending" className="group flex items-center gap-3 bg-white text-slate-900 px-6 py-3.5 rounded-2xl font-bold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                مشاهده همه محصولات
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full xl:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-4 xl:pt-0">
            {displayProducts.map((product, idx) => (
              <div 
                key={product.id} 
                className={`transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 ${idx % 2 === 1 ? 'xl:translate-y-10' : ''}`}
              >
                <div className="bg-white rounded-3xl p-1 shadow-xl h-full relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 h-full">
                    <ProductCard product={product} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
