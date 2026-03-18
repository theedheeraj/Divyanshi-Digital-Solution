import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import {
  HiOutlineDocumentText,
  HiOutlineBriefcase,
  HiOutlineTicket,
  HiOutlineIdentification,
  HiOutlineCreditCard,
  HiOutlineLibrary,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlinePrinter,
  HiOutlineGlobe,
} from 'react-icons/hi';

const services = [
  {
    icon: <HiOutlineDocumentText />,
    title: 'Online Form Filling',
    description: 'Govt schemes, exam forms, scholarships & more.',
    requirements: ['Aadhar card', 'Passport size photo', 'Application details'],
  },
  {
    icon: <HiOutlineBriefcase />,
    title: 'Job Applications',
    description: 'Apply for government & private job vacancies.',
    requirements: ['Resume', 'Aadhar/PAN', 'Education certificates'],
  },
  {
    icon: <HiOutlineTicket />,
    title: 'Ticket Booking',
    description: 'Train, bus & flight ticket booking services.',
    requirements: ['Travel date', 'ID proof (Aadhar/PAN/Voter ID)', 'Mobile number'],
  },
  {
    icon: <HiOutlineIdentification />,
    title: 'PAN & Aadhaar Services',
    description: 'New PAN, corrections, Aadhaar update & enrollment.',
    requirements: ['Aadhar card', 'Proof of address', 'Passport-size photo'],
  },
  {
    icon: <HiOutlineCreditCard />,
    title: 'AEPS Services',
    description: 'Aadhaar Enabled Payment System – cash withdrawals.',
    requirements: ['Aadhaar card', 'Registered mobile number', 'Biometric verification'],
  },
  {
    icon: <HiOutlineLibrary />,
    title: 'Bank Account Opening',
    description: 'Open savings accounts with major banks.',
    requirements: ['Aadhar card', 'PAN card', 'Passport-size photos'],
  },
  {
    icon: <HiOutlineShieldCheck />,
    title: 'Insurance',
    description: 'Life, health & vehicle insurance assistance.',
    requirements: ['Aadhaar/PAN', 'Vehicle details (for vehicle policy)', 'Medical history'],
  },
  {
    icon: <HiOutlineTruck />,
    title: 'Courier',
    description: 'Domestic & international courier services.',
    requirements: ['Sender & receiver details', 'Package weight', 'ID proof'],
  },
  {
    icon: <HiOutlinePrinter />,
    title: 'Printing & Photocopy',
    description: 'Color/B&W printing, photocopy & lamination.',
    requirements: ['Document file (PDF/JPG)', 'Print size', 'Copy count'],
  },
  {
    icon: <HiOutlineGlobe />,
    title: 'DL and Passport',
    description: 'Driving licence & passport application services.',
    requirements: ['Aadhar/PAN', 'Passport-size photos', 'Address proof'],
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            Divyanshi Digital Solution
          </h1>
          <p className="text-primary-200 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            Your trusted Common Service Centre for all government, banking,
            insurance & digital services — fast, reliable and affordable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book"
              className="bg-white text-primary-700 font-semibold px-6 py-3 rounded-xl shadow hover:shadow-lg hover:bg-primary-50 transition"
            >
              Book a Service
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-primary-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-14 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
          Our Services
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
          We offer a wide range of government and digital services under one
          roof.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-50 border-y border-primary-100">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Need a service? Book online now!
          </h2>
          <p className="text-gray-500 mb-6">
            Submit your request and we'll get back to you quickly.
          </p>
          <Link
            to="/book"
            className="inline-block bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl shadow hover:bg-primary-700 transition"
          >
            Book Service →
          </Link>
        </div>
      </section>
    </>
  );
}
