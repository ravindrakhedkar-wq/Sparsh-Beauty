import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient
  fallbackDb?: ReturnType<typeof createFallbackDb>
}

function createFallbackDb() {
  const fallbackData = {
    product: [
      { id: 'fallback-product-1', name: 'Keratin Smooth Shampoo', description: 'Professional keratin-infused shampoo for silky smooth hair', price: 599, category: 'Hair Care', image: '/images/hair-care.jpg', rating: 4.8, inStock: true, featured: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-2', name: 'Vitamin C Serum', description: 'Brightening vitamin C serum for radiant skin', price: 899, category: 'Skin Care', image: '/images/skincare.jpg', rating: 4.9, inStock: true, featured: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-3', name: 'Bridal Makeup Kit', description: 'Complete bridal makeup kit with premium products', price: 4999, category: 'Makeup Kits', image: '/images/bridal-makeup.jpg', rating: 5.0, inStock: true, featured: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-4', name: 'Hair Color Kit - Rich Brown', description: 'Ammonia-free hair color for natural-looking results', price: 799, category: 'Hair Care', image: '/images/hair-transformation.jpg', rating: 4.5, inStock: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-5', name: 'Rose Gold Hair Accessories Set', description: 'Elegant rose gold hair clips, pins, and bands set', price: 449, category: 'Hair Accessories', image: '/images/nail-care.jpg', rating: 4.7, inStock: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-6', name: 'Hydrating Face Mask Pack', description: 'Deep hydrating facial masks for all skin types', price: 349, category: 'Skin Care', image: '/images/skincare.jpg', rating: 4.6, inStock: true, featured: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-7', name: 'Professional Makeup Brush Set', description: '15-piece professional makeup brush set with case', price: 1299, category: 'Makeup Kits', image: '/images/makeup-service.jpg', rating: 4.8, inStock: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-8', name: 'Argan Oil Hair Treatment', description: 'Pure argan oil for deep hair nourishment', price: 699, category: 'Hair Care', image: '/images/hair-care.jpg', rating: 4.7, inStock: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-9', name: 'Bridal Beauty Kit - Premium', description: 'Complete pre-bridal and bridal day beauty kit', price: 7999, category: 'Bridal Beauty Kits', image: '/images/bridal-makeup.jpg', rating: 5.0, inStock: true, featured: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-10', name: 'Salon Professional Hair Spa Cream', description: 'Professional grade hair spa cream used by experts', price: 549, category: 'Professional Salon Products', image: '/images/hair-care.jpg', rating: 4.6, inStock: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-11', name: 'Anti-Acne Face Wash', description: 'Gentle yet effective anti-acne cleansing formula', price: 299, category: 'Skin Care', image: '/images/skincare.jpg', rating: 4.4, inStock: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-product-12', name: 'HD Makeup Foundation Set', description: 'HD finish foundation set with primer and setting spray', price: 1899, category: 'Makeup Kits', image: '/images/makeup-service.jpg', rating: 4.8, inStock: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
    ],
    course: [
      { id: 'fallback-course-1', title: 'Professional Beautician Course', description: 'Comprehensive beautician training covering all aspects of beauty services including hair, skin, and nail care. Industry-recognized certification included.', duration: '6 Months', price: 45000, image: '/images/academy.jpg', featured: true, certificate: true, placement: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-course-2', title: 'Hair Styling & Hair Design', description: 'Master the art of hair styling from basic cuts to advanced designs. Learn trending techniques and create stunning looks.', duration: '3 Months', price: 25000, image: '/images/hair-transformation.jpg', featured: true, certificate: true, placement: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-course-3', title: 'Advanced Hair Chemical Treatments', description: 'Specialized training in keratin, rebonding, smoothening, botox, and coloring techniques with hands-on practice.', duration: '2 Months', price: 20000, image: '/images/hair-care.jpg', featured: false, certificate: true, placement: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-course-4', title: 'Professional Makeup Artist Course', description: 'Complete makeup artistry course covering bridal, party, HD, airbrush, and makeup techniques.', duration: '4 Months', price: 35000, image: '/images/makeup-service.jpg', featured: true, certificate: true, placement: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-course-5', title: 'Skin Care & Facial Therapy', description: 'In-depth skin care training including facials, skin analysis, treatment protocols, and product knowledge.', duration: '3 Months', price: 28000, image: '/images/skincare.jpg', featured: false, certificate: true, placement: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-course-6', title: 'Salon Management Training', description: 'Learn salon business management, client handling, inventory management, and marketing strategies.', duration: '1 Month', price: 15000, image: '/images/hero-salon.jpg', featured: false, certificate: true, placement: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-course-7', title: 'Bridal Makeup Certification', description: 'Specialized bridal makeup certification covering traditional, contemporary, and destination bridal looks.', duration: '2 Months', price: 22000, image: '/images/bridal-makeup.jpg', featured: true, certificate: true, placement: true, createdAt: new Date(), updatedAt: new Date() },
    ],
    testimonial: [
      { id: 'fallback-testimonial-1', name: 'Priya Sharma', rating: 5, review: "Amazing bridal makeup experience! Geetanjali ma'am and her team made my wedding day absolutely perfect. The makeup lasted the entire day and I received so many compliments. Highly recommend Sparsh Beauty!", service: 'Bridal Makeup', image: '/images/bridal-makeup.jpg', createdAt: new Date() },
      { id: 'fallback-testimonial-2', name: 'Ananya Deshmukh', rating: 5, review: 'Best hair spa experience in Pune! My hair feels so soft and healthy after the keratin treatment. The salon ambiance is beautiful and the staff is incredibly professional.', service: 'Hair Keratin Treatment', image: '/images/hair-transformation.jpg', createdAt: new Date() },
      { id: 'fallback-testimonial-3', name: 'Roshni Patel', rating: 5, review: "I enrolled in the Professional Makeup Artist Course and it was life-changing! The hands-on training and personal attention from Geetanjali ma'am helped me start my own makeup career.", service: 'Beauty Academy', image: '/images/academy.jpg', createdAt: new Date() },
      { id: 'fallback-testimonial-4', name: 'Meera Kulkarni', rating: 4, review: 'Wonderful facial treatment! My skin has never looked better. The therapist was very knowledgeable and customized the treatment for my skin type. Will definitely visit again.', service: 'Skin Care Treatment', image: '/images/skincare.jpg', createdAt: new Date() },
      { id: 'fallback-testimonial-5', name: 'Sneha Joshi', rating: 5, review: "The hair smoothening treatment at Sparsh is top-notch. I've tried many salons but this one truly delivers premium results. The products they use are genuine and the results last long.", service: 'Hair Smoothening', image: '/images/hair-transformation.jpg', createdAt: new Date() },
      { id: 'fallback-testimonial-6', name: 'Kavita Nair', rating: 5, review: 'Got my engagement makeup done here and it was perfect! The airbrush technique gave me a flawless finish. The team understood exactly what I wanted. Thank you Sparsh Beauty!', service: 'Engagement Makeup', image: '/images/makeup-service.jpg', createdAt: new Date() },
    ],
    blogPost: [
      { id: 'fallback-blog-1', title: '10 Essential Hair Care Tips for Monsoon Season', excerpt: 'Keep your hair healthy and beautiful during the rainy season with these expert tips from our stylists.', content: 'Monsoon can wreak havoc on your hair. Here are 10 expert tips to maintain gorgeous hair during the rainy season...', category: 'Hair Care Tips', image: '/images/hair-care.jpg', author: 'Sparsh Beauty Team', createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-blog-2', title: 'Complete Bridal Beauty Guide 2024', excerpt: 'Everything you need to know about pre-bridal care and wedding day beauty preparation.', content: 'Your wedding day deserves the best version of you. From pre-bridal skincare routines to the perfect bridal makeup...', category: 'Bridal Beauty Guides', image: '/images/bridal-makeup.jpg', author: 'Mrs. Geetanjali Khedkar', createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-blog-3', title: 'Skin Care Routine for Glowing Skin', excerpt: 'Build the perfect skincare routine with our dermatologist-approved tips and product recommendations.', content: 'Beautiful skin requires consistent care. Here is a step-by-step guide to building your ideal skincare routine...', category: 'Skin Care Advice', image: '/images/skincare.jpg', author: 'Sparsh Beauty Team', createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-blog-4', title: 'Makeup Trends to Watch This Year', excerpt: 'Stay ahead of the curve with the latest makeup trends dominating the beauty industry.', content: 'From glass skin to berry lips, discover the makeup trends that are taking the beauty world by storm...', category: 'Makeup Trends', image: '/images/makeup-service.jpg', author: 'Sparsh Beauty Team', createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-blog-5', title: 'How to Start Your Beauty Career', excerpt: 'A comprehensive guide for aspiring beauty professionals looking to build a successful career.', content: 'The beauty industry offers exciting career opportunities. Here is how you can start your journey as a beauty professional...', category: 'Beauty Career Guidance', image: '/images/academy.jpg', author: 'Mrs. Geetanjali Khedkar', createdAt: new Date(), updatedAt: new Date() },
    ],
    galleryItem: [
      { id: 'fallback-gallery-1', title: 'Hair Transformation - Wavy to Sleek', category: 'Hair Transformations', image: '/images/hair-transformation.jpg', beforeImage: '/images/hair-care.jpg', createdAt: new Date() },
      { id: 'fallback-gallery-2', title: 'Bridal Makeup - Traditional Look', category: 'Bridal Makeup', image: '/images/bridal-makeup.jpg', beforeImage: null, createdAt: new Date() },
      { id: 'fallback-gallery-3', title: 'Skin Glow Treatment Result', category: 'Skin Care Results', image: '/images/skincare.jpg', beforeImage: null, createdAt: new Date() },
      { id: 'fallback-gallery-4', title: 'Academy Training Session', category: 'Academy Training', image: '/images/academy.jpg', beforeImage: null, createdAt: new Date() },
      { id: 'fallback-gallery-5', title: 'Salon Interior - Premium Setup', category: 'Salon Interiors', image: '/images/hero-salon.jpg', beforeImage: null, createdAt: new Date() },
      { id: 'fallback-gallery-6', title: 'Professional Hair Styling', category: 'Hair Transformations', image: '/images/hair-care.jpg', beforeImage: null, createdAt: new Date() },
      { id: 'fallback-gallery-7', title: 'HD Makeup Application', category: 'Bridal Makeup', image: '/images/makeup-service.jpg', beforeImage: null, createdAt: new Date() },
      { id: 'fallback-gallery-8', title: 'Nail Art Design', category: 'Salon Interiors', image: '/images/nail-care.jpg', beforeImage: null, createdAt: new Date() },
    ],
    contactSubmission: [] as any[],
    appointment: [] as any[],
  }

  const createModel = <T extends Record<string, any>>(items: T[]) => ({
    findMany: async ({ where, orderBy }: { where?: Record<string, any>; orderBy?: Record<string, string> } = {}) => {
      let filtered = [...items]

      if (where) {
        Object.entries(where).forEach(([key, value]) => {
          if (key === 'featured' && value === true) {
            filtered = filtered.filter(item => item.featured === true)
          } else if (typeof value === 'object' && value && 'contains' in value) {
            const search = String((value as { contains?: string }).contains ?? '').toLowerCase()
            filtered = filtered.filter(item => String(item[key as keyof T] ?? '').toLowerCase().includes(search))
          } else {
            filtered = filtered.filter(item => item[key as keyof T] === value)
          }
        })
      }

      if (orderBy?.createdAt === 'desc') {
        filtered.sort((a, b) => Number(new Date(b.createdAt as Date)) - Number(new Date(a.createdAt as Date)))
      }

      return filtered
    },
    create: async ({ data }: { data: any }) => {
      const created = { ...data, id: `fallback-${Date.now()}`, createdAt: new Date(), updatedAt: new Date() }
      items.push(created)
      return created
    },
  })

  return {
    product: createModel(fallbackData.product),
    course: createModel(fallbackData.course),
    testimonial: createModel(fallbackData.testimonial),
    blogPost: createModel(fallbackData.blogPost),
    galleryItem: createModel(fallbackData.galleryItem),
    contactSubmission: createModel(fallbackData.contactSubmission),
    appointment: createModel(fallbackData.appointment),
  }
}

function createPrismaClient() {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }

  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    })
    globalForPrisma.prisma = client
    return client
  } catch (error) {
    console.warn('Prisma client unavailable, falling back to local demo data.', error)
    return undefined
  }
}

