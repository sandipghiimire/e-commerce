import { 
  Facebook, Instagram, Twitter, Linkedin, 
  Mail, Phone, MapPin, CreditCard, 
  Truck, ShieldCheck, Gift, MessageCircle,
  Globe, PhoneCall
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10">
        {/* Top Section with Brand and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-12 border-b border-blue-700">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-lg mr-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                NepalBazar
              </h2>
            </div>
            <p className="text-sm text-blue-100 max-w-xs">
              Nepal's premier online marketplace for authentic local products and exceptional service. Proudly serving customers across Nepal.
            </p>
            
            <div className="flex space-x-4">
              <Link 
                href="https://facebook.com/nepalbazar" 
                target="_blank"
                aria-label="Facebook"
                className="rounded-full p-2 bg-blue-800 transition-all hover:bg-blue-700 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="https://instagram.com/nepalbazar" 
                target="_blank"
                aria-label="Instagram"
                className="rounded-full p-2 bg-blue-800 transition-all hover:bg-blue-700 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link 
                href="https://twitter.com/nepalbazar" 
                target="_blank"
                aria-label="Twitter"
                className="rounded-full p-2 bg-blue-800 transition-all hover:bg-blue-700 hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://linkedin.com/company/nepalbazar" 
                target="_blank"
                aria-label="LinkedIn"
                className="rounded-full p-2 bg-blue-800 transition-all hover:bg-blue-700 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-blue-200">हाम्रो समाचारपत्रमा सहभागी हुनुहोस्</h3>
            <p className="text-sm text-blue-100 mb-4 max-w-xl">
              अपडेट, विशेष प्रस्तावहरू र नयाँ उत्पाद समाचारहरू प्राप्त गर्न सदस्यता लिनुहोस्। 
              साइन अप गर्दा तपाईंको पहिलो अर्डरमा १५% छुट प्राप्त गर्नुहोस्!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="तपाईंको इमेल ठेगाना" 
                className="px-4 py-3 rounded-lg bg-blue-800 border border-blue-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium transition-all transform hover:scale-105 duration-300">
                सदस्यता लिनुहोस्
              </button>
            </div>
            <p className="text-xs text-blue-200 mt-3">
              सदस्यता लिँदा, तपाईं हाम्रो गोपनीयता नीतिसँग सहमत हुनुहुन्छ र अपडेटहरू प्राप्त गर्न सहमति दिनुहुन्छ।
            </p>
          </div>
        </div>

        {/* Middle Section - Links and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-blue-700">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" /> ग्राहक सेवा
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/help" className="transition-colors hover:text-blue-300 flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span> सहयोग केन्द्र
              </Link>
              <Link href="/track-order" className="transition-colors hover:text-blue-300 flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span> अर्डर ट्र्याक गर्नुहोस्
              </Link>
              <Link href="/returns" className="transition-colors hover:text-blue-300 flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span> फिर्ता नीति
              </Link>
              <Link href="/contact" className="transition-colors hover:text-blue-300 flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span> हामीलाई सम्पर्क गर्नुहोस्
              </Link>
            </nav>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200 flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5" /> नीतिहरू
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link href="/privacy" className="transition-colors hover:text-blue-300 flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span> गोपनीयता नीति
              </Link>
              <Link href="/terms" className="transition-colors hover:text-blue-300 flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span> सेवाका सर्तहरू
              </Link>
              <Link href="/returns" className="transition-colors hover:text-blue-300 flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span> फिर्ता नीति
              </Link>
              <Link href="/shipping" className="transition-colors hover:text-blue-300 flex items-center">
                <span className="w-2 h-2 bg-blue-300 rounded-full mr-3"></span> ढुवानी जानकारी
              </Link>
            </nav>
          </div>

          {/* Payment & Shipping */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200 flex items-center">
              <CreditCard className="mr-2 h-5 w-5" /> भुक्तानीका विधिहरू
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {['eSewa', 'Khalti', 'ConnectIPS', 'Fonepay', 'IMEPay', 'COD'].map((method, index) => (
                <div key={index} className="bg-blue-800 p-2 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-center">{method}</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-semibold text-blue-200 mt-6 flex items-center">
              <Truck className="mr-2 h-5 w-5" /> ढुवानी साझेदारहरू
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {['DHL Nepal', 'Pathao', 'Star Courier', 'Sajha', 'FedEx', 'Nepal Post'].map((partner, index) => (
                <div key={index} className="bg-blue-800 p-1.5 rounded flex items-center justify-center">
                  <span className="text-xs text-center">{partner}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-200 flex items-center">
              <MapPin className="mr-2 h-5 w-5" /> हामीलाई सम्पर्क गर्नुहोस्
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-300 mt-1 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-100">
                  पुतलीसडक, काठमाडौं<br />
                  नेपाल
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-100">+९७७ ९८४१२३४५६७</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-100">support@nepalbazar.com</p>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-blue-300 mr-3 flex-shrink-0" />
                <p className="text-sm text-blue-100">www.nepalbazar.com</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-blue-200 mt-6 flex items-center">
              <PhoneCall className="mr-2 h-5 w-5" /> ग्राहक समर्थन
            </h3>
            <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg p-4">
              <p className="text-sm mb-2">२४/७ ग्राहक समर्थन</p>
              <p className="text-lg font-bold">९८०१२३४५६७</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-blue-200">
              © {new Date().getFullYear()} NepalBazar. सर्वाधिकार सुरक्षित।
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-blue-200 hover:text-blue-300 transition-colors">गोपनीयता नीति</Link>
            <Link href="/terms" className="text-sm text-blue-200 hover:text-blue-300 transition-colors">सेवाका सर्तहरू</Link>
            <Link href="/cookies" className="text-sm text-blue-200 hover:text-blue-300 transition-colors">कुकीज</Link>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-blue-200 flex items-center justify-center">
              <span className="flex h-3 w-3 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              सबै प्रणालीहरू सुचारु रूपमा काम गरिरहेका छन्
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}