'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Academy', href: '/academy' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'Book Now', href: '/booking', isButton: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isHome = pathname === '/'
  const isTransparent = isHome && !scrolled

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleLinkClick = () => {
    setMobileOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent ? 'bg-transparent' : 'glass-effect shadow-md'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 flex-shrink-0">
              <span className={`text-xl md:text-2xl font-bold font-[family-name:var(--font-playfair)] ${isTransparent ? 'text-gold-gradient' : 'text-gold-gradient'}`}>
                Sparsh
              </span>
              <span className={`text-xl md:text-2xl font-bold font-[family-name:var(--font-playfair)] ${isTransparent ? 'text-white' : 'text-rose-gold'}`}>
                Beauty
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.filter(l => !l.isButton).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-[family-name:var(--font-lato)] transition-colors duration-200 tracking-wide ${
                    isActive(link.href)
                      ? 'text-rose-gold font-semibold'
                      : isTransparent
                      ? 'text-white/90 hover:text-gold-light'
                      : 'text-charcoal hover:text-rose-gold'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA + WhatsApp */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-green-600 hover:text-green-700 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <Link href="/booking">
                <Button
                  className="bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full px-6 font-[family-name:var(--font-lato)] text-sm"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>

            {/* Mobile: WhatsApp + Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 ${isTransparent ? 'text-green-400' : 'text-green-600'}`}
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="tel:+919876543210"
                className={`p-2 ${isTransparent ? 'text-white/80' : 'text-charcoal/70'}`}
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                className={`${isTransparent ? 'text-white' : 'text-charcoal'}`}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Horizontal Scrollable Nav Bar - visible on all screen sizes below lg */}
        <div className={`lg:hidden transition-all duration-300 border-t ${
          isTransparent
            ? 'bg-black/20 backdrop-blur-sm border-white/10'
            : 'bg-white/90 backdrop-blur-sm border-rose-gold-light/10'
        }`}>
          <div className="max-w-7xl mx-auto px-2">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1.5 -mx-1 px-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-[family-name:var(--font-lato)] transition-all duration-200 whitespace-nowrap ${
                    link.isButton
                      ? 'bg-rose-gold text-white font-semibold'
                      : isActive(link.href)
                      ? 'bg-rose-gold/10 text-rose-gold font-semibold border border-rose-gold/20'
                      : isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-charcoal/70 hover:text-rose-gold hover:bg-rose-gold/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-Over Menu */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Slide-in panel */}
          <div className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-rose-gold-light/10">
              <div>
                <span className="text-lg font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">Sparsh</span>
                <span className="text-lg font-bold text-rose-gold font-[family-name:var(--font-playfair)]"> Beauty</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-charcoal" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-3">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`text-left px-4 py-3 rounded-xl transition-colors font-[family-name:var(--font-lato)] text-base ${
                      isActive(link.href)
                        ? 'text-rose-gold bg-soft-pink font-semibold'
                        : 'text-charcoal hover:text-rose-gold hover:bg-soft-pink/50'
                    } ${link.isButton ? 'text-center mt-2' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-rose-gold-light/10">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 py-3 text-sm text-charcoal/70 font-[family-name:var(--font-lato)] hover:text-rose-gold transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}