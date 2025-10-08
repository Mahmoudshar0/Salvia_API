const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  date: { type: Date, required: true }, 
  location: { type: String, required: true }, 
  description: { type: String, required: true }, 
  highlights: { type: String, required: true },
  cta: { type: String, required: true }, 
  image: { type: String } 
}, { timestamps: true }); 

module.exports = mongoose.model('Event', eventSchema);