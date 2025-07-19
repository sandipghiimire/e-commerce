import { 
  Facebook, Instagram, Twitter, Linkedin, 
  Mail, Phone, MapPin
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10">
        {/* Compact layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-white p-1 rounded mr-2">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-8 h-8 rounded flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                NepalBazar
              </h2>
            </div>
            <p className="text-xs text-blue-100">
              Nepal's premier online marketplace
            </p>
            <div className="flex space-x-3">
              <Link href="https://facebook.com/nepalbazar" className="text-blue-200 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="https://instagram.com/nepalbazar" className="text-blue-200 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com/nepalbazar" className="text-blue-200 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="https://linkedin.com/company/nepalbazar" className="text-blue-200 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2 text-blue-200">ग्राहक सेवा</h3>
              <div className="space-y-1">
                <Link href="/help" className="block text-blue-100 hover:text-white">सहयोग केन्द्र</Link>
                <Link href="/returns" className="block text-blue-100 hover:text-white">फिर्ता नीति</Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-blue-200">कम्पनी</h3>
              <div className="space-y-1">
                <Link href="/about" className="block text-blue-100 hover:text-white">हाम्रो बारे</Link>
                <Link href="/contact" className="block text-blue-100 hover:text-white">सम्पर्क</Link>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-sm">
            <h3 className="font-medium mb-2 text-blue-200">सम्पर्क</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-blue-300 mt-1 mr-2 flex-shrink-0" />
                <span className="text-blue-100">पुतलीसडक, काठमाडौं</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-blue-300 mr-2" />
                <span className="text-blue-100">+९७७ ९८४१२३४५६७</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-blue-300 mr-2" />
                <span className="text-blue-100">support@nepalbazar.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-blue-700 text-center">
          <p className="text-xs text-blue-200">
            © {new Date().getFullYear()} NepalBazar. सर्वाधिकार सुरक्षित। |
            <Link href="/privacy" className="mx-1 hover:text-white">गोपनीयता नीति</Link> |
            <Link href="/terms" className="mx-1 hover:text-white">सर्तहरू</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}