const express = require('express');
const { Parser } = require('json2csv');
const ServiceRequest = require('../models/ServiceRequest');
const auth = require('../middleware/auth');
const router = express.Router();

// ──────────────── PUBLIC ────────────────

// POST /api/requests — create new service request
router.post('/', async (req, res) => {
  try {
    const { name, mobile, service, description } = req.body;
    const request = await ServiceRequest.create({ name, mobile, service, description });
    res.status(201).json({ message: 'Request submitted successfully!', request });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ──────────────── ADMIN (protected) ────────────────

// GET /api/requests — list all requests (with optional search)
router.get('/', auth, async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { name: regex },
        { mobile: regex },
        { service: regex },
        { description: regex },
      ];
    }

    const requests = await ServiceRequest.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/requests/:id/status — toggle status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Pending', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updated = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Request not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/requests/:id — delete a request
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await ServiceRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/requests/export/csv — export all requests as CSV
router.get('/export/csv', auth, async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 }).lean();
    const fields = ['name', 'mobile', 'service', 'description', 'status', 'createdAt'];
    const parser = new Parser({ fields });
    const csv = parser.parse(requests);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=service_requests.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
