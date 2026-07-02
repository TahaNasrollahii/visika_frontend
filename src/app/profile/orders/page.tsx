import React from "react"
import { Package, ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const orders = [
    { id: "VZ-1002345", date: "۱۲ تیر ۱۴۰۳", status: "در حال پردازش", statusColor: "warning", total: 136000, items: 3 },
    { id: "VZ-1002102", date: "۵ تیر ۱۴۰۳", status: "تحویل شده", statusColor: "success", total: 450000, items: 12 },
    { id: "VZ-1001890", date: "۲۸ خرداد ۱۴۰۳", status: "تحویل شده", statusColor: "success", total: 85000, items: 2 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">سفارش‌های من</h1>
        <p className="text-muted-foreground text-sm">تاریخچه تمامی سفارش‌های شما در وزیکا</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-2xl p-6 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">{order.id}</div>
                  <div className="text-xs text-muted-foreground mt-1">{order.date}</div>
                </div>
              </div>
              <Badge variant={order.statusColor as any}>{order.status}</Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-6 text-muted-foreground">
                <span>تعداد کالا: {order.items}</span>
                <span>مبلغ کل: <span className="font-bold text-foreground">{order.total.toLocaleString("fa-IR")} تومان</span></span>
              </div>
              <div className="flex items-center text-primary font-medium gap-1 group-hover:underline">
                مشاهده فاکتور
                <ChevronLeft className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
