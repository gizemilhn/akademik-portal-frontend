// backend/models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  tc: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'candidate' },
});

// Şifre hashleme işlemini kaldırıyoruz
module.exports = mongoose.model('Candidate', candidateSchema);
