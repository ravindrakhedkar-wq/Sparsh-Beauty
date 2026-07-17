'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ShieldCheck, Sparkles, Check } from 'lucide-react'

const brands = [
  {
    name: "L'Oréal Professionnel",
    logo: "/images/loreal-logo.jpg",
    tagline: "Parisian Hair Expertise",
    specialization: "Advanced Hair care & Styling",
    description: "As an authorized L'Oréal Professionnel salon, we specialize in high-end hair transformations. From ammonia-free global hair coloring to deep conditioning hair spas and advanced protein treatments, we bring Parisian hair care standards to Pune.",
    features: [
      "Ammonia-Free Hair Coloring",
      "Advanced Hair Spa & Scalp Care",
      "Pro-Keratin & Bond-Strengthening",
      "Tailored Styling & Haircuts"
    ],
    bgColor: "bg-white",
    borderColor: "border-black/5",
    tagColor: "text-black bg-black/5"
  },
  {
    name: "Lotus Professional",
    logo: "/images/lotus-logo.png",
    tagline: "Natural Skin Wellness",
    specialization: "Premium Skin Care & Facials",
    description: "Combining pure organic ingredients with cutting-edge skincare science, our Lotus Professional treatments deliver immediate, visible results. We offer clinically-proven organic facials, skin-brightening peels, and anti-aging therapies.",
    features: [
      "Gold & Pearl Radiance Facials",
      "Organic Dermaceutical Peels",
      "Acne & Hydration Treatments",
      "Natural Plant-Derived Formulations"
    ],
    bgColor: "bg-white",
    borderColor: "border-rose-gold-light/20",
    tagColor: "text-rose-gold bg-soft-pink/50"
  }
]

export default function BrandSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="brands" className="section-padding bg-cream border-t border-rose-gold-light/10" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-gold/10 text-rose-gold text-xs tracking-wider uppercase font-[family-name:var(--font-lato)] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Premium Brands We Partner With
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-4">
            Authorized <span className="text-gold-gradient">Brand Specializations</span>
          </h2>
          <div className="luxury-divider mb-5" />
          <p className="text-warm-gray font-[family-name:var(--font-lato)] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            We exclusively use and recommend dermatologically tested, premium salon formulations to ensure your hair and skin receive the finest care possible.
          </p>
        </motion.div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ${brand.bgColor} ${brand.borderColor}`}
            >
              {/* Header Info */}
              <div className="p-8 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-rose-gold-light/10">
                <div className="flex items-center gap-4">
                  <div className="relative w-36 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      fill
                      sizes="144px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gold tracking-wider uppercase font-[family-name:var(--font-lato)]">
                      {brand.tagline}
                    </span>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-playfair)] text-charcoal">
                      {brand.name}
                    </h3>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide font-[family-name:var(--font-lato)] ${brand.tagColor}`}>
                  {brand.specialization}
                </span>
              </div>

              {/* Description & Features */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <p className="text-warm-gray text-sm font-[family-name:var(--font-lato)] leading-relaxed mb-6">
                  {brand.description}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider font-[family-name:var(--font-lato)] mb-4 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    Specialized Treatments Offered
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {brand.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-warm-gray font-[family-name:var(--font-lato)]"
                      >
                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gold/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-gold" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
