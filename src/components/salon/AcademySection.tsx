'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { GraduationCap, Clock, Check, BookOpen, Award, Users, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

interface Course {
  id: string
  title: string
  description: string
  duration: string
  price: number
  image: string | null
  certificate: boolean
  placement: boolean
}

interface CourseExtra {
  modules: string[]
  benefits: string[]
  whyThisPrice: string
  schedule: string
  batch: string
  kit: string
}

const courseExtras: Record<string, CourseExtra> = {
  'Professional Beautician Course': {
    modules: [
      'Hair Science & Hair Biology',
      'Hair Cutting & Styling Techniques (15+ styles)',
      'Hair Chemical Treatments (Keratin, Rebonding, Smoothening)',
      'Skin Science & Skin Analysis',
      'Professional Facials (8+ types)',
      'Makeup Artistry (Bridal, Party, HD, Airbrush)',
      'Nail Care & Nail Art',
      'Waxing, Threading & Depilation',
      'Salon Hygiene & Safety Standards',
      'Client Communication & Consultation',
      'Product Knowledge & Retail Sales',
      'Practical Training on Live Models',
    ],
    benefits: [
      'Comprehensive beautician certification recognized across India',
      'Hands-on practice with 50+ real clients during training',
      'Professional toolkit worth ₹8,000 included in the course fee',
      'Portfolio photoshoot with professional photographer',
      'Job placement assistance at leading salons in Pune & Mumbai',
      'Lifetime access to Sparsh Beauty alumni network',
      'Opportunity to intern at Sparsh Beauty salon',
      'Discount on advanced courses after completion',
    ],
    whyThisPrice: 'At ₹45,000 for 6 months, this works out to just ₹750 per session. A professional beautician in Pune earns ₹15,000–₹40,000/month. Most students recover their entire course fee within 2–3 months of starting work. The included toolkit (₹8,000 value), certification, and placement support make this one of the most value-for-money courses in Pune.',
    schedule: 'Monday to Friday, 10:00 AM – 1:00 PM (3 hours/day)',
    batch: 'New batch every 1st and 15th of the month',
    kit: 'Professional hair cutting kit, hair styling tools (straightener, curler, crimper), makeup brush set (20 brushes), facial kit (cleanser, scrub, mask, cream), nail art kit, waxing pot & strips, practice head with hair, product samples, and carrying case',
  },
  'Hair Styling & Hair Design': {
    modules: [
      'Hair Science Fundamentals',
      'Face Shape & Hair Analysis',
      'Sectioning & Parting Techniques',
      'Classic Haircuts (10+ styles)',
      'Modern & Trending Cuts',
      'Men\'s Grooming Cuts',
      'Blow Drying Techniques',
      'Curling & Straightening',
      'Updos & Bridal Hairstyles',
      'Hair Accessories & Styling Products',
    ],
    benefits: [
      'Specialized Hair Styling certification',
      'Hands-on with 30+ real clients',
      'Professional hair styling toolkit included',
      'Portfolio of your best work',
      'Placement assistance at top salons',
      'Freelance bridal hairstyling opportunities',
      'Average earning: ₹500–₹2,000 per styling',
    ],
    whyThisPrice: 'At ₹25,000 for 3 months, this is a specialized course that focuses exclusively on hair — the highest-demand salon service. Hair stylists in Pune earn ₹18,000–₹45,000/month. The included professional tools (worth ₹5,000) plus the skills you gain mean you can start earning within weeks of completing the course.',
    schedule: 'Monday to Friday, 11:00 AM – 1:30 PM (2.5 hours/day)',
    batch: 'New batch every 1st of the month',
    kit: 'Professional scissors (2 pairs), thinning shears, sectioning clips, combs (5 types), hair straightener, curling iron, crimper, blow dryer, styling products set, spray bottle, practice head, and toolkit bag',
  },
  'Advanced Hair Chemical Treatments': {
    modules: [
      'Chemistry of Hair & Chemical Treatments',
      'Hair Porosity & Elasticity Testing',
      'Keratin Treatment (Brazilian & Japanese)',
      'Hair Rebonding (Full & Partial)',
      'Hair Smoothening Techniques',
      'Hair Botox Treatment',
      'Permanent Hair Straightening',
      'Chemical Safety & Allergy Management',
      'Post-Treatment Care Protocols',
      'Troubleshooting & Correction Techniques',
    ],
    benefits: [
      'Advanced chemical treatment certification',
      'Practice on 15+ live models with different hair types',
      'Premium product training (L\'Oréal, Schwarzkopf, etc.)',
      'Chemical safety & emergency handling certificate',
      'High-demand skill — keratin/rebonding services charge ₹3,000–₹8,000 each',
      'Product discount partnerships for your own salon',
    ],
    whyThisPrice: 'Chemical treatments are the highest-revenue services in any salon. A single keratin treatment earns ₹3,000–₹8,000. At ₹20,000 for this 2-month course, just 3–5 client treatments cover your entire investment. This is a profit-generating skill from day one.',
    schedule: 'Monday to Friday, 2:00 PM – 4:00 PM (2 hours/day)',
    batch: 'New batch every 1st of the month',
    kit: 'Keratin treatment kit (trial size), rebonding cream & neutralizer set, smoothening kit, hair botox set, digital hair straightener, application brushes, gloves & protective gear, pH testing strips, and product guide',
  },
  'Professional Makeup Artist Course': {
    modules: [
      'Makeup Fundamentals & Product Knowledge',
      'Skin Analysis & Prep',
      'Base Application (Foundation, Concealer, Primer)',
      'Contouring, Highlighting & Blush Techniques',
      'Eye Makeup (Smokey, Cut-crease, Natural)',
      'Bridal Makeup (Traditional & Contemporary)',
      'Party & Event Makeup',
      'HD & Airbrush Makeup Techniques',
      'Lip Art & Color Theory',
      'Freelance Makeup Business Setup',
    ],
    benefits: [
      'Professional Makeup Artist certification',
      'Hands-on with 25+ real clients/models',
      'Complete makeup kit worth ₹12,000 included',
      'Portfolio photoshoot with professional photographer',
      'Freelance bridal booking leads from our network',
      'Average bridal makeup earning: ₹15,000–₹50,000 per booking',
      'Product partnerships for future purchases at discount',
    ],
    whyThisPrice: 'At ₹35,000 for 4 months, this is the most career-impactful course. Bridal makeup artists in Pune charge ₹15,000–₹50,000 per booking. Just one bridal booking can cover your entire course fee. The included kit (₹12,000 value) plus portfolio makes you industry-ready immediately.',
    schedule: 'Monday to Friday, 11:00 AM – 2:00 PM (3 hours/day)',
    batch: 'New batch every 1st of the month',
    kit: 'Foundation palette (12 shades), concealer kit, contour & highlight palette, eye shadow palettes (3 sets), lipstick set (15 shades), brush set (25 brushes), false lashes collection, primer, setting spray, makeup sponges, and professional case',
  },
  'Skin Care & Facial Therapy': {
    modules: [
      'Skin Science & Biology',
      'Skin Types & Conditions Analysis',
      'Professional Facial Techniques (8+ types)',
      'Gold, Diamond & Pearl Facials',
      'Anti-Aging & Rejuvenation Treatments',
      'Acne Care & Scar Reduction',
      'Pigmentation & Tan Removal',
      'Product Knowledge & Ingredient Analysis',
      'Client Consultation & Skin Analysis',
      'Building a Skincare Business',
    ],
    benefits: [
      'Skin Care Specialist certification',
      'Practice on 20+ real clients',
      'Professional facial kit included',
      'Dermatologist-recommended treatment protocols',
      'Product knowledge for retail sales',
      'Average facial service earning: ₹500–₹3,000',
      'Can start own facial studio or work at premium salons',
    ],
    whyThisPrice: 'Skin care is a recurring service — clients visit every 2–4 weeks. At ₹28,000 for 3 months, you learn to offer services that generate ₹500–₹3,000 per session with returning clients. The facial kit (₹6,000 value) plus certification enables you to start earning immediately.',
    schedule: 'Monday to Friday, 10:00 AM – 12:30 PM (2.5 hours/day)',
    batch: 'New batch every 15th of the month',
    kit: 'Facial cleansing set, scrub (3 types), masks (gold, diamond, pearl, anti-aging), serum set (vitamin C, hyaluronic, niacinamide), face massager, steamer, brushes & sponges, and skincare product samples',
  },
  'Salon Management Training': {
    modules: [
      'Salon Business Fundamentals',
      'Client Relationship Management',
      'Staff Recruitment & Training',
      'Inventory & Product Management',
      'Pricing Strategy & Profit Margins',
      'Digital Marketing for Salons',
      'Social Media & Instagram Growth',
      'Financial Planning & Budgeting',
      'Customer Experience Design',
      'Scaling Your Salon Business',
    ],
    benefits: [
      'Salon management certification',
      'Real-world business plan creation for your salon',
      'Marketing templates & social media content plan',
      'Vendor connection list for products & equipment',
      'Pricing strategy spreadsheet',
      'Staff management templates',
      'One-on-one business mentoring session',
    ],
    whyThisPrice: 'This ₹15,000 course is an investment in your business. A well-managed salon can earn 2–3x more than a poorly managed one. The templates, strategies, and vendor connections alone can save you lakhs in trial-and-error costs when starting your salon.',
    schedule: 'Saturday & Sunday, 10:00 AM – 2:00 PM (4 hours/day, 4 weekends)',
    batch: 'New batch every month (weekend batches)',
    kit: 'Business plan templates, pricing calculator, staff management guide, marketing content calendar, vendor contact list',
  },
  'Bridal Makeup Certification': {
    modules: [
      'Bridal Beauty Industry Overview',
      'Bridal Consultation & Look Planning',
      'Traditional Bridal Makeup (Hindu, Muslim, Christian)',
      'Contemporary & Modern Bridal Looks',
      'South Indian Bridal Makeup',
      'Pre-Bridal Skin Care Routine',
      'Engagement & Mehndi Looks',
      'Reception & Reception-Change Looks',
      'Hairstyling for Brides',
      'Saree Draping Basics',
      'Photography Makeup vs Real-Life Makeup',
      'Bridal Business & Pricing',
    ],
    benefits: [
      'Specialized Bridal Makeup certification',
      'Hands-on with 5+ real brides during training',
      'Complete bridal makeup kit (worth ₹10,000)',
      'Portfolio photoshoot with professional photographer',
      'Bridal booking leads from Sparsh Beauty network',
      'Pricing guide for bridal packages',
      'Average bridal booking in Pune: ₹15,000–50,000',
      'Referral network for ongoing bookings',
    ],
    whyThisPrice: 'Bridal makeup is the highest-earning segment in beauty. At ₹22,000 for 2 months, just one bridal booking (₹15,000–50,000) can cover your entire course fee. The bridal kit included (₹10,000 value) plus the portfolio and industry connections make this the best ROI course we offer.',
    schedule: 'Monday to Friday, 11:00 AM – 2:00 PM (3 hours/day)',
    batch: 'New batch every 1st of the month',
    kit: 'Airbrush machine, premium foundation palette (15 shades), concealer kit, contour palette, eye shadow bridal set, lipstick set (12 shades), brush set (25 brushes), false lashes collection, setting spray, sanitizer, bridal organizer case',
  },
}

