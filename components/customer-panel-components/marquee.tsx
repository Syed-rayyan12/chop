"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

export default function ScrollMarquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], 
    // animation runs smoothly while section is visible
  });

  // 🚀 Smoother + slower scroll movement
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);   // right → left
  const x2 = useTransform(scrollYProgress, [0, 1], ["-10%", "0%"]);  // left → right

  const content1 = (
    <>
      <span className="mx-8 text-7xl font-bold text-primary">
        Welcome to Our Store — Great Deals Everyday!
      </span>
      <span className="mx-8 text-7xl font-bold text-primary">
        Shop Now — Free Shipping on Orders Over $50!
      </span>
      <span className="mx-8 text-7xl font-bold text-primary">
        New Arrivals — Check Them Out!
      </span>
    </>
  );

  const content2 = (
    <>
      <span className="mx-8 text-7xl font-bold text-primary">
        Best Quality — Trusted by Thousands!
      </span>
      <span className="mx-8 text-7xl font-bold text-primary">
        Flash Sale — Don’t Miss Out!
      </span>
      <span className="mx-8 text-7xl font-bold text-primary">
        Join Now & Get Rewards!
      </span>
    </>
  );

  return (
    <div ref={ref} className="overflow-hidden w-full bg-white py-20 space-y-14">
      {/* Row 1: right → left */}
      <div className="relative mx-auto max-w-7xl overflow-hidden px-14">
        <motion.div style={{ x: x1 }} className="inline-flex whitespace-nowrap">
          {content1}
          {content1}
        </motion.div>
      </div>

      {/* Row 2: left → right */}
      <div className="relative mx-auto max-w-7xl overflow-hidden px-14">
        <motion.div style={{ x: x2 }} className="inline-flex whitespace-nowrap">
          {content2}
          {content2}
        </motion.div>
      </div>
    </div>
  );
}
