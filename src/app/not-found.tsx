import Link from "next/link"
import { Home, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 bg-secondary text-muted-foreground rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-12 h-12" />
      </div>
      
      <h1 className="text-6xl font-black text-primary mb-4">۴۰۴</h1>
      <h2 className="text-2xl font-bold mb-4">صفحه مورد نظر یافت نشد!</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا آدرس آن تغییر کرده است. 
        می‌توانید به صفحه اصلی برگردید و یا از جستجو استفاده کنید.
      </p>
      
      <Link href="/">
        <Button size="lg" className="rounded-xl font-bold gap-2 shadow-md">
          <Home className="w-5 h-5" />
          بازگشت به صفحه اصلی
        </Button>
      </Link>
    </div>
  )
}
