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
      <div className="w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-[2.5rem] bg-gradient-to-br from-primary via-blue-500 to-indigo-600 relative overflow-hidden flex items-center shadow-2xl shadow-primary/20">
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Floating Emojis */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 text-6xl hidden lg:block opacity-80"
        >
          🥑
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/3 text-7xl hidden lg:block opacity-60"
        >
          🥐
        </motion.div>
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 left-10 text-5xl hidden lg:block opacity-70"
        >
          🍎
        </motion.div>

        {/* Main Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 px-8 md:px-16 max-w-3xl text-white space-y-6"
        >
          <motion.div variants={itemVariants} className="inline-block mb-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium">
            ✨ تجربه نسل جدید خرید آنلاین
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            خرید <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">تازه</span>، <br /> 
            تحویل سریع
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-blue-50/90 max-w-lg leading-relaxed font-medium">
            هر آنچه برای خانه نیاز دارید، با بهترین قیمت و بالاترین کیفیت، در کمتر از ۴۵ دقیقه درب منزل شماست.
          </motion.p>
          
          <motion.div variants={itemVariants} className="pt-6 flex gap-4">
            <Link href="/categories">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 hover:scale-105 transition-transform duration-300 font-bold rounded-2xl px-8 h-14 text-lg shadow-xl shadow-white/10">
                شروع خرید
              </Button>
            </Link>
            <Link href="/offers">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-md font-bold rounded-2xl px-8 h-14 text-lg transition-all">
                مشاهده تخفیف‌ها
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
