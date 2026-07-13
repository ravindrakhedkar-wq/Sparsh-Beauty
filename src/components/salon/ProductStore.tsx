'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Search, ShoppingBag, Star, Plus, Minus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { useCartStore } from '@/store/cart'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  image: string | null
  rating: number
  inStock: boolean
}

const categories = [
  'All',
  'Hair Care',
  'Skin Care',
  'Makeup Kits',
  'Bridal Beauty Kits',
  'Hair Accessories',
  'Professional Salon Products',
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.round(rating)
              ? 'star-filled fill-current'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

function CartSheet() {
  const { items, isOpen, setCartOpen, updateQuantity, removeItem, totalPrice } =
    useCartStore()

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-[family-name:var(--font-playfair)] text-lg text-charcoal">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-warm-gray font-[family-name:var(--font-lato)]">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4 px-1">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-soft-pink/50 rounded-xl p-3"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-rose-gold-light">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal font-[family-name:var(--font-lato)] truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-rose-gold font-semibold font-[family-name:var(--font-lato)]">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-rose-gold-light flex items-center justify-center hover:bg-soft-pink transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-rose-gold-light flex items-center justify-center hover:bg-soft-pink transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-rose-gold-light/30 pt-4">
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <span className="font-[family-name:var(--font-lato)] text-charcoal font-medium">
                  Total
                </span>
                <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-charcoal">
                  ₹{totalPrice().toLocaleString('en-IN')}
                </span>
              </div>
              <Button
                onClick={() => {
                  toast.success('Order placed! We will contact you to confirm.')
                  useCartStore.getState().clearCart()
                  setCartOpen(false)
                }}
                className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full py-5 font-[family-name:var(--font-lato)]"
              >
                Checkout
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default function ProductStore() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeCategory !== 'All') params.set('category', activeCategory)
      if (debouncedSearch) params.set('search', debouncedSearch)
      const res = await fetch(`/api/products?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }, [activeCategory, debouncedSearch])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const addItem = useCartStore((s) => s.addItem)
  const totalItems = useCartStore((s) => s.totalItems)
  const toggleCart = useCartStore((s) => s.toggleCart)

  return (
    <>
      <section id="products" className="section-padding bg-cream" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
              Beauty <span className="text-gold-gradient">Products</span>
            </h2>
            <div className="luxury-divider mb-4" />
            <p className="text-warm-gray font-[family-name:var(--font-lato)]">
              Shop premium beauty products curated by our experts
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md mx-auto mb-6"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-rose-gold-light/30 focus-visible:border-rose-gold"
              />
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-[family-name:var(--font-lato)] transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-rose-gold text-white shadow-sm'
                    : 'bg-white text-warm-gray border border-rose-gold-light/30 hover:border-rose-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-warm-gray font-[family-name:var(--font-lato)]">
              <p className="text-lg">No products found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Card className="overflow-hidden border-rose-gold-light/20 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative w-full h-48 bg-gradient-to-br from-soft-pink to-cream overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-rose-gold-light" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-[family-name:var(--font-lato)] font-medium text-charcoal text-sm mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-warm-gray text-xs font-[family-name:var(--font-lato)] line-clamp-2 mb-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-lg font-bold text-charcoal font-[family-name:var(--font-playfair)]">
                          ₹{Math.round(product.price).toLocaleString('en-IN')}
                        </span>
                        <StarRating rating={product.rating} />
                      </div>
                      <Button
                        onClick={() => {
                          addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image || '',
                          })
                          toast.success(`${product.name} added to cart!`)
                        }}
                        size="sm"
                        className="w-full mt-3 bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)] text-xs"
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Cart Button */}
      {totalItems() > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-40 bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors"
          onClick={toggleCart}
          aria-label="Open cart"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems()}
          </span>
        </motion.button>
      )}

      <CartSheet />
    </>
  )
}