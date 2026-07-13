'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Scissors, Sparkles, Palette, Heart, Clock, Check, X, ChevronRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface ServiceDetail {
  name: string
  icon: React.ReactNode
  price: number
  duration: string
  shortDesc: string
  description: string
  includes: string[]
  idealFor: string
}

const hairCareServices: ServiceDetail[] = [
  {
    name: 'Hair Cutting & Styling',
    icon: <Scissors className="w-5 h-5" />,
    price: 499,
    duration: '45–60 min',
    shortDesc: 'Expert cuts tailored to your face shape and style preference',
    description: 'Our expert stylists analyze your face shape, hair texture, and lifestyle to create a look that complements you perfectly. From classic cuts to trendy styles, we ensure every snip enhances your natural beauty.',
    includes: ['Consultation with stylist', 'Hair wash & conditioning', 'Precision cut & styling', 'Blow dry finish', 'Aftercare tips'],
    idealFor: 'Anyone looking for a fresh, flattering hairstyle — men, women, and kids welcome.',
  },
  {
    name: 'Hair Spa & Deep Conditioning',
    icon: <Sparkles className="w-5 h-5" />,
    price: 1299,
    duration: '60–75 min',
    shortDesc: 'Intensive nourishment therapy for damaged or dry hair',
    description: 'A luxurious multi-step spa treatment that deeply nourishes and repairs your hair from root to tip. We use premium salon-grade products to restore moisture, shine, and strength to even the most damaged hair.',
    includes: ['Hair analysis', 'Deep cleansing shampoo', 'Intensive conditioning mask', 'Steam therapy', 'Scalp massage', 'Blow dry finish'],
    idealFor: 'Dry, frizzy, chemically-treated, or damaged hair needing intense repair.',
  },
  {
    name: 'Hair Smoothening',
    icon: <Sparkles className="w-5 h-5" />,
    price: 3999,
    duration: '2–3 hours',
    shortDesc: 'Frizz-free, silky smooth hair that lasts 3–4 months',
    description: 'Our hair smoothening treatment uses advanced protein-rich formulas to relax hair bonds, eliminating frizz and leaving your hair silky, manageable, and glossy for months.',
    includes: ['Hair compatibility test', 'Pre-treatment shampoo', 'Smoothening cream application', 'Flat iron processing', 'Post-treatment care', 'Maintenance tips'],
    idealFor: 'People with frizzy, unmanageable, or wavy hair wanting smooth, straight results.',
  },
  {
    name: 'Rebonding',
    icon: <Sparkles className="w-5 h-5" />,
    price: 4999,
    duration: '3–4 hours',
    shortDesc: 'Permanent straightening for perfectly sleek, pin-straight hair',
    description: 'A chemical restructuring treatment that permanently breaks and rebuilds hair bonds to give you pin-straight, glossy hair. Uses premium Japanese/American products for safe, lasting results.',
    includes: ['Strand test', 'Pre-treatment care', 'Bond breaking cream', 'Neutralizer application', 'Flat iron finishing', 'Aftercare kit'],
    idealFor: 'Those wanting permanently straight, sleek hair with minimal daily maintenance.',
  },
  {
    name: 'Keratin Treatment',
    icon: <Sparkles className="w-5 h-5" />,
    price: 5499,
    duration: '2–3 hours',
    shortDesc: 'Brazilian keratin for shiny, frizz-free, healthy-looking hair',
    description: 'Our premium keratin treatment infuses natural keratin deep into the hair cuticle, repairing damage and creating a protective layer that eliminates frizz and adds incredible shine. Results last 3–5 months.',
    includes: ['Hair porosity test', 'Clarifying wash', 'Keratin application', 'Blow dry & flat iron seal', 'Post-treatment shampoo', '48hr care instructions'],
    idealFor: 'All hair types — especially beneficial for frizzy, damaged, or color-treated hair.',
  },
  {
    name: 'Hair Botox',
    icon: <Sparkles className="w-5 h-5" />,
    price: 4499,
    duration: '90–120 min',
    shortDesc: 'Anti-aging deep repair treatment for volume and shine',
    description: 'Hair Botox is a non-chemical, deep conditioning treatment that fills in broken hair fibers with hyaluronic acid, collagen, and vitamins. It plumps fine hair, adds volume, and restores youthful bounce without changing hair structure.',
    includes: ['Hair diagnosis', 'Cleansing treatment', 'Botox mask application', 'Infrared heat activation', 'Rinse & blow dry', 'Shine spray finish'],
    idealFor: 'Fine, thinning, or aging hair that needs volume, strength, and a youthful look.',
  },
  {
    name: 'Hair Coloring',
    icon: <Palette className="w-5 h-5" />,
    price: 2499,
    duration: '2–3 hours',
    shortDesc: 'Global color, highlights, and creative color techniques',
    description: 'From natural-looking global colors to bold fashion shades, our colorists use ammonia-free formulas to deliver vibrant, long-lasting color while keeping your hair healthy and shiny.',
    includes: ['Color consultation', 'Patch test', 'Premium color application', 'Processing time', 'Color-protective shampoo', 'Conditioning treatment', 'Blow dry styling'],
    idealFor: 'Anyone wanting to cover grays, change their look, or add dimension with color.',
  },
  {
    name: 'Highlights',
    icon: <Palette className="w-5 h-5" />,
    price: 3499,
    duration: '2.5–3.5 hours',
    shortDesc: 'Dimensional highlights for a natural, sun-kissed effect',
    description: 'Our expert colorists hand-paint highlights using the balayage or foil technique to create natural, multi-dimensional color that brightens your face and adds movement to your hair.',
    includes: ['Color consultation', 'Strand selection', 'Lightener application', 'Foil/balayage technique', 'Toner application', 'Deep conditioning', 'Styling'],
    idealFor: 'Those wanting natural-looking dimension and brightness without a full color change.',
  },
  {
    name: 'Hair Fall Treatment',
    icon: <Heart className="w-5 h-5" />,
    price: 1999,
    duration: '60–75 min',
    shortDesc: 'Clinically-proven treatment to reduce hair fall and strengthen roots',
    description: 'A targeted treatment using peptide-rich serums, scalp stimulators, and nourishing oils to strengthen hair roots, improve blood circulation, and significantly reduce hair fall over a series of sessions.',
    includes: ['Scalp analysis', 'Deep cleansing', 'Growth serum application', 'Scalp stimulation massage', 'Laser comb therapy', 'Nourishing mask'],
    idealFor: 'People experiencing hair thinning, excessive shedding, or weak hair roots.',
  },
  {
    name: 'Scalp Therapy',
    icon: <Heart className="w-5 h-5" />,
    price: 1499,
    duration: '45–60 min',
    shortDesc: 'Deep scalp detox and rejuvenation for healthy hair growth',
    description: 'Our scalp therapy targets dandruff, oiliness, itchiness, and product buildup. Using exfoliating scrubs, antibacterial serums, and hydrating treatments, we restore your scalp to its optimal healthy state.',
    includes: ['Scalp examination', 'Exfoliating scrub', 'Antibacterial treatment', 'Hydrating serum', 'Steaming', 'Relaxing massage'],
    idealFor: 'Anyone with scalp issues like dandruff, excess oil, dryness, or product buildup.',
  },
]

