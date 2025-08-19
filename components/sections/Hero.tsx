"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Variants } from 'framer-motion';
import Image from 'next/image';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
};
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};


export function Hero() {
  return (
    <section id="home" className="pt-32 pb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <motion.div variants={slideInLeft} className="flex-1 text-center lg:text-left">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Digital Solutions For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                Waldorf Schools
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Modern administration aligned with Waldorf pedagogy, designed to be simple, safe, and efficient.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-8 py-3">
                  Learn More <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={slideInRight} className="flex-1 relative">
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10"
            >
              {/* Replace with your actual image */}
              <Image 
                src="/hero.svg" // Add your image to the /public folder
                alt="Happy students learning"
                width={500}
                height={400}
                className="rounded-3xl shadow-2xl object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}