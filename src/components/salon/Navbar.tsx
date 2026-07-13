'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = pathname === '/'

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome ? 'glass-effect shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl md:text-2xl font-bold text-gold-gradient font-[family-name:var(--font-playfair)]">
              Sparsh
            </span>
            <span className="text-xl md:text-2xl font-bold text-rose-gold font-[family-name:var(--font-playfair)]">
              Beauty
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-[family-name:var(--font-lato)] transition-colors duration-200 tracking-wide ${
                  isActive(link.href)
                    ? 'text-rose-gold font-semibold'
                    : (scrolled || !isHome)
                    ? 'text-charcoal hover:text-rose-gold'
                    : 'text-white hover:text-gold-light'
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

          {/* Mobile Menu */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 ${!isHome || scrolled ? 'text-green-600' : 'text-green-400'}`}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={`${
                  !isHome || scrolled ? 'text-charcoal' : 'text-white'
                }`}>
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-12">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-left px-4 py-3 rounded-lg transition-colors font-[family-name:var(--font-lato)] text-base ${
                        isActive(link.href)
                          ? 'text-rose-gold bg-soft-pink font-semibold'
                          : 'text-charcoal hover:text-rose-gold hover:bg-soft-pink'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 px-4">
                    <Link href="/booking" onClick={() => setMobileOpen(false)}>
                      <Button
                        className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)]"
                      >
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}