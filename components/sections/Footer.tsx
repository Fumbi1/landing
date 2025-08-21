import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center lg:items-start max-w-sm">
            <Link href="#home"  className="flex items-center space-x-2 mb-4">
            <Image src={'/logo.svg'} alt='logo' width={105} height={70} />
          </Link>
            <p className="text-gray-600 text-sm text-center lg:text-left">
              Digital solutions that align with Waldorf <br /> educational principles.
            </p>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center lg:justify-start gap-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Service
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              News
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Social media icons */}
          <div className="flex justify-center lg:justify-end gap-3">
            <a
              href="#"
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">© 2025 Waldorf School System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
