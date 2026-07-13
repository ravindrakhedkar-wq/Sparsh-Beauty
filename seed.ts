import { db } from '@/lib/db'

async function seed() {
  // Seed Products
  const products = [
    { name: 'Keratin Smooth Shampoo', description: 'Professional keratin-infused shampoo for silky smooth hair', price: 599, category: 'Hair Care', image: '/images/hair-care.jpg', rating: 4.8, featured: true },
    { name: 'Vitamin C Serum', description: 'Brightening vitamin C serum for radiant skin', price: 899, category: 'Skin Care', image: '/images/skincare.jpg', rating: 4.9, featured: true },
    { name: 'Bridal Makeup Kit', description: 'Complete bridal makeup kit with premium products', price: 4999, category: 'Makeup Kits', image: '/images/bridal-makeup.jpg', rating: 5.0, featured: true },
    { name: 'Hair Color Kit - Rich Brown', description: 'Ammonia-free hair color for natural-looking results', price: 799, category: 'Hair Care', image: '/images/hair-transformation.jpg', rating: 4.5, featured: false },
    { name: 'Rose Gold Hair Accessories Set', description: 'Elegant rose gold hair clips, pins, and bands set', price: 449, category: 'Hair Accessories', image: '/images/nail-care.jpg', rating: 4.7, featured: false },
    { name: 'Hydrating Face Mask Pack', description: 'Deep hydrating facial masks for all skin types', price: 349, category: 'Skin Care', image: '/images/skincare.jpg', rating: 4.6, featured: true },
    { name: 'Professional Makeup Brush Set', description: '15-piece professional makeup brush set with case', price: 1299, category: 'Makeup Kits', image: '/images/makeup-service.jpg', rating: 4.8, featured: false },
    { name: 'Argan Oil Hair Treatment', description: 'Pure argan oil for deep hair nourishment', price: 699, category: 'Hair Care', image: '/images/hair-care.jpg', rating: 4.7, featured: false },
    { name: 'Bridal Beauty Kit - Premium', description: 'Complete pre-bridal and bridal day beauty kit', price: 7999, category: 'Bridal Beauty Kits', image: '/images/bridal-makeup.jpg', rating: 5.0, featured: true },
    { name: 'Salon Professional Hair Spa Cream', description: 'Professional grade hair spa cream used by experts', price: 549, category: 'Professional Salon Products', image: '/images/hair-care.jpg', rating: 4.6, featured: false },
    { name: 'Anti-Acne Face Wash', description: 'Gentle yet effective anti-acne cleansing formula', price: 299, category: 'Skin Care', image: '/images/skincare.jpg', rating: 4.4, featured: false },
    { name: 'HD Makeup Foundation Set', description: 'HD finish foundation set with primer and setting spray', price: 1899, category: 'Makeup Kits', image: '/images/makeup-service.jpg', rating: 4.8, featured: false },
  ]

  for (const p of products) {
    await db.product.create({ data: p })
  }

  // Seed Courses
  const courses = [
    { title: 'Professional Beautician Course', description: 'Comprehensive beautician training covering all aspects of beauty services including hair, skin, and nail care. Industry-recognized certification included.', duration: '6 Months', price: 45000, image: '/images/academy.jpg', featured: true, certificate: true, placement: true },
    { title: 'Hair Styling & Hair Design', description: 'Master the art of hair styling from basic cuts to advanced designs. Learn trending techniques and create stunning looks.', duration: '3 Months', price: 25000, image: '/images/hair-transformation.jpg', featured: true, certificate: true, placement: true },
    { title: 'Advanced Hair Chemical Treatments', description: 'Specialized training in keratin, rebonding, smoothening, botox, and coloring techniques with hands-on practice.', duration: '2 Months', price: 20000, image: '/images/hair-care.jpg', featured: false, certificate: true, placement: false },
    { title: 'Professional Makeup Artist Course', description: 'Complete makeup artistry course covering bridal, party, HD, airbrush, and fashion makeup techniques.', duration: '4 Months', price: 35000, image: '/images/makeup-service.jpg', featured: true, certificate: true, placement: true },
    { title: 'Skin Care & Facial Therapy', description: 'In-depth skin care training including facials, skin analysis, treatment protocols, and product knowledge.', duration: '3 Months', price: 28000, image: '/images/skincare.jpg', featured: false, certificate: true, placement: false },
    { title: 'Salon Management Training', description: 'Learn salon business management, client handling, inventory management, and marketing strategies.', duration: '1 Month', price: 15000, image: '/images/hero-salon.jpg', featured: false, certificate: true, placement: true },
    { title: 'Bridal Makeup Certification', description: 'Specialized bridal makeup certification covering traditional, contemporary, and destination bridal looks.', duration: '2 Months', price: 22000, image: '/images/bridal-makeup.jpg', featured: true, certificate: true, placement: true },
  ]

  for (const c of courses) {
    await db.course.create({ data: c })
  }

  // Seed Testimonials
  const testimonials = [
    { name: 'Priya Sharma', rating: 5, review: 'Amazing bridal makeup experience! Geetanjali ma\'am and her team made my wedding day absolutely perfect. The makeup lasted the entire day and I received so many compliments. Highly recommend Sparsh Beauty!', service: 'Bridal Makeup', image: '/images/bridal-makeup.jpg' },
    { name: 'Ananya Deshmukh', rating: 5, review: 'Best hair spa experience in Pune! My hair feels so soft and healthy after the keratin treatment. The salon ambiance is beautiful and the staff is incredibly professional.', service: 'Hair Keratin Treatment', image: '/images/hair-transformation.jpg' },
    { name: 'Roshni Patel', rating: 5, review: 'I enrolled in the Professional Makeup Artist Course and it was life-changing! The hands-on training and personal attention from Geetanjali ma\'am helped me start my own makeup career.', service: 'Beauty Academy', image: '/images/academy.jpg' },
    { name: 'Meera Kulkarni', rating: 4, review: 'Wonderful facial treatment! My skin has never looked better. The therapist was very knowledgeable and customized the treatment for my skin type. Will definitely visit again.', service: 'Skin Care Treatment', image: '/images/skincare.jpg' },
    { name: 'Sneha Joshi', rating: 5, review: 'The hair smoothening treatment at Sparsh is top-notch. I\'ve tried many salons but this one truly delivers premium results. The products they use are genuine and the results last long.', service: 'Hair Smoothening', image: '/images/hair-transformation.jpg' },
    { name: 'Kavita Nair', rating: 5, review: 'Got my engagement makeup done here and it was perfect! The airbrush technique gave me a flawless finish. The team understood exactly what I wanted. Thank you Sparsh Beauty!', service: 'Engagement Makeup', image: '/images/makeup-service.jpg' },
  ]

  for (const t of testimonials) {
    await db.testimonial.create({ data: t })
  }

  // Seed Blog Posts
  const blogPosts = [
    { title: '10 Essential Hair Care Tips for Monsoon Season', excerpt: 'Keep your hair healthy and beautiful during the rainy season with these expert tips from our stylists.', content: 'Monsoon can wreak havoc on your hair. Here are 10 expert tips to maintain gorgeous hair during the rainy season...', category: 'Hair Care Tips', author: 'Sparsh Beauty Team' },
    { title: 'Complete Bridal Beauty Guide 2024', excerpt: 'Everything you need to know about pre-bridal care and wedding day beauty preparation.', content: 'Your wedding day deserves the best version of you. From pre-bridal skincare routines to the perfect bridal makeup...', category: 'Bridal Beauty Guides', author: 'Mrs. Geetanjali Khedkar' },
    { title: 'Skin Care Routine for Glowing Skin', excerpt: 'Build the perfect skincare routine with our dermatologist-approved tips and product recommendations.', content: 'Beautiful skin requires consistent care. Here is a step-by-step guide to building your ideal skincare routine...', category: 'Skin Care Advice', author: 'Sparsh Beauty Team' },
    { title: 'Makeup Trends to Watch This Year', excerpt: 'Stay ahead of the curve with the latest makeup trends dominating the beauty industry.', content: 'From glass skin to berry lips, discover the makeup trends that are taking the beauty world by storm...', category: 'Makeup Trends', author: 'Sparsh Beauty Team' },
    { title: 'How to Start Your Beauty Career', excerpt: 'A comprehensive guide for aspiring beauty professionals looking to build a successful career.', content: 'The beauty industry offers exciting career opportunities. Here is how you can start your journey as a beauty professional...', category: 'Beauty Career Guidance', author: 'Mrs. Geetanjali Khedkar' },
  ]

  for (const b of blogPosts) {
    await db.blogPost.create({ data: b })
  }

  // Seed Gallery Items
  const galleryItems = [
    { title: 'Hair Transformation - Wavy to Sleek', category: 'Hair Transformations', image: '/images/hair-transformation.jpg' },
    { title: 'Bridal Makeup - Traditional Look', category: 'Bridal Makeup', image: '/images/bridal-makeup.jpg' },
    { title: 'Skin Glow Treatment Result', category: 'Skin Care Results', image: '/images/skincare.jpg' },
    { title: 'Academy Training Session', category: 'Academy Training', image: '/images/academy.jpg' },
    { title: 'Salon Interior - Premium Setup', category: 'Salon Interiors', image: '/images/hero-salon.jpg' },
    { title: 'Professional Hair Styling', category: 'Hair Transformations', image: '/images/hair-care.jpg' },
    { title: 'HD Makeup Application', category: 'Bridal Makeup', image: '/images/makeup-service.jpg' },
    { title: 'Nail Art Design', category: 'Salon Interiors', image: '/images/nail-care.jpg' },
  ]

  for (const g of galleryItems) {
    await db.galleryItem.create({ data: g })
  }

  console.log('✅ Database seeded successfully!')
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0))