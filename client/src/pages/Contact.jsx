import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const phones = ['7254003186', '9576920809', '9708355960'];
const email = 'divyanshidigitalsolution@gmail.com';

export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
        Contact Us
      </h1>
      <p className="text-center text-gray-500 mb-10">
        Reach out to us for any query or service request.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Phone */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center text-xl shrink-0">
            <HiOutlinePhone />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
            {phones.map((p) => (
              <a
                key={p}
                href={`tel:${p}`}
                className="block text-primary-600 hover:underline text-sm"
              >
                +91 {p}
              </a>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center text-xl shrink-0">
            <HiOutlineMail />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
            <a
              href={`mailto:${email}`}
              className="text-primary-600 hover:underline text-sm break-all"
            >
              {email}
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center text-xl shrink-0">
            <FaWhatsapp />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">WhatsApp</h3>
            <a
              href={`https://wa.me/917254003186?text=Hello%20Divyanshi%20Digital%20Solution`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center text-xl shrink-0">
            <HiOutlineLocationMarker />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Visit Us</h3>
            <p className="text-gray-500 text-sm">
              Divyanshi Digital Solution
              <br />
              CSC Center, Near Main Market
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
