// backend/models/Yonetici.js
const mongoose = require('mongoose');

const yoneticiSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'jury'], required: true }, // Admin, Manager, Jury
});

// Şifre hashleme işlemini kaldırıyoruz
module.exports = mongoose.model('Yonetici', yoneticiSchema);
