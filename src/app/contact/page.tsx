'use client'

import Image from 'next/image'
import Navbar from '@/components/salon/Navbar'
import Footer from '@/components/salon/Footer'
import ContactSection from '@/components/salon/ContactSection'
import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Page Banner */}
        <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/hero-salon.jpg" alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-playfair)] mb-3"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/80 text-base md:text-lg font-[family-name:var(--font-lato)] max-w-2xl mx-auto"
            >
              We&apos;d love to hear from you
            </motion.p>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}