const skinCareServices: ServiceDetail[] = [
  {
    name: 'Professional Facials',
    icon: <Sparkles className="w-5 h-5" />,
    price: 999,
    duration: '60–75 min',
    shortDesc: 'Customized facials for glowing, healthy skin',
    description: 'Our facials are customized to your skin type and concerns. Using premium products, each facial includes deep cleansing, exfoliation, extraction, massage, and masking for visibly radiant skin.',
    includes: ['Skin analysis', 'Double cleansing', 'Exfoliation', 'Extractions (if needed)', 'Face & neck massage', 'Custom mask', 'Moisturizing & sun protection'],
    idealFor: 'All skin types — customized for oily, dry, combination, or sensitive skin.',
  },
  {
    name: 'Skin Rejuvenation',
    icon: <Sparkles className="w-5 h-5" />,
    price: 2499,
    duration: '75–90 min',
    shortDesc: 'Advanced anti-aging treatment to restore youthful glow',
    description: "A multi-step treatment using serums, LED therapy, and premium masks to boost collagen production, reduce fine lines, and restore your skin's natural youthful radiance.",
    includes: ['Skin assessment', 'Micro-dermabrasion', 'Vitamin C serum infusion', 'LED light therapy', 'Collagen mask', 'Lifting massage', 'SPF protection'],
    idealFor: 'Aging skin with fine lines, dullness, or loss of firmness.',
  },
  {
    name: 'Detan Treatments',
    icon: <Sparkles className="w-5 h-5" />,
    price: 1499,
    duration: '60 min',
    shortDesc: 'Effective tan removal for even-toned, brighter skin',
    description: 'Our detan treatment uses natural enzymes and mild bleaching agents to safely remove tanning, sun spots, and uneven pigmentation, revealing brighter, more even-toned skin underneath.',
    includes: ['Skin type assessment', 'Pre-cleansing', 'Detan pack application', 'Steam therapy', 'Cooling mask', 'Moisturizing finish'],
    idealFor: 'Sun-tanned or uneven skin tone from sun exposure.',
  },
  {
    name: 'Acne Care',
    icon: <Heart className="w-5 h-5" />,
    price: 1799,
    duration: '60–75 min',
    shortDesc: 'Clinical acne treatment to clear breakouts and prevent scars',
    description: 'A targeted clinical treatment that addresses active acne, reduces inflammation, unclogs pores, and prevents future breakouts using antibacterial and anti-inflammatory formulations.',
    includes: ['Skin analysis', 'Antibacterial cleansing', 'Comedone extraction', 'Anti-acne serum', 'Calming mask', 'Blue light therapy', 'Oil-free moisturizer'],
    idealFor: 'Acne-prone skin with active breakouts, blackheads, or whiteheads.',
  },
  {
    name: 'Pigmentation Treatment',
    icon: <Sparkles className="w-5 h-5" />,
    price: 2999,
    duration: '75–90 min',
    shortDesc: 'Advanced treatment to reduce dark spots and even out skin tone',
    description: 'Using brightening serums, mild peels, and targeted treatments, we work to reduce hyperpigmentation, dark spots, and uneven skin tone for a clearer, more uniform complexion.',
    includes: ['Skin mapping', 'Brightening cleanser', 'Glycolic peel', 'Vitamin C infusion', 'Depigmentation mask', 'SPF protection'],
    idealFor: 'Dark spots, melasma, sun spots, or post-acne pigmentation.',
  },
  {
    name: 'Bridal Glow Therapy',
    icon: <Sparkles className="w-5 h-5" />,
    price: 3999,
    duration: '90–120 min',
    shortDesc: 'Complete pre-bridal skin prep for that perfect wedding glow',
    description: 'A luxurious multi-session package designed to give brides-to-be a radiant, camera-ready glow on their special day. Includes deep cleansing, brightening, hydration, and glow-boosting treatments.',
    includes: ['Skin analysis & plan', 'Gold facial', 'Hydra facial', 'Skin brightening pack', 'De-tan treatment', 'Glow-boosting serum', 'Face & neck massage', 'Bridal skincare kit'],
    idealFor: 'Brides-to-be starting 1–2 months before the wedding for best results.',
  },
  {
    name: 'Skin Brightening',
    icon: <Sparkles className="w-5 h-5" />,
    price: 1999,
    duration: '60–75 min',
    shortDesc: 'Professional brightening for radiant, luminous skin',
    description: 'Our skin brightening treatment uses a combination of exfoliation, vitamin infusions, and brightening masks to give you an immediate, visible glow and long-term improvement in skin clarity.',
    includes: ['Skin type analysis', 'Enzyme peel', 'Vitamin C serum', 'Brightening mask', 'Face massage', 'Hydrating finish'],
    idealFor: 'Dull, tired, or uneven skin needing an instant brightness boost.',
  },
]

