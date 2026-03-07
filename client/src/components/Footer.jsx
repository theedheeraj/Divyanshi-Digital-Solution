import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">Divyanshi Digital Solution</h3>
            <p className="text-primary-300">
              Your trusted CSC partner for all government & digital services.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/book" className="hover:text-white transition">Book Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <p>📞 7254003186</p>
            <p>📞 9576920809</p>
            <p>📞 9708355960</p>
            <p className="mt-1">✉️ divyanshidigitalsolution@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-6 pt-4 text-center text-xs text-primary-400">
          © {new Date().getFullYear()} Divyanshi Digital Solution. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
