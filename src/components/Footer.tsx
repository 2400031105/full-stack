import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-emerald-500 fill-current" />
              <span className="text-xl font-bold text-white">DonateHope</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering communities through generosity. Every donation makes a difference.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#campaigns" className="hover:text-emerald-400 transition-colors">Campaigns</a></li>
              <li><a href="#donate" className="hover:text-emerald-400 transition-colors">Donate</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Impact Stories</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>contact@donatehope.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>123 Charity St, Hope City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; 2025 DonateHope. All rights reserved. Tax ID: 12-3456789</p>
        </div>
      </div>
    </footer>
  );
}
