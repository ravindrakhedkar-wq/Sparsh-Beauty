'use client'

import Image from 'next/image'
import Navbar from '@/components/salon/Navbar'
import Footer from '@/components/salon/Footer'
import FounderSection from '@/components/salon/FounderSection'
import WhyChooseSection from '@/components/salon/WhyChooseSection'
import { motion } from 'framer-motion'
import { Star, Lightbulb, Shield, Heart } from 'lucide-react'

const values = [
  {
    icon: <Star className="w-7 h-7 text-rose-gold" />,
    title: 'Excellence',
    description: 'We strive for perfection in every service, using premium products and refined techniques to deliver outstanding results every time.',
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-rose-gold" />,
    title: 'Innovation',
    description: 'We stay ahead of trends by continuously learning new techniques and adopting the latest beauty technologies and treatments.',
  },
  {
    icon: <Shield className="w-7 h-7 text-rose-gold" />,
    title: 'Integrity',
    description: 'We believe in honest consultations, transparent pricing, and building lasting relationships based on trust with every client.',
  },
  {
    icon: <Heart className="w-7 h-7 text-rose-gold" />,
    title: 'Care',
    description: 'Every client is treated like family. We listen, understand, and personalize our approach to ensure a truly exceptional experience.',
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

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {/* Page Banner */}
        <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/hero-salon.jpg" alt="" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-playfair)] mb-3"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-white/80 text-base md:text-lg font-[family-name:var(--font-lato)] max-w-2xl mx-auto"
            >
              Where Beauty Meets Expertise
            </motion.p>
          </div>
        </section>

        {/* Founder Section */}
        <FounderSection />

        {/* Our Story Section */}
        <section className="section-padding bg-cream">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-4">
                Our Story
              </h2>
              <div className="luxury-divider mx-auto mb-8" />
              <p className="text-warm-gray text-base md:text-lg font-[family-name:var(--font-lato)] leading-relaxed">
                Founded by Mrs. Geetanjali Khedkar, Sparsh Beauty Hair Salon &amp; Academy was born from a passion for helping people look and feel their best. What started as a small salon in Viman Nagar, Pune has grown into one of the most trusted beauty destinations in the city. We combine advanced techniques with personalized care to deliver results that exceed expectations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-4">
                Our Mission
              </h2>
              <div className="luxury-divider mx-auto mb-8" />
              <p className="text-warm-gray text-base md:text-lg font-[family-name:var(--font-lato)] leading-relaxed">
                To empower every client with confidence through premium beauty services and to nurture the next generation of beauty professionals through industry-leading training programs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Values Section */}
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
                Our Values
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
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-gold/10 mb-5 group-hover:bg-rose-gold/20 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
                    {value.title}
                  </h3>
                  <p className="text-warm-gray text-sm font-[family-name:var(--font-lato)] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseSection />
      </main>
      <Footer />
    </div>
  )
}