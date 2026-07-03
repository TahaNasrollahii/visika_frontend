"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function ProfileInfoPage() {
  const [formData, setFormData] = useState({
    firstName: "علی",
    lastName: "محمدی",
    nationalId: "0123456789",
    email: "ali@example.com",
    birthDate: "۱۳۷۰/۰۵/۱۲"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("اطلاعات کاربری با موفقیت بروزرسانی شد")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">اطلاعات حساب کاربری</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">نام</label>
            <Input 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">نام خانوادگی</label>
            <Input 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">کد ملی</label>
            <Input 
              value={formData.nationalId}
              onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
              dir="ltr"
              className="text-left"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">شماره موبایل</label>
            <Input 
              value="۰۹۱۲۳۴۵۶۷۸۹"
              disabled
              dir="ltr"
              className="text-left bg-secondary/50 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">ایمیل (اختیاری)</label>
            <Input 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              dir="ltr"
              className="text-left"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">تاریخ تولد</label>
            <Input 
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              dir="ltr"
              className="text-left"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <Button type="submit" size="lg" className="px-8 rounded-xl">
            ثبت و ذخیره تغییرات
          </Button>
        </div>
      </form>
    </div>
  )
}
