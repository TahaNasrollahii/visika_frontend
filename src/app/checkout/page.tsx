import React from "react"
import Link from "next/link"
import { MapPin, Clock, CreditCard, ChevronLeft, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const finalPrice = 111000 // mock price
  const shippingCost = 25000

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">تکمیل سفارش</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Checkout Steps */}
        <div className="flex-1 space-y-6">
          
          {/* Address Section */}
          <div className="bg-card border rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b pb-4">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <MapPin className="text-primary w-5 h-5" />
                آدرس تحویل سفارش
              </h2>
              <Button variant="outline" size="sm" className="rounded-lg">تغییر یا ویرایش آدرس</Button>
            </div>
            <div className="space-y-3">
              <p className="font-medium text-lg">تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۲، واحد ۳</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4"/> گیرنده: علی محمدی</span>
                <span>شماره تماس: ۰۹۱۲۳۴۵۶۷۸۹</span>
              </div>
            </div>
          </div>

          {/* Delivery Time Section */}
          <div className="bg-card border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Clock className="text-primary w-5 h-5" />
                زمان ارسال
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['امروز - ۱۸ تا ۲۰', 'امروز - ۲۰ تا ۲۲', 'فردا - ۱۰ تا ۱۲'].map((time, i) => (
                <label key={i} className={`flex items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${i === 0 ? 'border-primary bg-primary/5 shadow-sm' : 'border-muted hover:border-primary/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 0 ? 'border-primary' : 'border-muted-foreground'}`}>
                      {i === 0 && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                    <span className={`font-medium ${i === 0 ? 'text-primary' : 'text-foreground'}`}>{time}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-card border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <CreditCard className="text-primary w-5 h-5" />
                شیوه پرداخت
              </h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 border-primary bg-primary/5 rounded-2xl cursor-pointer shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <span className="font-bold block">پرداخت اینترنتی</span>
                    <span className="text-sm text-muted-foreground">پرداخت آنلاین با تمامی کارت‌های بانکی</span>
                  </div>
                </div>
              </label>
              
              <label className="flex items-center p-4 border-2 border-muted rounded-2xl cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 opacity-70">
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground"></div>
                  <div>
                    <span className="font-bold block">پرداخت در محل</span>
                    <span className="text-sm text-muted-foreground">با دستگاه کارتخوان (فعلاً غیرفعال)</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-card border rounded-3xl p-6 sticky top-24 shadow-sm">
            <h3 className="text-lg font-bold mb-6 pb-4 border-b">رسید پرداخت</h3>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>مبلغ کل کالاها</span>
                <span>۱۱۴,۰۰۰ تومان</span>
              </div>
              <div className="flex justify-between text-destructive font-medium">
                <span>تخفیف</span>
                <span>۳,۰۰۰ تومان</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>هزینه ارسال</span>
                <span>{shippingCost.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-bold text-lg">مبلغ قابل پرداخت</span>
                <span className="font-bold text-2xl text-primary">{(finalPrice + shippingCost).toLocaleString("fa-IR")} <span className="text-sm font-normal text-foreground">تومان</span></span>
              </div>
            </div>

            <Link href="/success">
              <Button size="lg" className="w-full text-base font-bold rounded-xl h-14 shadow-md gap-2">
                <CheckCircle2 className="w-5 h-5" />
                پرداخت و ثبت نهایی
              </Button>
            </Link>
            
            <div className="mt-6 p-4 bg-secondary rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                پرداخت شما از طریق درگاه‌های امن بانکی انجام می‌شود. تمامی اطلاعات شما نزد ما محفوظ است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
