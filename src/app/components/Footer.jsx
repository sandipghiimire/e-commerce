import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-100">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-blue-300">E-Commerce Pro</h2>
            <p className="text-sm text-gray-300">
              Your premier destination for quality products and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="transition-colors hover:text-blue-300">Home</Link>
              <Link href="/products" className="transition-colors hover:text-blue-300">Products</Link>
              <Link href="/about" className="transition-colors hover:text-blue-300">About Us</Link>
              <Link href="/contact" className="transition-colors hover:text-blue-300">Contact</Link>
            </nav>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200">Policies</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/privacy" className="transition-colors hover:text-blue-300">Privacy Policy</Link>
              <Link href="/terms" className="transition-colors hover:text-blue-300">Terms of Service</Link>
              <Link href="/returns" className="transition-colors hover:text-blue-300">Return Policy</Link>
              <Link href="/shipping" className="transition-colors hover:text-blue-300">Shipping Info</Link>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200">Connect With Us</h3>
            <div className="flex space-x-4">
              <Link 
                href="https://facebook.com" 
                target="_blank"
                aria-label="Facebook"
                className="rounded-full p-2 transition-colors hover:bg-blue-900 hover:text-blue-300"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank"
                aria-label="Instagram"
                className="rounded-full p-2 transition-colors hover:bg-blue-900 hover:text-blue-300"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                aria-label="Twitter"
                className="rounded-full p-2 transition-colors hover:bg-blue-900 hover:text-blue-300"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-blue-900 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} E-Commerce Pro. All rights reserved.<br />
            Designed with ❤️ by E-Commerce Team
          </p>
        </div>
      </div>
    </footer>
  );
}