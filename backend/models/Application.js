// backend/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  ilanId: { type: String, required: true },
  userId: { type: String, required: true },
  documents: { type: [String], required: true },  // Yüklenen belgelerin dosya yolları
  status: { type: String, default: 'Beklemede' }, // Başvuru durumu
  submissionDate: { type: Date, default: Date.now }, // Başvuru tarihi
  juryReport: { type: String, default: null },
  juryNote: { type: String, default: '' },
  juryDecision: { type: String, enum: ['Olumlu', 'Olumsuz', 'Beklemede'], default: 'Beklemede' },

});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;