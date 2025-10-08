const mongoose = require('mongoose');

const siteShowcaseTwoSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: 'Site Showcase Two' },
  description: { type: String, required: true, default: 'Explore the highlights of our website and services (Two).' },
  mainImageUrl: { type: String, required: true, default: 'https://via.placeholder.com/800x400?text=Site+Showcase+Two+Image' },
  active: { type: Boolean, required: true, default: false }
}, { timestamps: true });

module.exports = mongoose.model('SiteShowcaseTwo', siteShowcaseTwoSchema);