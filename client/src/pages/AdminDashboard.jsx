import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import {
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlineRefresh,
} from 'react-icons/hi';

export default function AdminDashboard() {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) navigate('/admin', { replace: true });
  }, [isAuthenticated, navigate]);

  // Fetch requests
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (statusFilter !== 'All') params.status = statusFilter;
      const { data } = await API.get('/requests', { params });
      setRequests(data);
    } catch {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    if (isAuthenticated) fetchRequests();
  }, [fetchRequests, isAuthenticated]);

  // Toggle status
  const toggleStatus = async (id, current) => {
    const newStatus = current === 'Pending' ? 'Completed' : 'Pending';
    try {
      await API.patch(`/requests/${id}/status`, { status: newStatus });
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
      );
      toast.success(`Marked as ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  // Delete request
  const deleteRequest = async (id) => {
    if (!window.confirm('Delete this request?')) return;
    try {
      await API.delete(`/requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  // Export CSV
  const exportCSV = async () => {
    try {
      const res = await fetch('/api/requests/export/csv', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'service_requests.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('CSV downloaded');
    } catch {
      toast.error('Export failed');
    }
  };

  if (!isAuthenticated) return null;

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const completedCount = requests.filter((r) => r.status === 'Completed').length;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total" value={requests.length} color="bg-primary-100 text-primary-700" />
        <StatCard label="Pending" value={pendingCount} color="bg-yellow-100 text-yellow-700" />
        <StatCard label="Completed" value={completedCount} color="bg-green-100 text-green-700" />
        <button
          onClick={exportCSV}
          className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-2xl shadow text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <HiOutlineDownload className="text-lg" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, mobile, service…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-400 outline-none transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:ring-2 focus:ring-primary-400 outline-none transition"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
        <button
          onClick={fetchRequests}
          className="flex items-center justify-center gap-1 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
        >
          <HiOutlineRefresh /> Refresh
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-400 py-16">Loading…</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No requests found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-primary-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-medium">#</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Mobile</th>
                <th className="px-4 py-3 text-left font-medium">Service</th>
                <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Description</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {requests.map((r, i) => (
                <tr key={r._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                  <td className="px-4 py-3 text-gray-600">{r.mobile}</td>
                  <td className="px-4 py-3 text-gray-600">{r.service}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-[200px] truncate">
                    {r.description || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(r._id, r.status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        r.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {r.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => deleteRequest(r._id)}
                      className="text-red-500 hover:text-red-700 transition p-1"
                      title="Delete"
                    >
                      <HiOutlineTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className={`${color} rounded-2xl p-4 text-center shadow`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium mt-1">{label}</p>
    </div>
  );
}
