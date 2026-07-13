'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Camera } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'

interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
}

const galleryCategories = [
  'All',
  'Hair Transformations',
  'Bridal Makeup',
  'Skin Care Results',
  'Academy Training',
  'Salon Interiors',
]

export default function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const fetchGallery = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (activeCategory !== 'All') params.set('category', activeCategory)
      const res = await fetch(`/api/gallery?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [activeCategory])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  return (
    <section id="gallery" className="section-padding bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
            Our <span className="text-gold-gradient">Gallery</span>
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-warm-gray font-[family-name:var(--font-lato)]">
            A glimpse of our work and the beautiful transformations we create
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-[family-name:var(--font-lato)] transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-rose-gold text-white shadow-sm'
                  : 'bg-soft-pink text-warm-gray hover:bg-soft-pink-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        {loading ? (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="break-inside-avoid rounded-xl overflow-hidden bg-gray-200 animate-pulse"
                style={{ height: `${150 + (i % 3) * 60}px` }}
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-warm-gray font-[family-name:var(--font-lato)]">
            <Camera className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg">Gallery items coming soon!</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => setLightboxItem(item)}
                  className="block w-full relative rounded-xl overflow-hidden group cursor-pointer"
                >
                  <div
                    className={`relative w-full bg-gradient-to-br from-soft-pink to-cream ${
                      i % 3 === 0 ? 'h-56 md:h-64' : i % 3 === 1 ? 'h-44 md:h-52' : 'h-48 md:h-56'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                      <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                        <p className="text-white text-sm font-[family-name:var(--font-lato)] font-medium truncate">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <AnimatePresence>
        {lightboxItem && (
          <Dialog
            open={!!lightboxItem}
            onOpenChange={(open) => {
              if (!open) setLightboxItem(null)
            }}
          >
            <DialogContent className="max-w-3xl p-0 border-0 bg-black/90 backdrop-blur-sm">
              <DialogTitle className="sr-only">{lightboxItem.title}</DialogTitle>
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="relative w-full h-[60vh] md:h-[70vh]">
                <Image
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <div className="p-4">
                <p className="text-white text-center font-[family-name:var(--font-lato)]">
                  {lightboxItem.title}
                </p>
                {lightboxItem.category && (
                  <p className="text-white/60 text-center text-sm font-[family-name:var(--font-lato)]">
                    {lightboxItem.category}
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}