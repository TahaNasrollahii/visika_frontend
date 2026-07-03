import React from "react"
import Link from "next/link"
import { ShieldCheck, Truck, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">درباره ویزیکا</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            ویزیکا، نسل جدید سوپرمارکت‌های آنلاین، با هدف ارائه بهترین کیفیت و سریع‌ترین خدمات ارسال طراحی شده است.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 pt-8">
          <div className="bg-secondary/30 rounded-3xl p-8 text-center space-y-4 border hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl mx-auto flex items-center justify-center">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl">ارسال سریع</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              تیم ارسال ما همیشه آماده است تا سفارش شما را در کمترین زمان ممکن درب منزل تحویل دهد.
            </p>
          </div>
          <div className="bg-secondary/30 rounded-3xl p-8 text-center space-y-4 border hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl mx-auto flex items-center justify-center">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl">تضمین کیفیت</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              تمامی محصولات ما از بهترین برندها و با نظارت دقیق کنترل کیفیت تامین می‌شوند.
            </p>
          </div>
          <div className="bg-secondary/30 rounded-3xl p-8 text-center space-y-4 border hover:border-primary/50 transition-colors">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl mx-auto flex items-center justify-center">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-xl">پشتیبانی ۲۴ ساعته</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              تیم پشتیبانی ما در تمامی ساعات شبانه روز پاسخگوی سوالات و پیگیری‌های شماست.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