const makeupServices: ServiceDetail[] = [
  {
    name: 'Bridal Makeup',
    icon: <Palette className="w-5 h-5" />,
    price: 14999,
    duration: '3–4 hours',
    shortDesc: 'Complete bridal look — flawless, long-lasting, camera-ready',
    description: 'Our signature bridal makeup service creates a timeless, elegant look that photographs beautifully and lasts through tears, dancing, and celebrations. Using HD and long-wear products for a flawless finish.',
    includes: ['Pre-bridal consultation', 'Skin prep & primer', 'HD foundation application', 'Eye makeup with lashes', 'Contouring & highlighting', 'Lip color selection', 'Setting spray', 'Touch-up kit'],
    idealFor: 'Brides wanting a perfect, long-lasting look for their wedding day.',
  },
  {
    name: 'Engagement Makeup',
    icon: <Palette className="w-5 h-5" />,
    price: 6999,
    duration: '2–2.5 hours',
    shortDesc: 'Elegant, radiant look for your engagement ceremony',
    description: 'A refined, elegant makeup look perfect for engagement ceremonies, mehndi, or sangeet. We focus on a glowing, fresh look that complements your outfit and jewelry.',
    includes: ['Skin preparation', 'Primer & base', 'Eye makeup', 'Blush & contour', 'Lip color', 'Hairstyling', 'Setting & finishing'],
    idealFor: 'Brides-to-be for pre-wedding events and engagement ceremonies.',
  },
  {
    name: 'Party Makeup',
    icon: <Palette className="w-5 h-5" />,
    price: 2999,
    duration: '60–90 min',
    shortDesc: 'Glamorous makeup for parties, events, and celebrations',
    description: 'A trendy, glam makeup look perfect for parties, cocktails, and social events. We customize the look to match your outfit and the event vibe — from subtle glam to full glam.',
    includes: ['Skin prep', 'Foundation & concealer', 'Eye makeup', 'Contouring', 'Lip color', 'Lashes', 'Finishing spray'],
    idealFor: 'Anyone wanting a glamorous look for parties, events, or nights out.',
  },
  {
    name: 'HD Makeup',
    icon: <Palette className="w-5 h-5" />,
    price: 4999,
    duration: '90–120 min',
    shortDesc: 'High-definition makeup for a flawless, natural finish',
    description: 'HD makeup uses ultra-fine, high-definition products that are invisible to the camera but give your skin a flawless, airbrushed finish. Perfect for photoshoots and close-up events.',
    includes: ['Color matching', 'HD primer', 'HD foundation', 'Concealer application', 'HD setting powder', 'Eye & lip makeup', 'Finishing spray'],
    idealFor: 'Photoshoots, close-up events, and anyone wanting a camera-perfect finish.',
  },
  {
    name: 'Airbrush Makeup',
    icon: <Palette className="w-5 h-5" />,
    price: 7999,
    duration: '90–120 min',
    shortDesc: 'Lightweight, flawless airbrush technique for a perfect finish',
    description: 'Airbrush makeup uses a specialized airbrush gun to spray micro-fine makeup onto your skin, creating an incredibly even, lightweight, and long-lasting finish that looks stunning in person and on camera.',
    includes: ['Skin analysis', 'Airbrush primer', 'Airbrush foundation', 'Airbrush contouring', 'Concealer detailing', 'Eye & lip makeup', 'Airbrush setting'],
    idealFor: 'Brides and events where photography is a priority — lasts 12+ hours.',
  },
  {
    name: 'Fashion Makeup',
    icon: <Palette className="w-5 h-5" />,
    price: 5999,
    duration: '90–120 min',
    shortDesc: 'Bold, creative looks for fashion shoots and ramp walks',
    description: 'Creative, editorial-style makeup for fashion shoots, ramp walks, and editorial projects. Our artists create bold, artistic looks that make a statement on camera and on the runway.',
    includes: ['Mood board consultation', 'Creative design', 'Full face makeup', 'Artistic elements', 'False lashes', 'Body makeup if needed', 'Multiple look changes'],
    idealFor: 'Models, influencers, fashion events, and creative photoshoots.',
  },
]

