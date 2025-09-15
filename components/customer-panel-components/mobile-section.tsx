"use client"
import React from "react"
import { motion } from "framer-motion"
import { Utensils, Truck, Zap, ShieldCheck } from "lucide-react" // ✅ Lucide icons

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 }, // delay between each child
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: 30 }, // slide from right
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const FeatureSection = ({
  imageSrc = "/mobile.png",
  alt = "Feature image",
  items = null,
}) => {
  const defaultItems = [
    {
      icon: <Utensils className="w-6 h-6" />, // 🍽️ Fresh meals
      title: "Freshly Prepared Meals",
      desc: "Delicious food made fresh, just the way you like it—every order, every time",
    },
    {
      icon: <Truck className="w-6 h-6" />, // 🚚 Delivery
      title: "Fast & Reliable Delivery",
      desc: "Enjoy hot, fresh meals brought straight to your door—always on time.",
    },
    {
      icon: <Zap className="w-6 h-6" />, // ⚡ Speed
      title: "Speed You Can Trust",
      desc: "Connect with popular tools and APIs with minimal setup. Blazing fast load times and optimized rendering for every device.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />, // ✅ Trust/Quality
      title: "Trusted Quality & Service",
      desc: "Partnering with the best restaurants to bring you meals you can count on.",
    },
  ]

  const features = items || defaultItems

  return (
    <section className="mx-auto px-12 py-12 bg-white">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left: Image */}
        <div className="flex justify-center md:w-1/2 w-full">
          <img
            src={imageSrc}
            alt={alt}
            className="w-[50%] h-auto rounded-2xl object-cover swing-animation"
          />
        </div>

        {/* Right: Animated list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="md:w-1/2 w-full flex justify-center pl-20 flex-col gap-18"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-start leading-5 gap-4"
            >
              {/* Icon */}
              <div className="flex-none w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white">
                {f.icon}
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-2xl font-bold leading-tight">{f.title}</h3>
                <p className="mt-1 w-[70%] text-sm text-gray-600">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default FeatureSection
