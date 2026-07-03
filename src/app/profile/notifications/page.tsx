import React from "react"
import { Bell, Tag, Package, Mail } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "سفارش شما در حال ارسال است",
      desc: "سفارش VZK-10025 تحویل پیک داده شد و تا ساعت ۲۰ به دست شما خواهد رسید.",
      date: "امروز، ۱۸:۳۰",
      icon: Package,
      color: "text-blue-600 bg-blue-100"
    },
    {
      id: 2,
      type: "promo",
      title: "تخفیف ویژه آخر هفته!",
      desc: "با استفاده از کد WEEKEND از ۲۰٪ تخفیف روی تمامی محصولات لبنی بهره‌مند شوید.",
      date: "دیروز، ۱۰:۱۵",
      icon: Tag,
      color: "text-destructive bg-destructive/10"
    },
    {
      id: 3,
      type: "system",
      title: "به ویزیکا خوش آمدید",
      desc: "حساب کاربری شما با موفقیت ایجاد شد. از خرید خود لذت ببرید.",
      date: "۵ روز پیش",
      icon: Mail,
      color: "text-primary bg-primary/10"
    }
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-8 pb-4 border-b">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <Bell className="w-5 h-5 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold">پیام‌ها و اعلان‌ها</h1>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notif) => {
          const Icon = notif.icon
          return (
            <div key={notif.id} className="flex gap-4 p-5 border rounded-2xl hover:border-primary/30 transition-colors bg-card">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notif.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-bold">{notif.title}</h3>
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md w-fit">
                    {notif.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {notif.desc}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