/* ─── Custom Modal: Course Detail ─── */
function CourseDetailModal({
  course,
  extra,
  open,
  onClose,
  onEnquire,
}: {
  course: Course | null
  extra: CourseExtra | null
  open: boolean
  onClose: () => void
  onEnquire: () => void
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open || !course || !extra) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-soft-pink/80 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-soft-pink transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {/* Header */}
          <h3 className="font-[family-name:var(--font-playfair)] text-charcoal text-xl font-bold pr-8 mb-2">
            {course.title}
          </h3>
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge className="bg-rose-gold/10 text-rose-gold-dark text-xs">{course.duration}</Badge>
            <Badge className="bg-gold/10 text-gold-dark text-xs">{course.price > 0 ? `₹${Math.round(course.price).toLocaleString('en-IN')}` : 'Contact for Price'}</Badge>
            {course.certificate && <Badge className="bg-green-50 text-green-700 text-xs">Certified</Badge>}
            {course.placement && <Badge className="bg-blue-50 text-blue-700 text-xs">Placement Support</Badge>}
          </div>

          {/* Schedule & Batch */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-cream rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-rose-gold" />
                <span className="text-xs font-medium text-warm-gray font-[family-name:var(--font-lato)]">Schedule</span>
              </div>
              <p className="text-sm text-charcoal font-[family-name:var(--font-lato)]">{extra.schedule}</p>
            </div>
            <div className="bg-cream rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-rose-gold" />
                <span className="text-xs font-medium text-warm-gray font-[family-name:var(--font-lato)]">Batch</span>
              </div>
              <p className="text-sm text-charcoal font-[family-name:var(--font-lato)]">{extra.batch}</p>
            </div>
            <div className="bg-cream rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-rose-gold" />
                <span className="text-xs font-medium text-warm-gray font-[family-name:var(--font-lato)]">Modules</span>
              </div>
              <p className="text-sm text-charcoal font-[family-name:var(--font-lato)]">{extra.modules.length} modules</p>
            </div>
          </div>

          {/* Curriculum */}
          <div className="mb-6">
            <h4 className="text-base font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold" /> What You&apos;ll Learn
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {extra.modules.map((m, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm font-[family-name:var(--font-lato)] text-charcoal/80">
                  <div className="w-5 h-5 rounded-full bg-rose-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs text-rose-gold font-bold">{idx + 1}</div>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="text-base font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-gold" /> What You Get
            </h4>
            <div className="space-y-2">
              {extra.benefits.map((b) => (
                <div key={b} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-[family-name:var(--font-lato)] text-charcoal/80">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kit */}
          <div className="bg-soft-pink/50 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-2">Professional Kit Included</h4>
            <p className="text-sm text-warm-gray font-[family-name:var(--font-lato)]">{extra.kit}</p>
          </div>

          {/* Why This Price */}
          <div className="bg-cream rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-2">Why This Investment Is Worth It</h4>
            <p className="text-sm text-warm-gray font-[family-name:var(--font-lato)] leading-relaxed">{extra.whyThisPrice}</p>
          </div>

          {/* CTA */}
          <Button onClick={() => { onClose(); setTimeout(onEnquire, 100) }} className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)] py-5 text-base">
            Enquire Now
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─── Custom Modal: Enquiry Form ─── */
function EnquiryModal({
  open,
  onClose,
  courseTitle,
  form,
  setForm,
  submitting,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  courseTitle: string
  form: { name: string; mobile: string; email: string; course: string }
  setForm: React.Dispatch<React.SetStateAction<{ name: string; mobile: string; email: string; course: string }>>
  submitting: boolean
  onSubmit: () => void
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-soft-pink/80 flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-soft-pink transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          <h3 className="font-[family-name:var(--font-playfair)] text-charcoal text-lg font-bold pr-8 mb-1">
            Course Enquiry
          </h3>
          <p className="text-sm text-warm-gray font-[family-name:var(--font-lato)] mb-5">
            Interested in: <span className="text-rose-gold font-semibold">{courseTitle}</span>
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">Full Name *</Label>
              <Input placeholder="Enter your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">Mobile Number *</Label>
              <Input type="tel" placeholder="Enter your mobile number" value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">Email (Optional)</Label>
              <Input type="email" placeholder="Enter your email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <Button onClick={onSubmit} disabled={submitting} className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)]">
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AcademySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [enquiryForm, setEnquiryForm] = useState({ name: '', mobile: '', email: '', course: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses')
        if (res.ok) setCourses(await res.json())
      } catch { /* silent */ }
      finally { setLoading(false) }
    }
    fetchCourses()
  }, [])

  const openEnquiry = (courseTitle: string) => {
    setSelectedCourse(courses.find(c => c.title === courseTitle) || null)
    setEnquiryForm(prev => ({ ...prev, course: courseTitle }))
    setEnquiryOpen(true)
  }

  const openDetail = (course: Course) => {
    setSelectedCourse(course)
    setDetailOpen(true)
  }

  const submitEnquiry = async () => {
    if (!enquiryForm.name || !enquiryForm.mobile) {
      toast.error('Please fill in your name and mobile number')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: enquiryForm.name, mobile: enquiryForm.mobile,
          email: enquiryForm.email || undefined,
          subject: `Course Enquiry: ${selectedCourse?.title}`,
          message: `I am interested in the ${selectedCourse?.title} course. Please provide more details.`,
        }),
      })
      if (res.ok) {
        toast.success('Enquiry submitted!', { description: 'We will get back to you soon.' })
        setEnquiryOpen(false)
        setEnquiryForm({ name: '', mobile: '', email: '', course: '' })
      }
    } catch { toast.error('Failed to submit enquiry') }
    finally { setSubmitting(false) }
  }

  const extra = selectedCourse ? courseExtras[selectedCourse.title] : null

  return (
    <section id="academy" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <Image src="/images/academy.jpg" alt="" fill sizes="100vw" className="object-cover opacity-5" />
        <div className="absolute inset-0 bg-cream/95" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
            Beauty <span className="text-gold-gradient">Academy</span>
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-xl md:text-2xl font-[family-name:var(--font-playfair)] text-charcoal font-medium mb-3">
            Learn. Practice. <span className="text-rose-gold">Grow.</span>
          </p>
          <p className="text-warm-gray font-[family-name:var(--font-lato)] max-w-2xl mx-auto">
            Join our professional beauty training programs and build a successful career in the beauty industry with hands-on experience and expert guidance.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="w-full h-44 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                  <div className="h-8 bg-gray-200 rounded w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-warm-gray font-[family-name:var(--font-lato)]">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg">Courses coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ y: -6 }}>
                <Card className="overflow-hidden border-rose-gold-light/20 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative w-full h-44 bg-gradient-to-br from-soft-pink to-cream overflow-hidden">
                    {course.image ? (
                      <Image src={course.image} alt={course.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><GraduationCap className="w-12 h-12 text-rose-gold-light" /></div>
                    )}
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.certificate && <Badge variant="secondary" className="bg-gold/10 text-gold-dark text-xs font-[family-name:var(--font-lato)]">Certificate</Badge>}
                      {course.placement && <Badge variant="secondary" className="bg-rose-gold/10 text-rose-gold-dark text-xs font-[family-name:var(--font-lato)]">Placement Assistance</Badge>}
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-charcoal text-lg mb-2">{course.title}</h3>
                    <p className="text-warm-gray text-sm font-[family-name:var(--font-lato)] line-clamp-3 mb-4 flex-1">{course.description}</p>

                    {/* Quick info */}
                    <div className="space-y-2 mb-4">
                      {courseExtras[course.title] && (
                        <>
                          <div className="flex items-center gap-2 text-xs text-warm-gray font-[family-name:var(--font-lato)]">
                            <BookOpen className="w-3.5 h-3.5 text-rose-gold flex-shrink-0" />
                            <span>{courseExtras[course.title].modules.length} modules</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-warm-gray font-[family-name:var(--font-lato)]">
                            <Clock className="w-3.5 h-3.5 text-rose-gold flex-shrink-0" />
                            <span>{courseExtras[course.title].schedule}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-warm-gray font-[family-name:var(--font-lato)] font-medium">{course.duration}</span>
                      <span className="text-lg font-bold text-charcoal font-[family-name:var(--font-playfair)]">₹{Math.round(course.price).toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => openDetail(course)} variant="outline" className="flex-1 border-rose-gold-light text-rose-gold hover:bg-rose-gold/5 rounded-full text-sm font-[family-name:var(--font-lato)]">
                        View Details
                      </Button>
                      <Button onClick={() => openEnquiry(course.title)} className="flex-1 bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full text-sm font-[family-name:var(--font-lato)]">
                        Enquire Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        extra={selectedCourse ? courseExtras[selectedCourse.title] : null}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onEnquire={() => openEnquiry(selectedCourse?.title || '')}
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        courseTitle={enquiryForm.course}
        form={enquiryForm}
        setForm={setEnquiryForm}
        submitting={submitting}
        onSubmit={submitEnquiry}
      />
    </section>
  )
}