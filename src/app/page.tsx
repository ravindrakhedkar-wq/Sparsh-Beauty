'use client'

import Navbar from '@/components/salon/Navbar'
import HeroSection from '@/components/salon/HeroSection'
import ServicesSection from '@/components/salon/ServicesSection'
import BookingSection from '@/components/salon/BookingSection'
import ProductStore from '@/components/salon/ProductStore'
import AcademySection from '@/components/salon/AcademySection'
import FounderSection from '@/components/salon/FounderSection'
import WhyChooseSection from '@/components/salon/WhyChooseSection'
import GallerySection from '@/components/salon/GallerySection'
import TestimonialsSection from '@/components/salon/TestimonialsSection'
import BlogSection from '@/components/salon/BlogSection'
import ContactSection from '@/components/salon/ContactSection'
import Footer from '@/components/salon/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <BookingSection />
        <ProductStore />
        <AcademySection />
        <FounderSection />
        <WhyChooseSection />
        <GallerySection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}