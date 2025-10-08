const mongoose = require('mongoose');

const pageTitleSchema = new mongoose.Schema({
  eventsPageTitle: { type: String, required: true, default: 'Events' } 
}, { timestamps: true });

module.exports = mongoose.model('PageTitle', pageTitleSchema);