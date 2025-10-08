const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: 'Contact Us' },
  description: { type: String, required: true, default: 'Get in touch with us for any inquiries or support.' },
  address: { type: String, required: true, default: '789 Random Ave, Imaginary City, Dreamland' },
  phone: { type: String, required: true, default: '+1-555-123-4567' },
  email: { type: String, required: true, default: 'contact@randomsite.xyz' },
  inquiries: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('ContactUs', contactUsSchema);