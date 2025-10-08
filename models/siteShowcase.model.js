const mongoose = require('mongoose');

const siteShowcaseSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: 'Site Showcase' },
  description: { type: String, required: true, default: 'Explore the highlights of our website and services.' },
  mainImageUrl: { type: String, required: true, default: 'https://via.placeholder.com/800x400?text=Site+Showcase+Image' },
  active: { type: Boolean, required: true, default: false }
}, { timestamps: true });

module.exports = mongoose.model('SiteShowcase', siteShowcaseSchema);