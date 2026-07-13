"use client"

import React, { useEffect, useState } from "react"
import api from "@/lib/api"
import { Settings2, Truck, ShoppingCart, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

type Tab = "delivery" | "basket"

const weekdays = [
  { key: "saturday", label: "شنبه" },
  { key: "sunday", label: "یکشنبه" },
  { key: "monday", label: "دوشنبه" },
  { key: "tuesday", label: "سه‌شنبه" },
  { key: "wednesday", label: "چهارشنبه" },
  { key: "thursday", label: "پنجشنبه" },
  { key: "friday", label: "جمعه" },
]

export default function VendorRulesPage() {
  const [tab, setTab] = useState<Tab>("delivery")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [deliveryRule, setDeliveryRule] = useState<any>({
    preparation_days: 2,
    end_of_order_taking_hour: 15,
    saturday: true,
    sunday: true,
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: false,
  })

  const [basketRule, setBasketRule] = useState<any>({
    min_order_price: "",
    min_order_quantity: "",
  })

  const fetchRules = async () => {
    setLoading(true)
    try {
      const [deliveryRes, basketRes] = await Promise.all([
        api.get("/vendor/delivery-rule/"),
        api.get("/vendor/basket-rule/"),
      ])

      setDeliveryRule(deliveryRes.data)
      setBasketRule({
        min_order_price: basketRes.data?.min_order_price || "",
        min_order_quantity: basketRes.data?.min_order_quantity || "",
      })
    } catch {
      toast.error("خطا در دریافت قوانین فروشگاه")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRules()
  }, [])

  const saveDeliveryRule = async () => {
    setSaving(true)
    try {
      await api.put("/vendor/delivery-rule/", deliveryRule)
      toast.success("قوانین ارسال با موفقیت ذخیره شد")
    } catch {
      toast.error("خطا در ذخیره قوانین ارسال")
    } finally {
      setSaving(false)
    }
  }

  const saveBasketRule = async () => {
    setSaving(true)
    try {
      await api.put("/vendor/basket-rule/", {
        min_order_price: basketRule.min_order_price || null,
        min_order_quantity: basketRule.min_order_quantity || null,
      })
      toast.success("قوانین سبد خرید با موفقیت ذخیره شد")
    } catch (e: any) {
      toast.error(e.response?.data?.error || "خطا در ذخیره قوانین سبد خرید")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="animate-pulse h-96 rounded-3xl bg-secondary/40" />
  }

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 border border-border shadow-sm min-h-[500px]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black flex items-center gap-2">
          <Settings2 className="w-6 h-6 text-primary" />
          قوانین فروشگاه
        </h2>
      </div>

      <div className="flex gap-2 mb-8 pb-4 border-b">
        <button
          onClick={() => setTab("delivery")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            tab === "delivery" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
          }`}
        >
          <Truck className="w-4 h-4" />
          قوانین ارسال
        </button>

        <button
          onClick={() => setTab("basket")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
            tab === "basket" ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          قوانین سبد خرید
        </button>
      </div>

      {tab === "delivery" ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">مدت آماده‌سازی سفارش (روز)</label>
              <Input
                type="number"
                value={deliveryRule.preparation_days}
                onChange={(e) => setDeliveryRule({ ...deliveryRule, preparation_days: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">ساعت پایان ثبت سفارش</label>
              <Input
                type="number"
                min={0}
                max={24}
                value={deliveryRule.end_of_order_taking_hour}
                onChange={(e) => setDeliveryRule({ ...deliveryRule, end_of_order_taking_hour: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">روزهای ارسال</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {weekdays.map((day) => (
                <label key={day.key} className="flex items-center gap-2 bg-secondary/30 rounded-xl p-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={deliveryRule[day.key]}
                    onChange={(e) => setDeliveryRule({
                      ...deliveryRule,
                      [day.key]: e.target.checked,
                    })}
                  />
                  <span className="font-medium text-sm">{day.label}</span>
                </label>
              ))}
            </div>
          </div>

          <Button onClick={saveDeliveryRule} disabled={saving} className="gap-2 rounded-xl">
            <Save className="w-4 h-4" />
            ذخیره قوانین ارسال
          </Button>
        </div>
      ) : (
        <div className="space-y-8 max-w-xl">
          <div className="space-y-2">
            <label className="text-sm font-semibold">حداقل مبلغ سفارش (تومان)</label>
            <Input
              type="number"
              value={basketRule.min_order_price}
              onChange={(e) => setBasketRule({
                ...basketRule,
                min_order_price: e.target.value,
              })}
              placeholder="مثال: 500000"
            />
            <p className="text-xs text-muted-foreground">
              اگر خالی باشد محدودیتی اعمال نمی‌شود.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">حداقل تعداد سفارش</label>
            <Input
              type="number"
              value={basketRule.min_order_quantity}
              onChange={(e) => setBasketRule({
                ...basketRule,
                min_order_quantity: e.target.value,
              })}
              placeholder="مثال: 3"
            />
            <p className="text-xs text-muted-foreground">
              اگر خالی باشد محدودیتی اعمال نمی‌شود.
            </p>
          </div>

          <div className="bg-secondary/30 rounded-2xl p-4 text-sm text-muted-foreground leading-7">
            در صورت فعال بودن این قوانین، مشتری تنها زمانی می‌تواند سفارش را ثبت کند که حداقل مبلغ یا تعداد مشخص شده را از محصولات فروشگاه شما خریداری کرده باشد.
          </div>

          <Button onClick={saveBasketRule} disabled={saving} className="gap-2 rounded-xl">
            <Save className="w-4 h-4" />
            ذخیره قوانین سبد خرید
          </Button>
        </div>
      )}
    </div>
  )
}
