const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      enum: [
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
      ],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
