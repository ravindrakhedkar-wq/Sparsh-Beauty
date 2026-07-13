'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import type { CarouselApi } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface Testimonial {
  id: string
  name: string
  rating: number
  review: string
  service: string | null
  image: string | null
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'star-filled fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [api, setApi] = useState<CarouselApi>()

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch('/api/testimonials')
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch {
      // silent
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  return (
    <section className="section-padding bg-soft-pink" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
            What Our <span className="text-gold-gradient">Clients</span> Say
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-warm-gray font-[family-name:var(--font-lato)]">
            Real stories from our happy clients
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-6" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="h-3 bg-gray-200 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-warm-gray font-[family-name:var(--font-lato)]">
            <Quote className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg">Reviews coming soon!</p>
          </div>
        ) : (
          <div className="px-4 md:px-12">
            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow duration-300 relative">
                      <Quote className="absolute top-4 right-4 w-8 h-8 text-rose-gold-light/30" />
                      <StarRating rating={testimonial.rating} />
                      <p className="text-warm-gray font-[family-name:var(--font-lato)] text-sm leading-relaxed mb-5 line-clamp-4">
                        {testimonial.review}
                      </p>
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-soft-pink flex-shrink-0">
                          {testimonial.image ? (
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-rose-gold font-bold text-sm font-[family-name:var(--font-playfair)]">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal font-[family-name:var(--font-lato)]">
                            {testimonial.name}
                          </p>
                          {testimonial.service && (
                            <p className="text-xs text-rose-gold font-[family-name:var(--font-lato)]">
                              {testimonial.service}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </section>
  )
}