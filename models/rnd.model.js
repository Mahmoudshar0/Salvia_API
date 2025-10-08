const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true }
});

const rndSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: 'Research & Development' },
  intro: { type: String, required: true, default: 'Welcome to our R&D section...' },
  sections: [sectionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Rnd', rndSchema);