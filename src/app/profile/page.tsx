import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">اطلاعات حساب کاربری</h1>
        <p className="text-muted-foreground text-sm">شما می‌توانید اطلاعات شخصی خود را در این بخش مشاهده و ویرایش کنید.</p>
      </div>

      <form className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">نام و نام خانوادگی</label>
            <Input defaultValue="کاربر وزیکا" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">شماره موبایل</label>
            <Input defaultValue="۰۹۱۲۳۴۵۶۷۸۹" disabled className="bg-secondary/50 cursor-not-allowed" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">ایمیل</label>
            <Input type="email" placeholder="آدرس ایمیل خود را وارد کنید" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">کد ملی</label>
            <Input placeholder="مثال: ۱۲۳۴۵۶۷۸۹۰" />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button size="lg" className="rounded-xl font-bold px-8 shadow-sm">
            ثبت اطلاعات
          </Button>
        </div>
      </form>
    </div>
  )
}
