import React from "react"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <>
      <div className="min-h-[100vh]" />
      <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
        <p className="text-foreground font-bold text-xl animate-pulse">در حال دریافت اطلاعات محصول...</p>
      </div>
    </>
  )
}
