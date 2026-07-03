"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [phone, setPhone] = useState("")

  const [otp, setOtp] = useState("")

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length === 11) {
      setStep(2)
    }
  }

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (otp.length === 5) {
      // Navigate directly to profile
      window.location.href = "/profile"
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border rounded-3xl p-8 shadow-sm relative overflow-hidden">
        
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl shadow-sm">
            V
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">
          {step === 1 ? "ورود / ثبت‌نام" : "تایید شماره موبایل"}
        </h1>
        <p className="text-sm text-muted-foreground mb-8 text-center">
          {step === 1 
            ? "لطفا شماره موبایل خود را وارد کنید." 
            : `کد تایید به شماره ${phone} ارسال شد.`}
        </p>

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div className="space-y-2 text-right">
              <label className="text-sm font-semibold">شماره موبایل</label>
              <Input 
                type="tel" 
                placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                className="text-left text-lg tracking-widest h-14"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
                maxLength={11}
              />
            </div>
            <Button size="lg" type="submit" className="w-full text-base font-bold rounded-xl h-14 shadow-md" disabled={phone.length !== 11}>
              ارسال کد تایید
            </Button>
            <p className="text-xs text-center text-muted-foreground leading-relaxed mt-4">
              ورود شما به معنای پذیرش <Link href="#" className="text-primary underline">شرایط و قوانین</Link> ویزیکا است.
            </p>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2 text-right">
              <label className="text-sm font-semibold">کد تایید ۵ رقمی</label>
              <div className="flex gap-2 justify-center" dir="ltr">
                {/* Mock OTP Input - real one uses multiple inputs or specialized library */}
                <Input 
                  type="text" 
                  className="text-center text-2xl tracking-[1em] h-14 font-bold"
                  maxLength={5}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <button type="button" onClick={() => setStep(1)} className="text-primary flex items-center gap-1 hover:underline">
                <ArrowLeft className="w-4 h-4" /> ویرایش شماره
              </button>
              <span className="text-muted-foreground">۱:۵۹ تا ارسال مجدد</span>
            </div>

            <Button size="lg" type="submit" className="w-full text-base font-bold rounded-xl h-14 shadow-md">
              تایید و ورود
            </Button>
          </form>
        )}
        
      </div>
    </div>
  )
}
