"use client";

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Calendar, FileText, MessageSquare, Users } from 'lucide-react';
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
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const services = [
  { title: "Secure Internal Communication", color: "bg-green-100", icon: MessageSquare },
  { title: "Digital Lesson Preparation", color: "bg-orange-100", icon: BookOpen },
  { title: "Digital Student & Parent Management", color: "bg-blue-100", icon: Users },
  { title: "Online Schedule Management", color: "bg-yellow-100", icon: Calendar },
  { title: "Document Management", color: "bg-pink-100", icon: FileText }
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Features That Simplify <span className="text-cyan-600">School Life</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={scaleIn}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
              className="h-full"
            >
              <Card className={`${service.color} border-0 h-full cursor-pointer group overflow-hidden shadow-lg rounded-2xl`}>
                <CardContent className="p-8 h-full flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-white rounded-xl p-4 w-fit mb-6 shadow-md group-hover:shadow-lg transition-all duration-300"
                  >
                    <service.icon className="w-8 h-8 text-gray-700" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}