const fallbackDb = globalForPrisma.fallbackDb ?? (globalForPrisma.fallbackDb = createFallbackDb())

export const db = new Proxy(fallbackDb, {
  get(target, prop) {
    const modelName = prop as string
    const fallbackModel = (target as Record<string, any>)[modelName]
    const prismaClient = createPrismaClient()
    const prismaModel = prismaClient ? (prismaClient as Record<string, any>)[modelName] : undefined

    if (!prismaModel) {
      return fallbackModel
    }

    // Intercept function calls on the Prisma Model delegate to capture errors / empty databases
    return new Proxy(prismaModel, {
      get(modelTarget, methodProp) {
        const methodName = methodProp as string
        const realMethod = modelTarget[methodName]
        const fallbackMethod = fallbackModel[methodName]

        if (typeof realMethod !== 'function') {
          return realMethod
        }

        return async function (...args: any[]) {
          try {
            const result = await realMethod.apply(modelTarget, args)
            
            // If fetching multiple items and returned empty array, check if we need to fall back
            if (methodName === 'findMany' && Array.isArray(result) && result.length === 0) {
              if (typeof fallbackMethod === 'function') {
                return fallbackMethod.apply(fallbackModel, args)
              }
            }
            return result
          } catch (error) {
            console.warn(`Prisma error in ${modelName}.${methodName}, falling back to mock data.`, error)
            if (typeof fallbackMethod === 'function') {
              return fallbackMethod.apply(fallbackModel, args)
            }
            throw error
          }
        }
      }
    })
  },
})