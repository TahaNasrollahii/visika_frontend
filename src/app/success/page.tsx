import React from "react"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <div className="bg-card border rounded-3xl p-8 max-w-md w-full text-center shadow-sm relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-green-50/50"></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-200">
            <CheckCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">سفارش با موفقیت ثبت شد</h1>
          <p className="text-muted-foreground mb-8">
            پرداخت شما تایید شد. سفارش شما در حال آماده‌سازی است و در زمان مقرر ارسال خواهد شد.
          </p>

          <div className="bg-secondary/50 rounded-2xl p-4 text-sm space-y-3 text-right mb-8">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">کد پیگیری سفارش:</span>
              <span className="font-bold">VZ-1002345</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">مبلغ پرداختی:</span>
              <span className="font-bold">۱۳۶,۰۰۰ تومان</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">زمان تحویل:</span>
              <span className="font-bold text-primary">امروز - ۱۸ تا ۲۰</span>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/profile/orders">
              <Button size="lg" className="w-full text-base font-bold rounded-xl gap-2 shadow-sm">
                <Package className="w-5 h-5" />
                پیگیری سفارش
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full text-base font-bold rounded-xl gap-2">
                <Home className="w-5 h-5" />
                بازگشت به خانه
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
