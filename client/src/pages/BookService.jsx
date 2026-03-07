import { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api';

const serviceOptions = [
  'Online Form Filling',
  'Job Applications',
  'Ticket Booking',
  'PAN & Aadhaar Services',
  'AEPS Services',
  'Bank Account Opening',
  'Insurance',
  'Courier',
  'Printing & Photocopy',
  'DL and Passport',
  'Other',
];

const initial = { name: '', mobile: '', service: '', description: '' };

export default function BookService() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.service) {
      toast.error('Please fill all required fields');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      await API.post('/requests', form);
      toast.success('🎉 Request submitted successfully!');
      setForm(initial);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
        Book a Service
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Fill in the details below and we'll get in touch with you shortly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength={10}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition"
          />
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service <span className="text-red-500">*</span>
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition bg-white"
          >
            <option value="">— Select a service —</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Any additional details…"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-400 focus:border-primary-400 outline-none transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition disabled:opacity-60"
        >
          {loading ? 'Submitting…' : 'Submit Request'}
        </button>
      </form>
    </section>
  );
}
