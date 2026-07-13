'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const headline = 'Beautiful Hair. Radiant Skin. Confident You.'

export default function HeroSection() {
  const scrollToBooking = () => {
    const el = document.querySelector('#booking')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToAcademy = () => {
    const el = document.querySelector('#academy')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToProducts = () => {
    const el = document.querySelector('#products')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-salon.jpg"
          alt="Sparsh Beauty Hair Salon"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-[10%] w-24 h-24 rounded-full border border-gold/20"
          animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-[8%] w-16 h-16 rounded-full border border-rose-gold/20"
          animate={{ y: [0, 12, 0], rotate: [0, -90, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-[15%] w-8 h-8 rounded-full bg-gold/10"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[20%] w-6 h-6 rounded-full bg-rose-gold/10"
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="inline-block text-gold text-sm md:text-base tracking-[0.3em] uppercase font-[family-name:var(--font-lato)]">
            Viman Nagar, Pune
          </span>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-[family-name:var(--font-playfair)] leading-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {headline.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.5 + i * 0.02,
                ease: 'easeOut',
              }}
              className={char === ' ' ? 'inline' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8 font-[family-name:var(--font-lato)] leading-relaxed"
        >
          Experience premium hair care, skin treatments, bridal makeup, and
          professional beauty training at Geetanjali&apos;s Sparsh Beauty Hair
          Salon &amp; Academy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={scrollToBooking}
            size="lg"
            className="bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full px-8 py-6 text-base font-[family-name:var(--font-lato)] shadow-lg"
          >
            Book Appointment
          </Button>
          <Button
            onClick={scrollToAcademy}
            variant="outline"
            size="lg"
            className="border-gold text-gold hover:bg-gold/10 rounded-full px-8 py-6 text-base font-[family-name:var(--font-lato)]"
          >
            Explore Courses
          </Button>
          <Button
            onClick={scrollToProducts}
            variant="outline"
            size="lg"
            className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-base font-[family-name:var(--font-lato)]"
          >
            Shop Products
          </Button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-white/60 text-xs tracking-widest uppercase font-[family-name:var(--font-lato)]">
          Scroll Down
        </span>
        <ChevronDown className="w-5 h-5 text-white/60" />
      </motion.div>
    </section>
  )
}