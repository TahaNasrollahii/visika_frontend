"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
  }

  return (
    <section className="container mx-auto px-4 lg:px-8 pt-6">
      <div className="w-full h-[380px] md:h-[420px] lg:h-[480px] rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_auto] animate-[gradient-x_8s_linear_infinite] relative overflow-hidden flex items-center justify-center md:justify-start shadow-2xl shadow-blue-500/30">

        {/* Animated Background Elements */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-white/20 rounded-full blur-[100px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none"
        />

        {/* Floating Glassmorphic Widget 1 */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[15%] hidden lg:flex flex-col gap-3 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl w-64 rotate-[-4deg] z-20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-white/30">🛵</div>
            <div>
              <div className="text-white font-bold text-sm drop-shadow-sm">سفارش در حال ارسال</div>
              <div className="text-white/80 text-xs mt-0.5">رسیدن تا ۱۵ دقیقه دیگر</div>
            </div>
          </div>
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mt-1">
            <motion.div 
              animate={{ width: ["0%", "100%", "0%"] }} 
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }} 
              className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)]"
            />
          </div>
        </motion.div>

        {/* Floating Glassmorphic Widget 2 */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute left-[28%] bottom-[20%] hidden lg:flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3.5 rounded-2xl shadow-2xl rotate-[3deg] z-20"
        >
          <div className="text-3xl drop-shadow-lg">🎉</div>
          <div className="flex flex-col">
            <span className="text-white font-black text-sm drop-shadow-md">تخفیف ویژه امروز</span>
            <span className="text-yellow-300 font-bold text-xs mt-0.5">-۵۰٪ محصولات پروتئینی</span>
          </div>
        </motion.div>

        {/* Floating Emoji */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 left-[45%] text-5xl hidden lg:block opacity-60 blur-[1px]"
        >
          🥑
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-6 md:px-16 py-8 md:py-0 w-full h-full md:h-auto max-w-3xl text-white flex flex-col items-start text-right"
        >
          <motion.div variants={itemVariants} className="inline-block mb-auto md:mb-6 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs md:text-sm font-medium">
            ✨ تجربه نسل جدید خرید آنلاین
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-black leading-[1.25] md:leading-tight tracking-tight mt-4 md:mt-0 drop-shadow-sm">
            خرید <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">تازه</span>، <br />
            تحویل سریع
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-white max-w-lg leading-relaxed font-bold mt-3 md:mt-6 drop-shadow-sm">
            ویزیکا، اولین ویزیتور آنلاین کالا
          </motion.p>

          <motion.div variants={itemVariants} className="mt-auto md:mt-10 flex flex-row gap-3 md:gap-4 w-full sm:w-auto justify-start">
            <Link href="/categories" className="flex-1 sm:flex-none">
              <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-transform duration-300 font-bold rounded-2xl px-2 md:px-8 h-12 md:h-14 text-sm md:text-lg shadow-xl shadow-white/20">
                شروع خرید
              </Button>
            </Link>
            <Link href="/offers" className="flex-1 sm:flex-none">
              <Button size="lg" variant="outline" className="w-full bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md font-bold rounded-2xl px-2 md:px-8 h-12 md:h-14 text-sm md:text-lg transition-all">
                مشاهده تخفیف‌ها
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
