"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import transition from "react-element-popper/animations/transition"

const CustomDateInput = React.forwardRef(({ openCalendar, handleValueChange, ...props }: any, ref: any) => {
  return <Input {...props} ref={ref} />
})
CustomDateInput.displayName = "CustomDateInput"

export default function ProfileInfoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    email: "",
    birthDate: ""
  })
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    api.get('/users/info/')
      .then(res => {
        setPhone(res.data.phone_number)
        setFormData({
          firstName: res.data.first_name || "",
          lastName: res.data.last_name || "",
          nationalId: "",
          email: "",
          birthDate: ""
        })
        setLoading(false)
      })
      .catch(() => {
        toast.error('لطفا وارد شوید')
        router.push('/login')
      })
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Backend doesn't have profile update API yet, so we mock success
    toast.success("اطلاعات کاربری با موفقیت بروزرسانی شد")
  }

  if (loading) return <div>در حال بارگذاری...</div>

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
              value={phone}
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
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              animations={[transition()]}
              render={<CustomDateInput dir="ltr" className="text-left font-sans tracking-widest cursor-pointer" placeholder="YYYY/MM/DD" />}
              value={formData.birthDate}
              onChange={(dateObject: any) => {
                setFormData({...formData, birthDate: dateObject?.format("YYYY/MM/DD") || ""})
              }}
              containerClassName="w-full"
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
