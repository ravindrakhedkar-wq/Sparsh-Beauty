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
      { id: 'fallback-product-3', name: 'Bridal Makeup Kit', description: 'Complete bridal makeup kit with premium products', price: 4999, category: 'Makeup Kits', image: '/images/bridal-makeup.jpg', rating: 5, inStock: true, featured: true, createdAt: new Date(), updatedAt: new Date() },
    ],
    course: [
      { id: 'fallback-course-1', title: 'Professional Beautician Course', description: 'Comprehensive beautician training covering all aspects of beauty services.', duration: '6 Months', price: 45000, image: '/images/academy.jpg', featured: true, certificate: true, placement: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'fallback-course-2', title: 'Hair Styling & Hair Design', description: 'Master the art of hair styling from basic cuts to advanced designs.', duration: '3 Months', price: 25000, image: '/images/hair-transformation.jpg', featured: true, certificate: true, placement: true, createdAt: new Date(), updatedAt: new Date() },
    ],
    testimonial: [
      { id: 'fallback-testimonial-1', name: 'Priya Sharma', rating: 5, review: 'Amazing bridal makeup experience!', service: 'Bridal Makeup', image: '/images/bridal-makeup.jpg', createdAt: new Date() },
    ],
    blogPost: [
      { id: 'fallback-blog-1', title: '10 Essential Hair Care Tips', excerpt: 'Keep your hair healthy and beautiful during the rainy season.', content: 'Monsoon can wreak havoc on your hair.', category: 'Hair Care Tips', image: '/images/hair-care.jpg', author: 'Sparsh Beauty Team', createdAt: new Date(), updatedAt: new Date() },
    ],
    galleryItem: [
      { id: 'fallback-gallery-1', title: 'Hair Transformation', category: 'Hair Transformations', image: '/images/hair-transformation.jpg', beforeImage: '/images/hair-care.jpg', createdAt: new Date() },
    ],
    contactSubmission: [],
    appointment: [],
  }

  const createModel = <T extends Record<string, unknown>>(items: T[]) => ({
    findMany: async ({ where, orderBy }: { where?: Record<string, unknown>; orderBy?: Record<string, string> } = {}) => {
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
    create: async ({ data }: { data: T }) => {
      const created = { ...data, id: `fallback-${Date.now()}`, createdAt: new Date(), updatedAt: new Date() } as T & { id: string; createdAt: Date; updatedAt: Date }
      items.push(created as T)
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
    const prismaClient = createPrismaClient()
    if (prismaClient && typeof (prismaClient as Record<string, unknown>)[prop as string] !== 'undefined') {
      return (prismaClient as Record<string, unknown>)[prop as string]
    }
    return (target as Record<string, unknown>)[prop as string]
  },
})