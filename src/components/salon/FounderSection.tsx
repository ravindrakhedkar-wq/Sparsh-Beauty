'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Award, CheckCircle, Users, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const achievements = [
  { label: "Masters in Beauty", icon: <BookOpen className="w-4 h-4" /> },
  { label: "Certified Professional", icon: <CheckCircle className="w-4 h-4" /> },
  { label: "15+ Years Experience", icon: <Award className="w-4 h-4" /> },
  { label: "500+ Students Trained", icon: <Users className="w-4 h-4" /> },
]

export default function FounderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="founder" className="section-padding bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="relative w-64 h-72 md:w-72 md:h-80 rounded-2xl overflow-hidden border-4 border-gold/30 shadow-xl">
                <Image
                  src="/images/geetanjali-khedkar.jpg"
                  alt="Mrs. Geetanjali Khedkar"
                  fill
                  sizes="(max-width: 1024px) 288px, 288px"
                  className="object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-64 h-72 md:w-72 md:h-80 rounded-2xl border-2 border-gold/20 -z-10" />
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-gold text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-lato)]">
              Meet the Founder
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mt-2 mb-2">
              Mrs. Geetanjali{' '}
              <span className="text-gold-gradient">Khedkar</span>
            </h2>
            <p className="text-rose-gold font-[family-name:var(--font-lato)] text-sm md:text-base font-medium mb-5">
              Founder &amp; Lead Beauty Expert
            </p>
            <p className="text-warm-gray font-[family-name:var(--font-lato)] leading-relaxed mb-6">
              Mrs. Geetanjali Khedkar is a qualified Hair &amp; Skin Care
              Professional with a Master&apos;s Degree from Beautic College of
              Beauty affiliated with the Maharashtra Technical Board. With
              extensive expertise in hair care, skincare, beauty treatments, and
              professional training, she is dedicated to helping clients look
              their best and guiding aspiring beauty professionals toward
              successful careers.
            </p>

            {/* Achievement Badges */}
            <div className="flex flex-wrap gap-3">
              {achievements.map((achievement) => (
                <Badge
                  key={achievement.label}
                  variant="outline"
                  className="border-gold/30 text-charcoal py-2 px-4 rounded-full font-[family-name:var(--font-lato)] text-xs md:text-sm hover:bg-gold/5 transition-colors"
                >
                  <span className="text-gold mr-2">{achievement.icon}</span>
                  {achievement.label}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}