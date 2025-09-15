"use client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { motion, easeOut } from "framer-motion"

const popularCuisines = [
  { id: 1, name: "Funzo", image: "/restaurant-1.jpeg", restaurantCount: 45 },
  { id: 2, name: "Bwibo", image: "/restaurant-2.jpeg", restaurantCount: 38 },
  { id: 3, name: "Mombasa", image: "/restaurant-3.jpeg", restaurantCount: 32 },
  { id: 4, name: "Safari", image: "/restaurant-4.jpeg", restaurantCount: 28 },
  { id: 5, name: "Bogobiri House", image: "/restaurant-5.jpeg", restaurantCount: 25 },
  { id: 6, name: "Morrocan Place", image: "/restaurant-6.jpeg", restaurantCount: 42 },
  { id: 7, name: "Nigerian Pot", image: "/restaurant-7.jpeg", restaurantCount: 22 },
  { id: 8, name: "Savanna Flavors", image: "/restaurant-8.jpeg", restaurantCount: 18 },
]

// Container animation with stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

// Card animation
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
}

export function PopularCuisines() {
  return (
    <section className="py-16 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4"
           
          >
            Popular <span className="text-secondary">Cuisines</span>
          </h2>
          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          
          >
            Explore a world of flavors from your favorite cuisines, all available for delivery.
          </p>
        </div>

        {/* Grid with animation */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {popularCuisines.map((cuisine) => (
            <motion.div
              key={cuisine.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Link href="/restaurants" passHref>
                <Card className="group transition-all duration-300 border-primary/50 bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={cuisine.image || "/placeholder.svg"}
                        alt={cuisine.name}
                        className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-heading font-semibold text-sm text-foreground mb-1">
                      {cuisine.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {cuisine.restaurantCount} restaurants
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
