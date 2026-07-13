'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  image: string | null
  author: string
}

export default function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog')
        if (res.ok) {
          const data = await res.json()
          setPosts(data.slice(0, 6))
        }
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section id="blog" className="section-padding bg-cream" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-playfair)] text-charcoal mb-3">
            Beauty <span className="text-gold-gradient">Blog</span>
          </h2>
          <div className="luxury-divider mb-4" />
          <p className="text-warm-gray font-[family-name:var(--font-lato)]">
            Tips, trends, and insights from our beauty experts
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                  <div className="h-5 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-warm-gray font-[family-name:var(--font-lato)]">
            <p className="text-lg">Blog posts coming soon!</p>
            <p className="text-sm mt-1">Stay tuned for beauty tips and trends</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <Card className="overflow-hidden border-rose-gold-light/20 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col group">
                  <div className="relative w-full h-48 bg-gradient-to-br from-soft-pink to-cream overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-rose-gold-light/20 to-gold-light/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-rose-gold/90 text-white text-xs font-[family-name:var(--font-lato)]">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <h3 className="font-[family-name:var(--font-playfair)] font-semibold text-charcoal text-base mb-2 line-clamp-2 group-hover:text-rose-gold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-warm-gray text-sm font-[family-name:var(--font-lato)] line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <button className="inline-flex items-center gap-1 text-rose-gold text-sm font-medium font-[family-name:var(--font-lato)] hover:text-rose-gold-dark transition-colors group-hover:gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}