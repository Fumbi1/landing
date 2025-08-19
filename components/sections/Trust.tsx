"use client";

import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';

// Animation Variants
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const partners = ["PayPal", "YouTube", "Google", "Office 365", "Apple", "Stripe"];

export function Trust() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-500 mb-12">
            Trusted By Waldorf Schools Across Germany
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner}
                variants={fadeInUp}
                whileHover={{ scale: 1.1, color: '#333' }}
                className="text-gray-400 font-semibold text-2xl transition-colors duration-300"
              >
                {partner}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}