'use client'

import Image from 'next/image'
import Navbar from '@/components/salon/Navbar'
import Footer from '@/components/salon/Footer'
import AcademySection from '@/components/salon/AcademySection'
import { motion } from 'framer-motion'
import { Award, BookOpen, Briefcase, Users } from 'lucide-react'

const academyFeatures = [
  {
    icon: <Award className="w-8 h-8 text-rose-gold" />,
    title: 'Hands-on Training',
    description: 'Practice with real clients under expert supervision in our fully equipped salon environment.',
  },
  {
    icon: <BookOpen className="w-8 h-8 text-rose-gold" />,
    title: 'Industry Certification',
    description: 'Receive recognized certifications that validate your skills and open doors to top salons worldwide.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-rose-gold" />,
    title: 'Placement Assistance',
    description: 'Get dedicated placement support with our network of 100+ salon partners across India.',
  },
  {
    icon: <Users className="w-8 h-8 text-rose-gold" />,
    title: 'Experienced Faculty',
    description: 'Learn from industry veterans with 15+ years of experience in beauty and wellness.',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AcademyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Page Banner */}
        <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/academy.jpg" alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-playfair)] mb-3"
            >
              Beauty Academy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/80 text-base md:text-lg font-[family-name:var(--font-lato)] max-w-2xl mx-auto"
            >
              Learn. Practice. Grow.
            </motion.p>
          </div>
        </section>

        {/* Academy Courses Section */}
        <AcademySection />

        {/* Why Choose Sparsh Academy Section */}
        <section className="section-padding bg-cream">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-4">
                Why Choose Sparsh Academy?
              </h2>
              <div className="luxury-divider mx-auto" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {academyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-gold/10 mb-5 group-hover:bg-rose-gold/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-warm-gray text-sm font-[family-name:var(--font-lato)] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}