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
    <section id="home" className="pt-32 pb-16 bg-[#E3F6FF] relative overflow-hidden">
      <Image src={'/cloud.svg'} alt='cloud' width={2322} height={749} className='absolute -bottom-3 z-12 max-xl:bottom-0'/>
      <Image src={'/Group.svg'} alt='cloud' width={85.55} height={97} className='absolute md:bottom-20 bottom-60 scale-75 md:left-[45%] left-[15%] z-12 max-xl:bottom-1'/>
      <Image src={'/Group-1.svg'} alt='cloud' width={106.77} height={120.59} className='absolute md:top-40 top-64 scale-75 md:right-[4%] right-2 z-12 max-xl:bottom-1'/>
      <Image src={'/Group-2.svg'} alt='cloud' width={71.37} height={79.11} className='absolute top-30 left-1/2 scale-75 z-12 max-xl:bottom-1'/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row items-center justify-center md:justify-between gap-12"
        >
          <motion.div variants={slideInLeft} className="flex-1 text-center lg:text-left">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-400 text-gray-900 leading-tight mb-2">
              Digital Solutions For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                Waldorf Schools
              </span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-2 max-w-xl mx-auto lg:mx-0">
              Individual. Secure. Easy to use.
            </motion.p>
            <motion.div variants={fadeInUp}className='relative z-14'>
              <motion.div className="max-md:w-full max-md:items-center max-lg:justify-center flex flex-row items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-6">
                  <a href="#contact">
                    Request Info
                  </a>
                </Button>
                <Button asChild className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-3 border-rounded">
                  <a href="#contact">
                    <ArrowRight className="w-4 h-4 -rotate-45" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={slideInRight} className="flex-1 relative">
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10 max-md:top-30"
            >
              <Image
                src="/hero.svg"
                alt="Happy students learning"
                width={1277}
                height={836}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}