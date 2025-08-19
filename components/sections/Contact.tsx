"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Variants } from 'framer-motion';

// Animation Variants
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
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

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Replace with actual Server Action call to Resend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form or success message after a few seconds
    setTimeout(() => setIsSubmitted(false), 4000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row gap-16"
        >
          <motion.div variants={slideInLeft} className="flex-1">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Let's talk!
            </motion.h2>
            <motion.h3 variants={fadeInUp} className="text-xl text-cyan-600 font-semibold mb-8">
              Request Information <span className="text-gray-900">Now Without Obligation!</span>
            </motion.h3>
            
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex items-center space-x-3 text-gray-600"><MapPin className="w-5 h-5 text-cyan-500" /><span>Germany, DE 123 Street</span></div>
              <div className="flex items-center space-x-3 text-gray-600"><Phone className="w-5 h-5 text-cyan-500" /><span>+49 30 123 456</span></div>
              <div className="flex items-center space-x-3 text-gray-600"><Mail className="w-5 h-5 text-cyan-500" /><span>info@waldorf-solutions.de</span></div>
            </motion.div>
          </motion.div>

          <motion.div variants={slideInRight} className="flex-1">
            <motion.form
              onSubmit={handleSubmit}
              variants={staggerContainer}
              className="space-y-6 bg-white rounded-2xl p-8 shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp}><label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label><Input required className="rounded-xl" placeholder="John Doe" /></motion.div>
                <motion.div variants={fadeInUp}><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label><Input className="rounded-xl" placeholder="+49 30 123 456" /></motion.div>
              </div>
              <motion.div variants={fadeInUp}><label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label><Input type="email" required className="rounded-xl" placeholder="your.email@school.de" /></motion.div>
              <motion.div variants={fadeInUp}><label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label><Textarea className="rounded-xl min-h-[100px]" placeholder="Tell us about your needs..." /></motion.div>
              <motion.div variants={fadeInUp}>
                <Button type="submit" disabled={isSubmitting || isSubmitted} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl py-3 text-lg font-medium disabled:opacity-60">
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.span key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Sending...
                      </motion.span>
                    ) : isSubmitted ? (
                      <motion.span key="submitted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Request Sent!
                      </motion.span>
                    ) : (
                      <motion.span key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Request Information
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}