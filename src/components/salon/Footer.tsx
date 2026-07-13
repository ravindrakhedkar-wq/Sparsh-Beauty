'use client'

import Link from 'next/link'
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Academy', href: '/academy' },
  { label: 'Products', href: '/products' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/#blog' },
  { label: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { label: 'Hair Care', href: '/services' },
  { label: 'Skin Care', href: '/services' },
  { label: 'Makeup', href: '/services' },
  { label: 'Nail Care', href: '/services' },
  { label: 'Bridal Services', href: '/services' },
]

const courseLinks = [
  { label: 'Beautician Course', href: '/academy' },
  { label: 'Hair Styling', href: '/academy' },
  { label: 'Makeup Artist', href: '/academy' },
  { label: 'Skin Care', href: '/academy' },
  { label: 'Bridal Makeup', href: '/academy' },
]

const socialLinks = [
  { icon: <Instagram className="w-4 h-4" />, href: 'https://www.instagram.com/sparshbeautypune', label: 'Instagram' },
  { icon: <Facebook className="w-4 h-4" />, href: 'https://www.facebook.com/sparshbeautypune', label: 'Facebook' },
  { icon: <Youtube className="w-4 h-4" />, href: '#', label: 'YouTube' },
  { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-[family-name:var(--font-playfair)] font-semibold text-lg mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-[family-name:var(--font-lato)] text-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold font-[family-name:var(--font-playfair)] font-semibold text-lg mb-5">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm font-[family-name:var(--font-lato)] text-white/60 hover:text-gold transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-gold font-[family-name:var(--font-playfair)] font-semibold text-lg mb-5">
              Courses
            </h3>
            <ul className="space-y-2.5">
              {courseLinks.map((c) => (
                <li key={c.label}>
                  <Link
                    href={c.href}
                    className="text-sm font-[family-name:var(--font-lato)] text-white/60 hover:text-gold transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-[family-name:var(--font-playfair)] font-semibold text-lg mb-5">
              Contact
            </h3>
            <div className="space-y-3 text-sm font-[family-name:var(--font-lato)] text-white/60">
              <p>Shop No. 5, Neco NX, Opposite Panchshil Tower, Viman Nagar, Pune 411014</p>
              <p className="text-gold">+91-9876543210</p>
              <p>info@sparshbeauty.com</p>
              <p>WhatsApp: +91-9876543210</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-[family-name:var(--font-lato)] text-white/40">
            © {new Date().getFullYear()} Sparsh Beauty Hair Salon &amp; Academy. All rights reserved.
          </p>
          <p className="text-xs font-[family-name:var(--font-playfair)] text-gold/60 italic">
            Where Beauty Meets Expertise
          </p>
          <div className="flex gap-4">
            <span className="text-xs font-[family-name:var(--font-lato)] text-white/40 hover:text-gold transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-xs font-[family-name:var(--font-lato)] text-white/40 hover:text-gold transition-colors cursor-pointer">
              Terms &amp; Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}