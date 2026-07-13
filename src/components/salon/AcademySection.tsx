'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Download, GraduationCap, Clock, Check, BookOpen, Award, Users, Briefcase, ChevronRight, X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

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
      'Business Basics for Beauticians',
    ],
    benefits: [
      'Industry-recognized certification from Sparsh Academy',
      'Hands-on practice with real clients during training',
      'Complete professional beauty kit worth ₹8,000 included',
      'Personal mentorship from Mrs. Geetanjali Khedkar',
      'Portfolio development with before/after photos',
      '100+ hours of practical training',
      'Placement assistance at leading salons & spas',
      'Lifetime access to alumni network & refresher sessions',
      'Internship opportunity at Sparsh Beauty Salon',
    ],
    whyThisPrice: 'This is a comprehensive 6-month program covering Hair, Skin, Makeup, and Nail services — equivalent to enrolling in 4 separate specialized courses. The ₹45,000 fee includes your professional kit (₹8,000 value), certification, and placement support. Students typically recover their investment within 2–3 months of starting work as a beautician.',
    schedule: 'Monday to Saturday, 10:00 AM – 2:00 PM (4 hours/day)',
    batch: 'New batch every 1st and 15th of the month',
    kit: 'Professional scissors, combs, brushes, makeup palette, skincare products set, practice mannequin head, nail art tools, cape & apron',
  },
  'Hair Styling & Hair Design': {
    modules: [
      'Hair Science Fundamentals',
      'Face Shape & Hair Type Analysis',
      'Precision Cutting Techniques (Layered, Bob, Pixie, Step cut)',
      'Blow Drying & Styling (15+ styles)',
      'Curling & Straightening Techniques',
      'Bridal & Party Hairstyling',
      'Hair Accessories & Updos',
      'Men\'s Grooming & Styling',
      'Trending International Styles',
      'Client Consultation Skills',
    ],
    benefits: [
      'Specialized hair styling certification',
      '50+ hours of hands-on styling practice',
      'Styling tools kit included (worth ₹4,000)',
      'Learn 15+ trending hairstyles',
      'Practice on real models',
      'Photo portfolio of your work',
      'Job placement at hair salons',
      'Freelance opportunity support',
    ],
    whyThisPrice: 'At ₹25,000 for 3 months, this course offers specialized training at just ₹280/hour. The course pays for itself within the first month of working as a hairstylist, where you can earn ₹15,000–25,000/month. The included tools kit alone is worth ₹4,000.',
    schedule: 'Monday to Friday, 11:00 AM – 1:00 PM (2 hours/day)',
    batch: 'New batch every 1st of the month',
    kit: 'Professional scissors, thinning shears, combs set, sectioning clips, blow dryer, curling iron, straightener, styling products set',
  },
  'Advanced Hair Chemical Treatments': {
    modules: [
      'Chemistry of Hair Bonds',
      'Keratin Treatment (Brazilian & Japanese)',
      'Hair Rebonding Techniques',
      'Smoothening & Relaxing Treatments',
      'Hair Botox & Fillers',
      'Hair Coloring Theory & Practice',
      'Highlighting & Balayage Techniques',
      'Color Correction',
      'Damage Prevention & Aftercare',
      'Product Knowledge (Premium Brands)',
      'Safety Protocols & Patch Testing',
    ],
    benefits: [
      'Advanced certification in chemical treatments',
      'Practice with premium salon products (L\'Oréal, Schwarzkopf)',
      'Certificate valid across India',
      'Product supplier connections for your own salon',
      'Hands-on with 20+ real clients',
      'Safety & allergy management training',
      'Income boost: chemical treatment specialists earn 30–40% more',
    ],
    whyThisPrice: 'Chemical treatment specialists command premium pricing in salons. This 2-month course at ₹20,000 gives you skills that can add ₹5,000–10,000/month to your income. You\'ll work with the same premium products used in top salons.',
    schedule: 'Monday to Friday, 2:00 PM – 4:00 PM (2 hours/day)',
    batch: 'New batch every 1st of the month',
    kit: 'Application brushes, gloves, bowls, sectioning tools, product samples kit',
  },
  'Professional Makeup Artist Course': {
    modules: [
      'Makeup Theory & Skin Science',
      'Face Analysis & Color Theory',
      'Bridal Makeup (Traditional, Contemporary, South Indian)',
      'Engagement & Mehndi Night Makeup',
      'Party & Event Makeup',
      'HD & Airbrush Makeup Techniques',
      'Fashion & Editorial Makeup',
      'Contouring & Highlighting Mastery',
      'Eye Makeup Techniques (Smokey, Cut Crease, Winged)',
      'Lip Art & Color Matching',
      'Portfolio Building & Photography',
      'Client Management & Business Skills',
    ],
    benefits: [
      'Professional Makeup Artist certification',
      'Airbrush makeup machine included (worth ₹12,000)',
      'Complete makeup kit with 30+ products (worth ₹8,000)',
      '50+ hours of hands-on practice',
      'Portfolio photoshoot included',
      'Bridal trial experience with real bride',
      'Freelance bridal artist earning potential: ₹3,000–15,000/event',
      'Industry connections for wedding bookings',
    ],
    whyThisPrice: 'The ₹35,000 fee includes a professional airbrush machine (₹12,000) and a complete makeup kit (₹8,000) — that\'s ₹20,000 in equipment alone. Professional bridal makeup artists in Pune earn ₹5,000–15,000 per booking. Just 3–5 bridal bookings recover your entire course investment.',
    schedule: 'Monday to Saturday, 10:00 AM – 1:00 PM (3 hours/day)',
    batch: 'New batch every 1st and 15th of the month',
    kit: 'Airbrush machine, foundation palette (12 shades), concealer kit, brush set (20 brushes), eye shadow palette, lipstick set, contour kit, setting spray, sanitizer, organizer case',
  },
  'Skin Care & Facial Therapy': {
    modules: [
      'Skin Biology & Skin Types',
      'Skin Analysis & Consultation',
      'Cleansing & Exfoliation Techniques',
      'Professional Facials (10+ types)',
      'Anti-Aging & Rejuvenation Treatments',
      'Acne & Pigmentation Management',
      'De-tan & Brightening Treatments',
      'Facial Massage Techniques',
      'Mask Preparation & Application',
      'Product Knowledge (Dermatology-grade)',
      'Client Aftercare Guidance',
    ],
    benefits: [
      'Skin care specialist certification',
      'Practice with professional-grade products',
      'Skin care product kit included (worth ₹3,000)',
      'Learn 10+ facial types',
      'Understanding of skin conditions & treatments',
      'Employment at skin clinics & dermatology centers',
      'Can add facial services to your existing salon work',
    ],
    whyThisPrice: 'At ₹28,000 for 3 months, you get specialized skin care training with professional products. Skin care specialists earn ₹15,000–30,000/month at clinics. The product kit alone (₹3,000 value) plus the certification makes this excellent value.',
    schedule: 'Monday to Friday, 2:00 PM – 4:00 PM (2 hours/day)',
    batch: 'New batch every 1st of the month',
    kit: 'Facial steamer, cleansing brush set, mask bowls, spatulas, skin analysis guide, product samples set, towels, headband',
  },
  'Salon Management Training': {
    modules: [
      'Salon Business Fundamentals',
      'Client Relationship Management',
      'Staff Hiring, Training & Management',
      'Inventory & Product Management',
      'Financial Management & Pricing Strategy',
      'Marketing & Brand Building',
      'Digital Marketing for Salons (Instagram, Facebook, Google)',
      'Customer Experience Design',
      'Hygiene & Compliance Standards',
      'Technology & Booking Systems',
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

  const handleDownloadBrochure = () => {
    const link = document.createElement('a')
    link.href = '/Sparsh-Academy-Brochure.pdf'
    link.download = 'Sparsh-Beauty-Academy-Brochure.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Brochure download started!')
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

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }} className="flex justify-center mb-8">
          <Button onClick={handleDownloadBrochure} variant="outline" className="border-gold text-gold hover:bg-gold/10 rounded-full font-[family-name:var(--font-lato)]">
            <Download className="w-4 h-4 mr-2" />
            Download Brochure
          </Button>
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
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}>
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

      {/* Course Detail Dialog */}
      <AnimatePresence>
        {selectedCourse && extra && (
          <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-[family-name:var(--font-playfair)] text-charcoal text-xl pr-8">
                  {selectedCourse.title}
                </DialogTitle>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge className="bg-rose-gold/10 text-rose-gold-dark text-xs">{selectedCourse.duration}</Badge>
                  <Badge className="bg-gold/10 text-gold-dark text-xs">{selectedCourse.price > 0 ? `₹${Math.round(selectedCourse.price).toLocaleString('en-IN')}` : 'Contact for Price'}</Badge>
                  {selectedCourse.certificate && <Badge className="bg-green-50 text-green-700 text-xs">Certified</Badge>}
                  {selectedCourse.placement && <Badge className="bg-blue-50 text-blue-700 text-xs">Placement Support</Badge>}
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-2">
                {/* Schedule & Batch */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                      <Briefcase className="w-3.5 h-3.5 text-rose-gold" />
                      <span className="text-xs font-medium text-warm-gray font-[family-name:var(--font-lato)]">Kit Included</span>
                    </div>
                    <p className="text-sm text-charcoal font-[family-name:var(--font-lato)]">Yes, see below</p>
                  </div>
                </div>

                {/* Curriculum */}
                <div>
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
                <div>
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
                <div className="bg-soft-pink/50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-2">Professional Kit Included</h4>
                  <p className="text-sm text-warm-gray font-[family-name:var(--font-lato)]">{extra.kit}</p>
                </div>

                {/* Why This Price */}
                <div className="bg-cream rounded-xl p-4">
                  <h4 className="text-sm font-semibold font-[family-name:var(--font-playfair)] text-charcoal mb-2">Why This Investment Is Worth It</h4>
                  <p className="text-sm text-warm-gray font-[family-name:var(--font-lato)] leading-relaxed">{extra.whyThisPrice}</p>
                </div>

                {/* CTAs */}
                <div className="flex gap-3">
                  <Button onClick={() => { setDetailOpen(false); openEnquiry(selectedCourse.title) }} className="flex-1 bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)]">
                    Enquire Now
                  </Button>
                  <Button onClick={handleDownloadBrochure} variant="outline" className="border-gold text-gold hover:bg-gold/10 rounded-full font-[family-name:var(--font-lato)]">
                    <Download className="w-4 h-4 mr-1.5" /> Brochure
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Enquiry Dialog */}
      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-playfair)] text-charcoal">Course Enquiry</DialogTitle>
            <DialogDescription className="font-[family-name:var(--font-lato)] text-warm-gray">Interested in: {selectedCourse?.title}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">Full Name *</Label>
              <Input placeholder="Enter your name" value={enquiryForm.name} onChange={e => setEnquiryForm(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">Mobile Number *</Label>
              <Input type="tel" placeholder="Enter your mobile number" value={enquiryForm.mobile} onChange={e => setEnquiryForm(p => ({ ...p, mobile: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">Email (Optional)</Label>
              <Input type="email" placeholder="Enter your email" value={enquiryForm.email} onChange={e => setEnquiryForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <Button onClick={submitEnquiry} disabled={submitting} className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)]">
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}