const nailBeautyServices: ServiceDetail[] = [
  {
    name: 'Manicure',
    icon: <Heart className="w-5 h-5" />,
    price: 499,
    duration: '30–45 min',
    shortDesc: 'Classic nail care for beautifully groomed hands',
    description: 'Our manicure includes nail shaping, cuticle care, hand massage, and polish application for beautifully groomed, elegant hands.',
    includes: ['Nail shaping & filing', 'Cuticle care', 'Hand exfoliation', 'Hand massage', 'Moisturizing', 'Nail polish application'],
    idealFor: 'Regular nail care and grooming for clean, polished hands.',
  },
  {
    name: 'Pedicure',
    icon: <Heart className="w-5 h-5" />,
    price: 699,
    duration: '45–60 min',
    shortDesc: 'Relaxing foot care treatment for soft, beautiful feet',
    description: 'A complete foot care treatment including foot soak, callus removal, nail care, and massage for soft, refreshed, and beautiful feet.',
    includes: ['Foot soak', 'Callus removal', 'Nail shaping', 'Cuticle care', 'Foot scrub', 'Foot & leg massage', 'Moisturizing', 'Nail polish'],
    idealFor: 'Regular foot care, cracked heels, or for a relaxing pampering session.',
  },
  {
    name: 'Nail Care',
    icon: <Heart className="w-5 h-5" />,
    price: 799,
    duration: '60–75 min',
    shortDesc: 'Gel/acrylic nail extensions and nail art',
    description: 'Premium nail care including gel extensions, acrylic nails, and creative nail art. Our nail artists create stunning designs using premium products that last 2–3 weeks.',
    includes: ['Nail preparation', 'Extension application (gel/acrylic)', 'Shape & length selection', 'Nail art design', 'Top coat & seal', 'Aftercare tips'],
    idealFor: 'Those wanting long, beautiful nails with creative designs.',
  },
  {
    name: 'Waxing',
    icon: <Sparkles className="w-5 h-5" />,
    price: 399,
    duration: '20–45 min',
    shortDesc: 'Smooth, hair-free skin with premium waxing',
    description: 'We use gentle, premium wax suitable for sensitive skin. Our experienced therapists ensure minimal discomfort and silky-smooth results that last 3–4 weeks.',
    includes: ['Pre-wax cleansing', 'Premium wax application', 'Soothing post-wax oil', 'Aloe vera gel application', 'Aftercare advice'],
    idealFor: 'Anyone wanting smooth, hair-free skin on any body area.',
  },
  {
    name: 'Threading',
    icon: <Scissors className="w-5 h-5" />,
    price: 99,
    duration: '10–15 min',
    shortDesc: 'Precise eyebrow shaping and facial threading',
    description: 'Traditional threading technique for precise, clean hair removal. Perfect for eyebrow shaping, upper lip, chin, and forehead for a well-groomed look.',
    includes: ['Area preparation', 'Precision threading', 'Soothing aloe application', 'Aftercare tips'],
    idealFor: 'Quick, precise hair removal for eyebrows and facial areas.',
  },
  {
    name: 'Eyebrow Shaping',
    icon: <Scissors className="w-5 h-5" />,
    price: 199,
    duration: '20–30 min',
    shortDesc: 'Expert brow shaping to frame your face perfectly',
    description: 'Our brow artists assess your face shape and features to create the perfect eyebrow arch and shape that frames your face, opens your eyes, and enhances your natural beauty.',
    includes: ['Face shape analysis', 'Brow mapping', 'Threading/waxing', 'Trimming & tweezing', 'Brow gel application', 'Aftercare advice'],
    idealFor: 'Anyone wanting perfectly shaped, defined eyebrows.',
  },
  {
    name: 'Eyelash Services',
    icon: <Sparkles className="w-5 h-5" />,
    price: 999,
    duration: '60–90 min',
    shortDesc: 'Lash extensions, lifts, and tinting for dramatic eyes',
    description: 'Enhance your eyes with our premium lash services. Choose from lash extensions for dramatic length and volume, lash lifts for a natural curl, or lash tinting for defined, dark lashes.',
    includes: ['Lash consultation', 'Lash preparation', 'Extension/lift/tint application', 'Bonding/sealing', 'Aftercare instructions', 'Touch-up schedule'],
    idealFor: 'Anyone wanting enhanced, beautiful eyes without daily mascara.',
  },
]

