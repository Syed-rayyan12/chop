"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function ScrollMarquee() {
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

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

  useEffect(() => {
    if (inView) {
      // Row 1: right → left, starting inside padding
      controls1.start({
        x: ["0%", "-100%"],
        transition: { duration: 65, ease: "linear", repeat: Infinity },
      });

      // Row 2: left → right, starting inside padding
      controls2.start({
        x: ["-100%", "0%"],
        transition: { duration: 65, ease: "linear", repeat: Infinity },
      });
    }
  }, [inView, controls1, controls2]);

  return (
    <div ref={ref} className="overflow-hidden w-full bg-white py-20 space-y-14">
      {/* Row 1: right → left */}
      <div className="relative mx-auto max-w-7xl overflow-hidden px-14">
        <motion.div
          initial={{ x: "0%" }}
          animate={controls1}
          className="inline-flex whitespace-nowrap"
        >
          {content1}
          {content1} {/* duplicate for seamless marquee */}
        </motion.div>
      </div>

      {/* Row 2: left → right */}
      <div className="relative mx-auto max-w-7xl overflow-hidden px-14">
        <motion.div
          initial={{ x: "-100%" }}
          animate={controls2}
          className="inline-flex whitespace-nowrap"
        >
          {content2}
          {content2} {/* duplicate for seamless marquee */}
        </motion.div>
      </div>
    </div>
  );
}
