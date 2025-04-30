// backend/models/Applications.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },  // Aday referansı
  jobPosting: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },  // İlan referansı
  status: { type: String, default: 'Beklemede' },  // Başvuru durumu
  appliedDate: { type: Date, default: Date.now },  // Başvuru tarihi
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;