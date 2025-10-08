const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true }
});

const aboutUsSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: 'About Us' },
  intro: { type: String, required: true, default: 'Welcome to our About Us section...' },
  sections: [sectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', aboutUsSchema);