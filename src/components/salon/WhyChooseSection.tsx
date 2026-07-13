'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const features = [
  'Certified Beauty Experts',
  'Advanced Hair & Skin Treatments',
  'Personalized Beauty Solutions',
  'Modern Equipment',
  'Hygienic Environment',
  'Affordable Luxury Services',
  'Professional Beauty Training',
  'Customer Satisfaction',
]

export default function WhyChooseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
            Why Choose{' '}
            <span className="text-gold-gradient">Sparsh Beauty</span>
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-warm-gray font-[family-name:var(--font-lato)] max-w-2xl mx-auto">
            We are committed to delivering excellence in every service, making
            your beauty journey exceptional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`rounded-xl p-5 flex items-center gap-4 transition-shadow duration-300 hover:shadow-md ${
                i % 2 === 0
                  ? 'bg-white border border-rose-gold-light/20'
                  : 'bg-cream border border-transparent'
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-rose-gold" />
              </div>
              <span className="text-sm md:text-base font-[family-name:var(--font-lato)] text-charcoal font-medium">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}