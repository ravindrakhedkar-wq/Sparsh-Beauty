'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Download, GraduationCap } from 'lucide-react'
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

export default function AcademySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    mobile: '',
    email: '',
    course: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses')
        if (res.ok) {
          const data = await res.json()
          setCourses(data)
        }
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  const openEnquiry = (courseTitle: string) => {
    setSelectedCourse(courseTitle)
    setEnquiryForm((prev) => ({ ...prev, course: courseTitle }))
    setEnquiryOpen(true)
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
          name: enquiryForm.name,
          mobile: enquiryForm.mobile,
          email: enquiryForm.email || undefined,
          subject: `Course Enquiry: ${selectedCourse}`,
          message: `I am interested in the ${selectedCourse} course. Please provide more details.`,
        }),
      })
      if (res.ok) {
        toast.success('Enquiry submitted successfully!', {
          description: 'We will get back to you soon.',
        })
        setEnquiryOpen(false)
        setEnquiryForm({ name: '', mobile: '', email: '', course: '' })
      }
    } catch {
      toast.error('Failed to submit enquiry')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="academy"
      className="section-padding relative overflow-hidden"
      ref={ref}
    >
      {/* Background with academy.jpg subtle overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/academy.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-cream/95" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
            Beauty <span className="text-gold-gradient">Academy</span>
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-xl md:text-2xl font-[family-name:var(--font-playfair)] text-charcoal font-medium mb-3">
            Learn. Practice. <span className="text-rose-gold">Grow.</span>
          </p>
          <p className="text-warm-gray font-[family-name:var(--font-lato)] max-w-2xl mx-auto">
            Join our professional beauty training programs and build a successful
            career in the beauty industry with hands-on experience and expert
            guidance.
          </p>
        </motion.div>

        {/* Download Brochure Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <Button
            onClick={() =>
              toast.success('Brochure download started!', {
                description: 'The brochure will be downloaded shortly.',
              })
            }
            variant="outline"
            className="border-gold text-gold hover:bg-gold/10 rounded-full font-[family-name:var(--font-lato)]"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Brochure
          </Button>
        </motion.div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse"
              >
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
            <p className="text-sm mt-1">Contact us for enrollment details</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="overflow-hidden border-rose-gold-light/20 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative w-full h-44 bg-gradient-to-br from-soft-pink to-cream overflow-hidden">
                    {course.image ? (
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <GraduationCap className="w-12 h-12 text-rose-gold-light" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.certificate && (
                        <Badge
                          variant="secondary"
                          className="bg-gold/10 text-gold-dark text-xs font-[family-name:var(--font-lato)]"
                        >
                          Certificate
                        </Badge>
                      )}
                      {course.placement && (
                        <Badge
                          variant="secondary"
                          className="bg-rose-gold/10 text-rose-gold-dark text-xs font-[family-name:var(--font-lato)]"
                        >
                          Placement Assistance
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-charcoal text-lg mb-2">
                      {course.title}
                    </h3>
                    <p className="text-warm-gray text-sm font-[family-name:var(--font-lato)] line-clamp-3 mb-4 flex-1">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-sm text-warm-gray font-[family-name:var(--font-lato)]">
                        <span className="font-medium text-charcoal">
                          {course.duration}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-charcoal font-[family-name:var(--font-playfair)]">
                        ₹{Math.round(course.price).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <Button
                      onClick={() => openEnquiry(course.title)}
                      className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)]"
                    >
                      Enquire Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Enquiry Dialog */}
      <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-playfair)] text-charcoal">
              Course Enquiry
            </DialogTitle>
            <DialogDescription className="font-[family-name:var(--font-lato)] text-warm-gray">
              Interested in: {selectedCourse}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">
                Full Name *
              </Label>
              <Input
                placeholder="Enter your name"
                value={enquiryForm.name}
                onChange={(e) =>
                  setEnquiryForm((p) => ({ ...p, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">
                Mobile Number *
              </Label>
              <Input
                type="tel"
                placeholder="Enter your mobile number"
                value={enquiryForm.mobile}
                onChange={(e) =>
                  setEnquiryForm((p) => ({ ...p, mobile: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="font-[family-name:var(--font-lato)] text-sm text-charcoal">
                Email (Optional)
              </Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={enquiryForm.email}
                onChange={(e) =>
                  setEnquiryForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>
            <Button
              onClick={submitEnquiry}
              disabled={submitting}
              className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full font-[family-name:var(--font-lato)]"
            >
              {submitting ? 'Submitting...' : 'Submit Enquiry'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}