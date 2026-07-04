import React from "react"
import { Package, ChevronLeft, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const orders: any[] = []

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">سفارش‌های من</h1>
      
      {orders.length > 0 ? (
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
      ) : (
        <div className="text-center py-20 bg-secondary/30 rounded-2xl border-2 border-dashed">
          <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-muted-foreground mb-2">هنوز سفارشی ثبت نکرده‌اید</h2>
          <p className="text-sm text-muted-foreground">با مراجعه به فروشگاه، اولین خرید خود را انجام دهید.</p>
        </div>
      )}
    </div>
  )
}
