import React from "react"
import { Bell, Tag, Package, Mail } from "lucide-react"

export default function NotificationsPage() {
  const notifications: any[] = []

  return (
    <div>
      <div className="flex items-center gap-3 mb-8 pb-4 border-b">
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
          <Bell className="w-5 h-5 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold">پیام‌ها و اعلان‌ها</h1>
      </div>
      
      {notifications.length > 0 ? (
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
      ) : (
        <div className="text-center py-20 bg-secondary/30 rounded-2xl border-2 border-dashed">
          <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-muted-foreground mb-2">پیام و اعلانی ندارید</h2>
          <p className="text-sm text-muted-foreground">اعلانات مهم حساب کاربری و سفارشات شما در اینجا نمایش داده خواهند شد.</p>
        </div>
      )}
    </div>
  )
}
