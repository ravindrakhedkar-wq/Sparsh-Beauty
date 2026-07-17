'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Academy', href: '/academy' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* ─── Desktop & Mobile Top Bar ─── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent
            ? 'bg-transparent'
            : 'bg-white/90 backdrop-blur-lg shadow-[0_2px_20px_rgba(183,110,121,0.08)]'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
                <Image
                  src="/images/sparsh-logo.png"
                  alt="Sparsh Beauty Logo"
                  fill
                  sizes="(max-width: 768px) 40px, 44px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl md:text-[26px] font-bold font-[family-name:var(--font-playfair)] text-gold-gradient tracking-wide group-hover:opacity-90 transition-opacity">
                  Sparsh
                </span>
                <span className={`text-2xl md:text-[26px] font-bold font-[family-name:var(--font-playfair)] transition-colors duration-300 ${
                  transparent ? 'text-rose-gold-light' : 'text-rose-gold'
                }`}>
                  Beauty
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[13px] tracking-[0.04em] uppercase font-[family-name:var(--font-lato)] transition-all duration-300 group ${
                      transparent
                        ? active
                          ? 'text-white font-semibold'
                          : 'text-rose-gold-light/90 hover:text-white'
                        : active
                        ? 'text-rose-gold font-semibold'
                        : 'text-charcoal/70 hover:text-rose-gold'
                    }`}
                  >
                    {link.label}
                    {/* Hover / Active underline */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ease-out ${
                        transparent
                          ? active
                            ? 'w-6 bg-white'
                            : 'w-0 group-hover:w-6 bg-white/70'
                          : active
                          ? 'w-6 bg-rose-gold'
                          : 'w-0 group-hover:w-6 bg-rose-gold/60'
                      }`}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/917721933444"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all duration-300"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-[18px] h-[18px]" />
              </a>
              <Link href="/booking">
                <Button className="bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full px-7 py-2.5 text-[13px] tracking-wide font-[family-name:var(--font-lato)] font-medium shadow-[0_4px_15px_rgba(183,110,121,0.35)] hover:shadow-[0_6px_20px_rgba(183,110,121,0.45)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                  Book Appointment
                </Button>
              </Link>
            </div>

            {/* Mobile: Icons + Hamburger */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href="https://wa.me/917721933444"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors duration-300 ${
                  transparent ? 'text-green-400' : 'text-green-500'
                }`}
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  transparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-charcoal hover:bg-soft-pink/50'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Slide-Over Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-white shadow-2xl lg:hidden flex flex-col"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-rose-gold-light/10">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src="/images/sparsh-logo.png"
                      alt="Sparsh Beauty Logo"
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">Sparsh</span>
                    <span className="text-lg font-bold text-rose-gold font-[family-name:var(--font-playfair)]">Beauty</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg text-charcoal/50 hover:text-charcoal hover:bg-soft-pink/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Links */}
              <div className="flex-1 overflow-y-auto py-3 px-3">
                <div className="flex flex-col gap-0.5">
                  {navLinks.map((link) => {
                    const active = isActive(link.href)
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`relative flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 font-[family-name:var(--font-lato)] text-[15px] ${
                          active
                            ? 'text-rose-gold bg-soft-pink/60 font-semibold'
                            : 'text-charcoal/75 hover:text-rose-gold hover:bg-soft-pink/30'
                        }`}
                      >
                        {link.label}
                        {active && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-gold" />
                        )}
                      </Link>
                    )
                  })}
                </div>

                {/* Book Button in Panel */}
                <div className="mt-4 px-3">
                  <Link href="/booking" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full py-3 font-[family-name:var(--font-lato)] font-medium shadow-[0_4px_15px_rgba(183,110,121,0.3)]">
                      Book Appointment
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="px-6 py-4 border-t border-rose-gold-light/10">
                <a
                  href="https://wa.me/917721933444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2 text-sm text-charcoal/50 font-[family-name:var(--font-lato)] hover:text-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}