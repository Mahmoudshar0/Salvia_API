const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateBody: { type: String, required: true },
  certificateNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  image: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);