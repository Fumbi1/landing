"use client";

import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import Image from 'next/image';

// Animation Variants
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const partners = ["/paypal .png", "/new-youtube.svg", "/national-geographic.svg", "/google.svg", "/office-365.svg", "/appple.png",];

export function Trust() {
  return (
    <section className="py-36 bg-white" id='news'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-[#181818] mb-12">
            Trusted By <br /><span className='text-[#0594D5]'>Waldorf Schools Across Germany</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 relative"
          ><div className='w-full h-full absolute bg-[#FFFFFF80] opacity-20 top-0 left-0'></div>
            {partners.map((partner) => (
              <motion.div
                key={partner}
                variants={fadeInUp}
                whileHover={{ scale: 1.1, color: '#333' }}
                className="text-gray-400 font-semibold text-2xl transition-colors duration-300"
              >
                <Image src={partner} alt='logos' width={150} height={150} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}