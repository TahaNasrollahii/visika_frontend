"use client"

import React, { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Share2, ShieldCheck, Truck, RotateCcw, Store, Star, ChevronLeft } from "lucide-react"
import { bestSellers, hotOffers } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const allProducts = [...bestSellers, ...hotOffers]

export default function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = allProducts.find(p => p.id === resolvedParams.slug)
  
  if (!product) {
    notFound()
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-primary transition-colors">خانه</Link>
        <ChevronLeft className="w-4 h-4" />
        <Link href="/categories" className="hover:text-primary transition-colors">سوپرمارکت</Link>
        <ChevronLeft className="w-4 h-4" />
        <Link href="/categories/dairy" className="hover:text-primary transition-colors">لبنیات</Link>
        <ChevronLeft className="w-4 h-4" />
        <span className="text-foreground font-medium">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Product Gallery (Left in LTR, Right in RTL) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="aspect-square rounded-3xl bg-white flex items-center justify-center border relative overflow-hidden group">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill 
              className="object-contain p-4"
              priority
            />
            
            {/* Gallery Actions */}
            <div className="absolute top-4 left-4 flex flex-col gap-3">
              <Button onClick={() => toast.success('به علاقه‌مندی‌ها اضافه شد')} variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm hover:text-destructive border-transparent shadow-sm">
                <Heart className="w-5 h-5" />
              </Button>
              <Button onClick={() => toast.success('لینک کپی شد')} variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm hover:text-primary border-transparent shadow-sm">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`aspect-square rounded-xl flex items-center justify-center cursor-pointer border-2 transition-colors ${i === 1 ? 'border-primary bg-primary/5' : 'border-transparent bg-secondary/30 hover:border-primary/50'}`}>
                <ShoppingCart className="w-6 h-6 text-muted-foreground/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">برند: کاله</span>
              <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                ۴.۴ (۱۲۰ دیدگاه)
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">{product.title}</h1>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              این محصول با بهترین کیفیت و رعایت کامل اصول بهداشتی تهیه شده است. مناسب برای مصرف روزانه خانواده و سرشار از مواد مغذی.
            </p>
          </div>

          <div className="space-y-4 py-6 border-y">
            <h3 className="font-semibold text-lg mb-4">ویژگی‌های محصول</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground w-24">وزن:</span>
                <span className="font-medium">۱ کیلوگرم</span>
              </li>
              <li className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground w-24">شماره پروانه:</span>
                <span className="font-medium">۳۴/۱۰۲۳۹</span>
              </li>
              <li className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground w-24">شرایط نگهداری:</span>
                <span className="font-medium">در یخچال (دمای ۱ تا ۴ درجه)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Buy Box */}
        <div className="lg:col-span-3">
          <div className="border rounded-3xl p-6 bg-card sticky top-24 shadow-sm">
            <div className="space-y-6">
              
              {/* Vendor */}
              <div className="flex items-center justify-between pb-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">فروشگاه وزیکا</p>
                    <p className="text-xs text-green-600 font-medium mt-1">عملکرد: عالی</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                {hasDiscount && (
                  <div className="flex items-center justify-end gap-3">
                    <span className="text-sm text-muted-foreground line-through decoration-destructive/50">
                      {product.price.toLocaleString("fa-IR")}
                    </span>
                    <Badge variant="destructive" className="font-bold rounded-lg px-2">
                      {discountPercent}٪ تخفیف
                    </Badge>
                  </div>
                )}
                <div className="flex justify-end items-end gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {(product.discountPrice || product.price).toLocaleString("fa-IR")}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground mb-1">تومان</span>
                </div>
              </div>

              {/* Action */}
              <Button onClick={() => toast.success('محصول با موفقیت به سبد خرید اضافه شد')} size="lg" className="w-full text-base font-bold rounded-xl h-14 shadow-md">
                افزودن به سبد خرید
              </Button>

              {/* Guarantees */}
              <div className="pt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>تضمین اصالت و کیفیت کالا</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>ارسال سریع (کمتر از ۲ ساعت)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span>امکان مرجوعی در صورت خرابی</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
