"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, Lock, Layers } from 'lucide-react';
import { Variants } from 'framer-motion';

// Animation Variants
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const features = [
  {
    icon: CheckCircle,
    title: "Easy & Intuitive",
    description: "Simple user interface for teachers & learners"
  },
  {
    icon: Lock,
    title: "Secure & GDPR Compliant",
    description: "Top-level security of data, robust safety & compliance"
  },
  {
    icon: Layers,
    title: "Flexible & Modular",
    description: "Customize the system to fit your school's needs"
  }
];

export function Features() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          <motion.div variants={slideInLeft} className="flex-1">
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              {/* Using an image that reflects the design */}
              <Image 
                src="/features-image.png" // Add image to /public
                alt="Children interacting with technology"
                width={500}
                height={550}
                className="rounded-3xl shadow-xl object-cover mx-auto"
              />
            </motion.div>
          </motion.div>

          <motion.div variants={slideInRight} className="flex-1">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Modern Administration Aligned With{" "}
              <span className="text-cyan-600">Waldorf Pedagogy</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 mb-8 text-lg">
              Our system combines efficient administrative tools with a human-centered approach and pedagogical digital lesson planning.
            </motion.p>

            <motion.div variants={staggerContainer} className="space-y-6">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50/80 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-3 shadow-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-lg">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}