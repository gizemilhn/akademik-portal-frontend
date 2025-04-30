const express = require('express');
const Criteria = require('../models/Criteria'); // Criteria modelini içe aktaralım
const router = express.Router();

// 1. Yeni Kriter Ekleme
router.post('/criteria', async (req, res) => {
  const { category, requirements } = req.body;

  // Kriteri veritabanına kaydetme
  const criteria = new Criteria({ category, requirements });
  await criteria.save();

  res.status(201).json(criteria);  // Kriter başarıyla kaydedildi
});

router.get('/criteria', async (req, res) => {
  try {
    const criteria = await Criteria.find(); // Tüm kriterleri getir
    res.status(200).json(criteria);
  } catch (error) {
    console.error('Kriterler alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

router.delete('/criteria/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Kriteri veritabanından sil
    const deletedCriteria = await Criteria.findByIdAndDelete(id);

    if (!deletedCriteria) {
      return res.status(404).json({ message: 'Kriter bulunamadı.' });
    }

    res.status(200).json({ message: 'Kriter başarıyla silindi.' });
  } catch (error) {
    console.error('Kriter silinirken hata oluştu:', error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

module.exports = router;
