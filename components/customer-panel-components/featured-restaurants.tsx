"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Truck } from "lucide-react"
import Link from "next/link"
import { motion, easeOut } from "framer-motion"

const featuredRestaurants = [
  {
    id: 1,
    name: "Funzo",
    image: "/restaurant-1.jpeg",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "Free",
    cuisine: "Morrocan",
    featured: true,
  },
  {
    id: 2,
    name: "Bwibo",
    image: "/restaurant-2.jpeg",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: "$2.99",
    cuisine: "Nigerian",
    featured: true,
  },
  {
    id: 3,
    name: "Mombasa",
    image: "/restaurant-3.jpeg",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    cuisine: "Madagascar",
    featured: true,
  },
  {
    id: 4,
    name: "Safari",
    image: "/restaurant-4.jpeg",
    rating: 4.9,
    deliveryTime: "35-45 min",
    deliveryFee: "$3.99",
    cuisine: "Egyption",
    featured: true,
  },
]

// Container animation (staggered children)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

// Card animation (fade + slight slide)
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export function FeaturedRestaurants() {
  return (
    <section className="py-16 bg-white relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300" className="absolute top-8 left-8 w-24 h-24 sway-right">
  <path fill="#0F3D2E" d="M100,0 C180,70 180,230 100,300 C20,230 20,70 100,0 Z"/>
  <ellipse cx="70" cy="120" rx="10" ry="18" fill="white"/>
  <ellipse cx="130" cy="120" rx="10" ry="18" fill="white"/>
  <rect x="90" y="160" width="20" height="30" rx="4" fill="white"/>
  <path fill="white" d="M80,230 Q100,250 120,230 Q100,255 80,230 Z"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300" className="absolute top-8 right-8 w-24 h-24 sway-right">
  <path fill="#0F3D2E" d="M100,5 C170,60 170,240 100,295 C30,240 30,60 100,5 Z"/>
  <circle cx="70" cy="110" r="15" fill="white"/>
  <circle cx="130" cy="110" r="15" fill="white"/>
  <rect x="90" y="160" width="20" height="40" rx="3" fill="white"/>
  <path fill="white" d="M75,230 Q100,250 125,230 Q100,255 75,230 Z"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="200" height="300" className="absolute top-8 left-8 w-24 h-24 sway-right">
  <path fill="white" d="M100,5 C170,60 170,240 100,295 C30,240 30,60 100,5 Z"/>
  <circle cx="70" cy="110" r="15" fill="black"/>
  <circle cx="130" cy="110" r="15" fill="black"/>
  <rect x="90" y="160" width="20" height="40" rx="3" fill="black"/>
  <path fill="black" d="M75,230 Q100,250 125,230 Q100,255 75,230 Z"/>
</svg>
      <div className="container mx-auto px-4 sm:px-6 lg:px-36">
        {/* Heading (no animation) */}
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Featured <span className="text-primary">Restaurants</span>
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Discover the most popular restaurants in your area, handpicked for quality and taste.
          </p>
        </div>

        {/* Cards with fade + slide on scroll */}
        <motion.div
          className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {featuredRestaurants.map((restaurant) => (
            <Link key={restaurant.id} href="/restaurants" passHref>
              <motion.div variants={itemVariants}>
                <Card className="group cursor-pointer transform-3d hover:-translate-y-1 duration-300 transition-all bg-white border border-primary/50 rounded-2xl  overflow-hidden">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      className="w-full h-48 max-sm:h-100 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {restaurant.featured && (
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm mb-3">{restaurant.cuisine}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Truck className="w-4 h-4 text-primary" />
                        <span className="text-primary font-bold">{restaurant.deliveryFee}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
