import React from "react"
import { Heart } from "lucide-react"
import { bestSellers } from "@/lib/data"
import { ProductCard } from "@/components/shared/ProductCard"

export default function FavoritesPage() {
  // Mock favorites - just taking a slice of our dummy data
  const favorites = bestSellers.slice(0, 4)

  return (
    <div>
      <div className="flex items-center gap-3 mb-8 pb-4 border-b">
        <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
          <Heart className="w-5 h-5 text-destructive fill-destructive" />
        </div>
        <h1 className="text-2xl font-bold">لیست علاقه‌مندی‌ها</h1>
      </div>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <ProductCard key={`fav-${product.id}`} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/30 rounded-2xl border-2 border-dashed">
          <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-muted-foreground mb-2">لیست علاقه‌مندی‌های شما خالی است</h2>
          <p className="text-sm text-muted-foreground">با لمس آیکون قلب روی محصولات، آن‌ها را به این لیست اضافه کنید.</p>
        </div>
      )}
    </div>
  )
}
