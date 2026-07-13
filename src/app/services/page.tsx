'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/salon/Navbar'
import Footer from '@/components/salon/Footer'
import ServicesSection from '@/components/salon/ServicesSection'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Page Banner */}
        <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/hair-care.jpg" alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-playfair)] mb-3"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/80 text-base md:text-lg font-[family-name:var(--font-lato)] max-w-2xl mx-auto"
            >
              Comprehensive premium beauty services tailored to enhance your natural beauty
            </motion.p>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* CTA Section */}
        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-gold/10 mb-6">
                <Sparkles className="w-8 h-8 text-rose-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-4">
                Ready to Experience Our Services?
              </h2>
              <p className="text-warm-gray text-base md:text-lg font-[family-name:var(--font-lato)] max-w-2xl mx-auto mb-8">
                Book your appointment today and let our expert team transform your look with personalized care and premium products.
              </p>
              <Link href="/booking">
                <Button size="lg" className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8 py-6 text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Book Appointment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}