"use client"

import React, { useState } from "react"
import { MapPin, Plus, Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, title: "خانه", detail: "تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۲، واحد ۳", isDefault: true },
    { id: 2, title: "محل کار", detail: "تهران، خیابان ولیعصر، برج سپهر، طبقه ۴، واحد ۴۰۲", isDefault: false }
  ])

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id))
    toast.success("آدرس با موفقیت حذف شد")
  }

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    })))
    toast.success("آدرس پیش‌فرض تغییر کرد")
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">آدرس‌های من</h1>
        </div>
        <Button className="gap-2 rounded-xl h-12 px-6">
          <Plus className="w-5 h-5" /> ثبت آدرس جدید
        </Button>
      </div>
      
      <div className="grid gap-6">
        {addresses.map((address) => (
          <div key={address.id} className={`border-2 rounded-2xl p-6 transition-all ${address.isDefault ? 'border-primary bg-primary/5 shadow-sm' : 'border-muted hover:border-primary/30'}`}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              <div className="flex gap-4">
                <MapPin className={`w-6 h-6 mt-1 shrink-0 ${address.isDefault ? 'text-primary' : 'text-muted-foreground'}`} />
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">{address.title}</h3>
                    {address.isDefault && (
                      <span className="text-[10px] font-bold bg-primary text-primary-foreground px-2 py-1 rounded-full">پیش‌فرض</span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{address.detail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 md:flex-col lg:flex-row md:w-32 lg:w-auto">
                {!address.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)} className="w-full">انتخاب به عنوان پیش‌فرض</Button>
                )}
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(address.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

            </div>
          </div>
        ))}
        
        {addresses.length === 0 && (
          <div className="text-center py-20 bg-secondary/30 rounded-2xl border-2 border-dashed">
            <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-muted-foreground mb-2">هیچ آدرسی ثبت نشده است</h2>
          </div>
        )}
      </div>
    </div>
  )
}
