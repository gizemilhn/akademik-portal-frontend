// backend/models/Criteria.js
const mongoose = require('mongoose');

const criteriaSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Kategori adı: "Dr. Öğr. Üyesi", "Doçent", "Profesör"
  requirements: { type: String, required: true }, // Kriterler: "5 yıl akademik deneyim" gibi
});

const Criteria = mongoose.model('Criteria', criteriaSchema);

module.exports = Criteria;
