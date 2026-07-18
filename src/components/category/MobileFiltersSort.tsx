"use client"

import React, { useState } from "react"
import { Filter, SlidersHorizontal, X, SortDesc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

export function MobileFiltersSort({ children, currentSort }: { children: React.ReactNode, currentSort: string }) {
  const [activeTab, setActiveTab] = useState<'none' | 'filter' | 'sort'>('none')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const close = () => setActiveTab('none')

  const handleSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (sortValue) {
      params.set('ordering', sortValue)
    } else {
      params.delete('ordering')
    }
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
    close()
  }

  return (
    <>
      <div className="lg:hidden flex items-center gap-2 mb-4">
        <Button variant="outline" className="flex-1 gap-2" onClick={() => setActiveTab('filter')}>
          <Filter className="w-4 h-4" />
          فیلترها
        </Button>
        <Button variant="outline" className="flex-1 gap-2" onClick={() => setActiveTab('sort')}>
          <SlidersHorizontal className="w-4 h-4" />
          مرتب‌سازی
        </Button>
      </div>

      {activeTab !== 'none' && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-x-0 bottom-0 z-50 bg-background border-t rounded-t-3xl shadow-lg max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-full duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg flex items-center gap-2">
                {activeTab === 'filter' ? (
                  <><Filter className="w-5 h-5 text-primary" /> فیلترها</>
                ) : (
                  <><SortDesc className="w-5 h-5 text-primary" /> مرتب‌سازی</>
                )}
              </h3>
              <Button variant="ghost" size="icon" onClick={close}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="overflow-y-auto p-4 custom-scrollbar flex-1">
              {activeTab === 'filter' && (
                <div className="[&>aside]:!block [&>aside]:w-full [&>aside]:static [&>aside]:border-none">
                  {children}
                </div>
              )}

              {activeTab === 'sort' && (
                <div className="flex flex-col gap-2">
                  <Button 
                    variant={currentSort === '-created_at' ? 'default' : 'outline'} 
                    className="justify-start font-bold"
                    onClick={() => handleSort('-created_at')}
                  >
                    جدیدترین
                  </Button>
                  <Button 
                    variant={currentSort === 'price' ? 'default' : 'outline'} 
                    className="justify-start font-bold"
                    onClick={() => handleSort('price')}
                  >
                    ارزان‌ترین
                  </Button>
                  <Button 
                    variant={currentSort === '-price' ? 'default' : 'outline'} 
                    className="justify-start font-bold"
                    onClick={() => handleSort('-price')}
                  >
                    گران‌ترین
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