const allCategories = [
  { key: 'hair-care', label: 'Hair Care', services: hairCareServices, quote: 'Your hair is the crown you never take off—wear it beautifully.' },
  { key: 'skin-care', label: 'Skin Care', services: skinCareServices },
  { key: 'makeup', label: 'Makeup', services: makeupServices },
  { key: 'nail-beauty', label: 'Nail & Beauty', services: nailBeautyServices, quote: 'Enhance the beauty and health of your nails with professional care, nourishment, and precision grooming.' },
]

/* ─── Custom Modal (no Radix portal) ─── */
function ServiceModal({
  service,
  open,
  onClose,
}: {
  service: ServiceDetail | null
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open || !service) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-soft-pink/80 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-soft-pink transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-soft-pink flex items-center justify-center text-rose-gold">
              {service.icon}
            </div>
            <div className="min-w-0">
              <h3 className="font-[family-name:var(--font-playfair)] text-charcoal text-xl font-bold pr-8">
                {service.name}
              </h3>
              <div className="flex items-center gap-3 mt-1.5">
                <Badge className="bg-rose-gold/10 text-rose-gold border-0 text-xs font-[family-name:var(--font-lato)]">
                  {service.duration}
                </Badge>
                <span className="text-lg font-bold text-rose-gold font-[family-name:var(--font-playfair)]">
                  ₹{service.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-warm-gray font-[family-name:var(--font-lato)] leading-relaxed mb-5">
            {service.description}
          </p>

          {/* What's Included */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" />
              What&apos;s Included
            </h4>
            <div className="space-y-2">
              {service.includes.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-sm text-charcoal/80 font-[family-name:var(--font-lato)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best For */}
          <div className="bg-soft-pink/50 rounded-xl p-4 mb-5">
            <h4 className="text-sm font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-2">
              Best For
            </h4>
            <p className="text-sm text-warm-gray font-[family-name:var(--font-lato)]">
              {service.idealFor}
            </p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-cream rounded-xl p-3 text-center">
              <p className="text-xs text-warm-gray font-[family-name:var(--font-lato)] mb-1">Duration</p>
              <p className="text-sm font-semibold text-charcoal font-[family-name:var(--font-lato)]">{service.duration}</p>
            </div>
            <div className="bg-cream rounded-xl p-3 text-center">
              <p className="text-xs text-warm-gray font-[family-name:var(--font-lato)] mb-1">Starting Price</p>
              <p className="text-sm font-semibold text-rose-gold font-[family-name:var(--font-playfair)]">₹{service.price.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* CTA */}
          <Link href="/booking" onClick={onClose}>
            <Button className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)] py-5 text-base">
              Book This Service
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, index, onClick }: { service: ServiceDetail; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -2 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="border border-rose-gold-light/30 shadow-sm hover:shadow-md hover:border-rose-gold/40 transition-all duration-300 bg-white group">
        <CardContent className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-soft-pink flex items-center justify-center text-rose-gold group-hover:bg-rose-gold group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm md:text-base font-[family-name:var(--font-lato)] text-charcoal font-semibold truncate">
                  {service.name}
                </h3>
                <p className="text-xs text-warm-gray font-[family-name:var(--font-lato)] mt-0.5 line-clamp-1">
                  {service.shortDesc}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-base font-bold text-rose-gold font-[family-name:var(--font-playfair)]">
                ₹{service.price.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-warm-gray font-[family-name:var(--font-lato)]">{service.duration}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-rose-gold-light/10">
            <div className="flex items-center gap-1 text-xs text-warm-gray font-[family-name:var(--font-lato)]">
              <Clock className="w-3 h-3" />
              <span>{service.duration}</span>
            </div>
            <span className="text-xs text-rose-gold font-medium font-[family-name:var(--font-lato)] flex items-center gap-1 group-hover:gap-1.5 transition-all">
              View Details <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openDetail = (service: ServiceDetail) => {
    setSelectedService(service)
    setModalOpen(true)
  }

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
            Discover our comprehensive range of premium beauty services. Click on any service to see full details, pricing, and what&apos;s included.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="hair-care" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1 bg-soft-pink/60 h-auto p-2 mb-8 rounded-full">
              {allCategories.map((cat) => (
                <TabsTrigger
                  key={cat.key}
                  value={cat.key}
                  className="data-[state=active]:bg-rose-gold data-[state=active]:text-white rounded-full px-4 md:px-6 py-2 text-sm font-[family-name:var(--font-lato)] text-charcoal transition-all"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {allCategories.map((cat) => (
              <TabsContent key={cat.key} value={cat.key}>
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {cat.services.map((service, i) => (
                      <ServiceCard
                        key={service.name}
                        service={service}
                        index={i}
                        onClick={() => openDetail(service)}
                      />
                    ))}
                  </div>
                  {cat.quote && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="mt-8 text-center text-warm-gray italic font-[family-name:var(--font-lato)] text-sm md:text-base"
                    >
                      &ldquo;{cat.quote}&rdquo;
                    </motion.p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>

      <ServiceModal
        service={selectedService}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  )
}