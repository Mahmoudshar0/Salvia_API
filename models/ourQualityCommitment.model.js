const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true }
});

const ourQualityCommitmentSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true, default: 'Our Quality Commitment' },
  intro: { type: String, required: true, default: 'Welcome to our quality commitment section...' },
  finalTitle: { type: String, required: true, default: 'Committed to Excellence' }, // حقل جديد
  sections: [sectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('OurQualityCommitment', ourQualityCommitmentSchema);