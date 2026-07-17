'use client'

import Link from 'next/link'
import Navbar from '@/components/salon/Navbar'
import HeroSection from '@/components/salon/HeroSection'
import WhyChooseSection from '@/components/salon/WhyChooseSection'
import BrandSection from '@/components/salon/BrandSection'
import BlogSection from '@/components/salon/BlogSection'
import Footer from '@/components/salon/Footer'
import { Scissors, Sparkles, Palette, GraduationCap, ShoppingBag, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const quickLinks = [
  { title: 'Our Services', desc: 'Hair, skin, makeup & nail care treatments', href: '/services', icon: <Scissors className="w-8 h-8" />, color: 'from-rose-gold/10 to-rose-gold/5' },
  { title: 'Beauty Academy', desc: 'Professional courses & certification programs', href: '/academy', icon: <GraduationCap className="w-8 h-8" />, color: 'from-gold/10 to-gold/5' },
  { title: 'Shop Products', desc: 'Premium beauty products curated by experts', href: '/products', icon: <ShoppingBag className="w-8 h-8" />, color: 'from-rose-gold-light/20 to-rose-gold-light/5' },
  { title: 'Book Appointment', desc: 'Reserve your spot for a beauty session', href: '/booking', icon: <Sparkles className="w-8 h-8" />, color: 'from-soft-pink to-cream' },
  { title: 'Gallery', desc: 'See our beautiful transformations', href: '/gallery', icon: <Palette className="w-8 h-8" />, color: 'from-gold-light/20 to-cream' },
  { title: 'Contact Us', desc: 'Get in touch with our team', href: '/contact', icon: <Sparkles className="w-8 h-8" />, color: 'from-soft-pink to-rose-gold-light/10' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* Quick Access Section */}
        <section className="section-padding bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
                Explore <span className="text-gold-gradient">Sparsh Beauty</span>
              </h2>
              <div className="luxury-divider mb-4" />
              <p className="text-warm-gray max-w-xl mx-auto font-[family-name:var(--font-lato)]">
                Discover everything we offer — from premium salon services to professional beauty training
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link href={item.href} className="block group">
                    <div className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${item.color} border border-rose-gold-light/10 hover:shadow-lg transition-all duration-300 h-full`}>
                      <div className="text-rose-gold mb-4">{item.icon}</div>
                      <h3 className="text-lg font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-2 group-hover:text-rose-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-warm-gray font-[family-name:var(--font-lato)] mb-4">
                        {item.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-rose-gold font-[family-name:var(--font-lato)] font-medium group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <WhyChooseSection />
        <BrandSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}