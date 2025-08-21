"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import type { Variants } from "framer-motion"
import { Phone, Mail, MapPin, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Image from "next/image"

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

// Form validation schema
const contactSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  additionalInfo: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

// Form submission states
type SubmissionState = "idle" | "loading" | "success" | "error"

interface ContactSectionProps {
  id?: string
}

export default function Contact({ id = "contact" }: ContactSectionProps) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  // Intersection observer for animations
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Form submission handler
  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong")
      }

      setSubmissionState("success")
      reset() // Clear the form

      // Reset to idle state after 5 seconds
      setTimeout(() => {
        setSubmissionState("idle")
      }, 5000)
    } catch (error) {
      console.error("Contact form error:", error)
      setSubmissionState("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.")

      // Reset to idle state after 5 seconds
      setTimeout(() => {
        setSubmissionState("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  return (
    <section id={id} className="py-38 bg-[#FFF0F3] relative">
      <Image src={'/cloud-4.svg'} alt="cloud" width={1920} height={782} className="absolute -top-15 z-2" />
      <Image src={'/cloud-5.svg'} alt="cloud" width={1920} height={162} className="absolute -bottom-15 z-2" />
      <Image src={'/rocket.svg'} alt="cloud" width={128} height={130} className="absolute top-10 z-2" />
      <Image src={'/message.svg'} alt="cloud" width={110} height={99} className="absolute right-0 bottom-10 z-2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-5">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col lg:flex-row gap-16"
        >
          {/* Contact Information */}
          <motion.div variants={slideInLeft} className="flex-1">
            <motion.h3 variants={fadeInUp} className="text-4xl text-cyan-600 font-400 mb-8 relative">
              <Image src={'/float-msg.svg'} alt="cloud" width={112} height={56} className="absolute -top-0 right-30 z-2" />
              Request Information <br /><span className="text-gray-900">Now Without Obligation!</span>
            </motion.h3>

            <motion.p className="mb-12">
              We'd be happy to send you more details about our school system. <br /> Simply fill out the form
            </motion.p>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex flex-row gap-8">
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="text-gray-600 hover:text-cyan-600 transition-all duration-300 bg-white p-6 border rounded-3xl"
                >
                  <p className="mb-2 text-black font-bold">Address</p>
                  <span>Schellstr. 47 · 45134 Essen</span>
                </motion.div>
                <motion.div
                  className=" text-gray-600 hover:text-cyan-600 transition-all duration-300 bg-white p-6 border rounded-3xl"
                >
                  <p className="mb-2 text-black font-bold">Phone Number</p>
                  <span>+49 30 123 456</span>
                </motion.div>
              </div>

              <motion.div variants={fadeInUp} className="w-3/4 bg-white p-8 border rounded-3xl border-gray-200">
                <div className="text-sm text-gray-500">
                  <p className="font-medium mb-2 text-gray-700">Opening Hours:</p>
                  <p>8:00 AM - 2:30 PM (Monday - Friday)</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={slideInRight} className="flex-1">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              variants={staggerContainer}
              className="space-y-6 bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
            >
              <motion.h2 variants={fadeInUp} className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                Let's talk!
              </motion.h2>
              {/* Form Fields */}
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <Input
                  {...register("fullName")}
                  className="rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="John Doe"
                  disabled={submissionState === "loading"}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
              </motion.div>

              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name *</label>
                <Input
                  {...register("schoolName")}
                  className="rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                  placeholder="Your School Name"
                  disabled={submissionState === "loading"}
                />
                {errors.schoolName && <p className="mt-1 text-sm text-red-600">{errors.schoolName.message}</p>}
              </motion.div>
              <motion.div variants={fadeInUp}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role in School (optional)</label>
                <Textarea
                  {...register("additionalInfo")}
                  className="rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400 min-h-[100px]"
                  placeholder="your role(s)"
                  disabled={submissionState === "loading"}
                />
                {errors.additionalInfo && <p className="mt-1 text-sm text-red-600">{errors.additionalInfo.message}</p>}
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <Input
                    type="email"
                    {...register("email")}
                    className="rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    placeholder="your.email@school.de"
                    disabled={submissionState === "loading"}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    {...register("phoneNumber")}
                    className="rounded-xl border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                    placeholder="+49 30 123 456"
                    disabled={submissionState === "loading"}
                  />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>}
                </motion.div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {submissionState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-600">{errorMessage}</p>
                    {/* <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent Successfully! */}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.div variants={fadeInUp}>
                <motion.div
                  whileHover={{ scale: submissionState === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: submissionState === "loading" ? 1 : 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={submissionState === "loading"}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <AnimatePresence mode="wait">
                      {submissionState === "loading" ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center"
                        >
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </motion.div>
                      ) : submissionState === "success" ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center bg-green-600"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Message Sent Successfully!
                        </motion.div>
                      ) : (
                        <motion.div
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Request Information
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Success Message */}
              <AnimatePresence>
                {submissionState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center p-6 bg-green-50 border border-green-200 rounded-xl"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h4 className="font-semibold text-green-800 mb-2">Thank you!</h4>
                    <p className="text-sm text-green-700">
                      We've received your request and will get back to you within 24 hours. Check your email for a
                      confirmation message.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
