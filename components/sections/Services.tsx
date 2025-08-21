"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { Variants } from "framer-motion"
import Image from "next/image"

// Animation Variants
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

const services = [
  { title: "Secure Internal Communication", color: "bg-green-200", image: "/f1.svg" },
  { title: "Digital Lesson Preparation", color: "bg-orange-200", image: "/f4.svg" },
  { title: "Digital Student & Parent Management", color: "bg-blue-200", image: "/f3.svg" },
  { title: "Online Schedule Management", color: "bg-yellow-200", image: "/f2.svg" },
  { title: "Document Management", color: "bg-pink-200", image: "/f5.svg" },
]

export function Services() {
  return (
    <section id="services" className="py-38 bg-[#FFF1E3] relative">
      <Image src={"/cloud-2.svg"} width={1920} height={591} alt="cloud" className="absolute -bottom-15 z-2" />
      <Image src={"/cloud-3.svg"} width={1920} height={846} alt="cloud" className="absolute -top-15 z-2" />
      <Image src={"/plane.svg"} width={84} height={110} alt="cloud" className="absolute bottom-10 left-5 z-2" />
      <Image src={"/location.svg"} width={198} height={93} alt="cloud" className="absolute top-10 left-1/6 z-2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Features That Simplify <br />
            <span className="text-cyan-600">School Life</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid gap-6 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service, index) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                className="h-full"
              >
                <Card
                  className={`${service.color} border-0 pb-0 h-[320px] cursor-pointer group overflow-hidden shadow-lg rounded-2xl relative`}
                >
                  <CardContent className="p-0 h-full flex flex-col justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight mx-6">{service.title}</h3>
                    <div className="relative h-full mt-4">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover object-top rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.slice(3, 5).map((service, index) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                className="h-full"
              >
                <Card
                  className={`${service.color} border-0 pb-0 h-[320px] cursor-pointer group overflow-hidden shadow-lg rounded-2xl relative`}
                >
                  <CardContent className="p-0 h-full flex flex-col justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight z-5 bg-transparent relative mx-6">{service.title}</h3>
                    <div className="relative h-full mt-4 z-1">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover object-top rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
