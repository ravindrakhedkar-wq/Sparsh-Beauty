'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useInView } from 'framer-motion'
import { Loader2, CalendarDays } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const bookingSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  date: z.string().min(1, 'Please select a date'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  stylist: z.string().min(1, 'Please select a stylist'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z
    .string()
    .min(10, 'Please enter a valid mobile number')
    .max(15, 'Mobile number too long'),
  email: z.string().email('Invalid email').or(z.literal('')),
  notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

const serviceCategories = [
  'Hair Care',
  'Skin Care',
  'Makeup',
  'Nail & Beauty',
  'Bridal Services',
  'Hair Spa & Treatment',
]

const timeSlots = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
]

export default function BookingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: '',
      date: '',
      timeSlot: '',
      stylist: 'Any Available',
      name: '',
      mobile: '',
      email: '',
      notes: '',
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to book appointment')
      toast.success('Appointment booked successfully!', {
        description: `We'll confirm your booking for ${data.date} at ${data.timeSlot}.`,
      })
      reset()
    } catch {
      toast.error('Failed to book appointment', {
        description: 'Please try again or call us directly.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="booking"
      className="section-padding bg-soft-pink"
      ref={ref}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
            Book Your <span className="text-gold-gradient">Appointment</span>
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-warm-gray font-[family-name:var(--font-lato)]">
            Reserve your spot for a premium beauty experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Service */}
                <div className="space-y-2">
                  <Label className="font-[family-name:var(--font-lato)] text-charcoal text-sm">
                    Service Category *
                  </Label>
                  <Select onValueChange={(v) => setValue('service', v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p className="text-rose-gold text-xs">{errors.service.message}</p>
                  )}
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="font-[family-name:var(--font-lato)] text-charcoal text-sm"
                  >
                    Preferred Date *
                  </Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      {...register('date')}
                      className="w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <CalendarDays className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
                  </div>
                  {errors.date && (
                    <p className="text-rose-gold text-xs">{errors.date.message}</p>
                  )}
                </div>

                {/* Time Slot */}
                <div className="space-y-2">
                  <Label className="font-[family-name:var(--font-lato)] text-charcoal text-sm">
                    Time Slot *
                  </Label>
                  <Select onValueChange={(v) => setValue('timeSlot', v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.timeSlot && (
                    <p className="text-rose-gold text-xs">{errors.timeSlot.message}</p>
                  )}
                </div>

                {/* Stylist */}
                <div className="space-y-2">
                  <Label className="font-[family-name:var(--font-lato)] text-charcoal text-sm">
                    Preferred Stylist *
                  </Label>
                  <Select
                    defaultValue="Any Available"
                    onValueChange={(v) => setValue('stylist', v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a stylist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any Available">Any Available</SelectItem>
                      <SelectItem value="Geetanjali">Geetanjali</SelectItem>
                      <SelectItem value="Senior Stylist">Senior Stylist</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.stylist && (
                    <p className="text-rose-gold text-xs">{errors.stylist.message}</p>
                  )}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="font-[family-name:var(--font-lato)] text-charcoal text-sm"
                >
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-rose-gold text-xs">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Mobile */}
                <div className="space-y-2">
                  <Label
                    htmlFor="mobile"
                    className="font-[family-name:var(--font-lato)] text-charcoal text-sm"
                  >
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    {...register('mobile')}
                  />
                  {errors.mobile && (
                    <p className="text-rose-gold text-xs">{errors.mobile.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="font-[family-name:var(--font-lato)] text-charcoal text-sm"
                  >
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-rose-gold text-xs">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label
                  htmlFor="notes"
                  className="font-[family-name:var(--font-lato)] text-charcoal text-sm"
                >
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or preferences..."
                  rows={3}
                  {...register('notes')}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white rounded-full py-6 text-base font-[family-name:var(--font-lato)]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}