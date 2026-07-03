import React from "react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:px-8 min-h-[50vh]">
      <div className="max-w-3xl mx-auto bg-card border rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-4 text-primary">تماس با ما</h1>
        <p className="text-muted-foreground leading-relaxed mb-8 border-b pb-6">
          راه‌های ارتباطی با پشتیبانی ویزیکا
        </p>
        <div className="prose prose-sm sm:prose-base max-w-none text-foreground">
          <p>محتوای صفحه <strong>تماس با ما</strong> به زودی توسط تیم مدیریت محتوا تکمیل خواهد شد.</p>
        </div>
      </div>
    </div>
  )
}
