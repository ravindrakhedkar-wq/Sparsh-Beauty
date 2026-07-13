'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Scissors, Sparkles, Palette, Heart } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'

interface ServiceItem {
  name: string
  icon: React.ReactNode
}

const hairCareServices: ServiceItem[] = [
  { name: 'Hair Cutting & Styling', icon: <Scissors className="w-5 h-5" /> },
  { name: 'Hair Spa & Deep Conditioning', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Hair Smoothening', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Rebonding', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Keratin Treatment', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Hair Botox', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Hair Coloring', icon: <Palette className="w-5 h-5" /> },
  { name: 'Highlights', icon: <Palette className="w-5 h-5" /> },
  { name: 'Hair Fall Treatment', icon: <Heart className="w-5 h-5" /> },
  { name: 'Scalp Therapy', icon: <Heart className="w-5 h-5" /> },
]

const skinCareServices: ServiceItem[] = [
  { name: 'Professional Facials', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Skin Rejuvenation', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Detan Treatments', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Acne Care', icon: <Heart className="w-5 h-5" /> },
  { name: 'Pigmentation Treatment', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Bridal Glow Therapy', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Skin Brightening', icon: <Sparkles className="w-5 h-5" /> },
]

const makeupServices: ServiceItem[] = [
  { name: 'Bridal Makeup', icon: <Palette className="w-5 h-5" /> },
  { name: 'Engagement Makeup', icon: <Palette className="w-5 h-5" /> },
  { name: 'Party Makeup', icon: <Palette className="w-5 h-5" /> },
  { name: 'HD Makeup', icon: <Palette className="w-5 h-5" /> },
  { name: 'Airbrush Makeup', icon: <Palette className="w-5 h-5" /> },
  { name: 'Fashion Makeup', icon: <Palette className="w-5 h-5" /> },
]

const nailBeautyServices: ServiceItem[] = [
  { name: 'Manicure', icon: <Heart className="w-5 h-5" /> },
  { name: 'Pedicure', icon: <Heart className="w-5 h-5" /> },
  { name: 'Nail Care', icon: <Heart className="w-5 h-5" /> },
  { name: 'Waxing', icon: <Sparkles className="w-5 h-5" /> },
  { name: 'Threading', icon: <Scissors className="w-5 h-5" /> },
  { name: 'Eyebrow Shaping', icon: <Scissors className="w-5 h-5" /> },
  { name: 'Eyelash Services', icon: <Sparkles className="w-5 h-5" /> },
]

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="cursor-default"
    >
      <Card className="border border-rose-gold-light/30 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-soft-pink flex items-center justify-center text-rose-gold">
            {service.icon}
          </div>
          <span className="text-sm md:text-base font-[family-name:var(--font-lato)] text-charcoal font-medium">
            {service.name}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ServiceTabContent({
  services,
  quote,
}: {
  services: ServiceItem[]
  quote?: string
}) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {services.map((service, i) => (
          <ServiceCard key={service.name} service={service} index={i} />
        ))}
      </div>
      {quote && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 text-center text-warm-gray italic font-[family-name:var(--font-lato)] text-sm md:text-base"
        >
          &ldquo;{quote}&rdquo;
        </motion.p>
      )}
    </div>
  )
}

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="section-padding bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
            Our <span className="text-gold-gradient">Services</span>
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-warm-gray font-[family-name:var(--font-lato)] max-w-2xl mx-auto">
            Discover our comprehensive range of premium beauty services designed
            to make you look and feel your best.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="hair-care" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1 bg-soft-pink/60 h-auto p-2 mb-8 rounded-full">
              <TabsTrigger
                value="hair-care"
                className="data-[state=active]:bg-rose-gold data-[state=active]:text-white rounded-full px-4 md:px-6 py-2 text-sm font-[family-name:var(--font-lato)] text-charcoal transition-all"
              >
                Hair Care
              </TabsTrigger>
              <TabsTrigger
                value="skin-care"
                className="data-[state=active]:bg-rose-gold data-[state=active]:text-white rounded-full px-4 md:px-6 py-2 text-sm font-[family-name:var(--font-lato)] text-charcoal transition-all"
              >
                Skin Care
              </TabsTrigger>
              <TabsTrigger
                value="makeup"
                className="data-[state=active]:bg-rose-gold data-[state=active]:text-white rounded-full px-4 md:px-6 py-2 text-sm font-[family-name:var(--font-lato)] text-charcoal transition-all"
              >
                Makeup
              </TabsTrigger>
              <TabsTrigger
                value="nail-beauty"
                className="data-[state=active]:bg-rose-gold data-[state=active]:text-white rounded-full px-4 md:px-6 py-2 text-sm font-[family-name:var(--font-lato)] text-charcoal transition-all"
              >
                Nail &amp; Beauty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hair-care">
              <ServiceTabContent
                services={hairCareServices}
                quote="Your hair is the crown you never take off—wear it beautifully."
              />
            </TabsContent>
            <TabsContent value="skin-care">
              <ServiceTabContent services={skinCareServices} />
            </TabsContent>
            <TabsContent value="makeup">
              <ServiceTabContent services={makeupServices} />
            </TabsContent>
            <TabsContent value="nail-beauty">
              <ServiceTabContent
                services={nailBeautyServices}
                quote="Enhance the beauty and health of your nails with professional care, nourishment, and precision grooming."
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}