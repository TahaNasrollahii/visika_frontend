import React from "react"
import { Package, ChevronLeft, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const orders = [
    {
      id: "VZK-10025",
      date: "۱۲ مرداد ۱۴۰۳",
      status: "در حال پردازش",
      price: "۴۵۰,۰۰۰ تومان",
      items: ["شیر کم چرب کاله", "تخم مرغ ۲۰ عددی", "پنیر فتا", "+ ۳ مورد دیگر"],
      color: "bg-amber-100 text-amber-700 border-amber-200"
    },
    {
      id: "VZK-09844",
      date: "۵ تیر ۱۴۰۳",
      status: "تحویل شده",
      price: "۸۲۰,۰۰۰ تومان",
      items: ["گوشت چرخ‌کرده", "مرغ کامل", "برنج هاشمی", "+ ۱ مورد دیگر"],
      color: "bg-green-100 text-green-700 border-green-200"
    },
    {
      id: "VZK-08112",
      date: "۲ اردیبهشت ۱۴۰۳",
      status: "لغو شده",
      price: "۱۲۰,۰۰۰ تومان",
      items: ["ماکارونی رشته‌ای", "رب گوجه فرنگی"],
      color: "bg-red-100 text-red-700 border-red-200"
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سفارش‌های من</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border-2 rounded-2xl p-5 hover:border-primary/30 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg border ${order.color}`}>
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold">سفارش {order.id}</div>
                  <div className="text-sm text-muted-foreground mt-1">{order.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`${order.color} border font-bold`}>{order.status}</Badge>
                <div className="font-bold">{order.price}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">محصولات: </span> 
                {order.items.join("، ")}
              </p>
              
              <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                مشاهده فاکتور <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
