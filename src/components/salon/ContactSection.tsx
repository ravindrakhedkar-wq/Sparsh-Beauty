'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.message) {
      toast.error('Name and message are required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success('Message sent successfully!', {
          description: 'We will get back to you soon.',
        })
        setForm({ name: '', email: '', mobile: '', subject: '', message: '' })
      }
    } catch {
      toast.error('Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Address',
      value: 'Shop No. 5, Neco NX, Opposite Panchshil Tower, Viman Nagar, Pune 411014',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+91-7721933444',
      href: 'tel:+917721933444',
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      value: 'Chat on WhatsApp',
      href: 'https://wa.me/917721933444',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'info@sparshbeauty.com',
      href: 'mailto:info@sparshbeauty.com',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Hours',
      value: 'Mon - Sat: 9:00 AM - 9:00 PM\nSunday: 10:00 AM - 6:00 PM',
    },
  ]

  return (
    <section id="contact" className="section-padding bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
            Get in <span className="text-gold-gradient">Touch</span>
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-warm-gray font-[family-name:var(--font-lato)]">
            We&apos;d love to hear from you. Reach out to us anytime!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="contact-name"
                  className="font-[family-name:var(--font-lato)] text-sm text-charcoal"
                >
                  Full Name *
                </Label>
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="font-[family-name:var(--font-lato)] text-sm text-charcoal"
                  >
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-mobile"
                    className="font-[family-name:var(--font-lato)] text-sm text-charcoal"
                  >
                    Mobile
                  </Label>
                  <Input
                    id="contact-mobile"
                    name="mobile"
                    type="tel"
                    placeholder="Enter your mobile"
                    value={form.mobile}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact-subject"
                  className="font-[family-name:var(--font-lato)] text-sm text-charcoal"
                >
                  Subject
                </Label>
                <Input
                  id="contact-subject"
                  name="subject"
                  placeholder="What is this about?"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact-message"
                  className="font-[family-name:var(--font-lato)] text-sm text-charcoal"
                >
                  Message *
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Write your message here..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full py-6 text-base font-[family-name:var(--font-lato)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {contactInfo.map((item) => {
              const content = (
                <div className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-soft-pink flex items-center justify-center text-rose-gold group-hover:bg-rose-gold group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-warm-gray font-[family-name:var(--font-lato)] uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-charcoal font-[family-name:var(--font-lato)] whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              )

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block hover:opacity-80 transition-opacity"
                  >
                    {content}
                  </a>
                )
              }
              return <div key={item.label}>{content}</div>
            })}

            {/* Google Map */}
            <div className="mt-6 rounded-xl overflow-hidden border border-rose-gold-light/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.065534221698!2d73.9143!3d18.5662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM0JzAwLjAiTiA3M8KwNTQnNTEuNSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sparsh Beauty Location"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917721933444"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </section>
  )
}