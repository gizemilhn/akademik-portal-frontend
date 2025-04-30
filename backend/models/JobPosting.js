// backend/models/JobPosting.js
const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  applicationDeadline: { type: Date, required: true },
  category: { type: String, required: true }, // Kategori: Dr. Öğr. Üyesi, Doçent, Profesör
  requiredDocuments: { type: [String], default: [] }, // Gerekli belgeler
  conditions: { type: String, default: '' }, // Başvuru koşulları
  status: { type: String, default: 'Aktif' }, // Durum: Aktif, Pasif vs.
});

const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

module.exports = JobPosting;
