const express = require('express');
const Application = require('../models/Application');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const reportStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  });
  const uploadReport = multer({ storage: reportStorage });
// Multer konfigürasyonu (basitçe dosya yükleme için)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Dosyaya benzersiz bir isim veriyoruz
  }
});

const upload = multer({ storage: storage });

// 1. Başvuru Oluşturma (Aday başvurusu)
router.post('/', upload.array('documents'), async (req, res) => {
  const { ilanId, userId, status } = req.body;
  
  // Yüklenen belgeler
  const documents = req.files.map(file => file.path); // Belgelerin dosya yollarını alıyoruz

  const application = new Application({
    ilanId,
    userId,
    documents,
    status
  });

  try {
    await application.save();
    res.status(201).json(application); // Başvuru başarıyla kaydedildi
  } catch (error) {
    console.error("❌ Başvuru hatası:", error);
    res.status(500).json({ message: 'Başvuru kaydedilirken hata oluştu', error: error.message });
  }
});
router.get('/', async (req, res) => {
    try {
      const applications = await Application.find();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: 'Başvurular alınamadı' });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);
      if (!application) {
        return res.status(404).json({ message: "Başvuru bulunamadı" });
      }
      res.json(application);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });
// PUT /api/applications/:id/jury
router.put('/:id/evaluate', uploadReport.single('juryReport'), async (req, res) => {
    const { id } = req.params;
    const { juryNote, juryDecision } = req.body;
    const juryReport = req.file?.path;
  
    try {
      const updated = await Application.findByIdAndUpdate(
        id,
        { juryNote, juryDecision, juryReport },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: 'Güncelleme hatası' });
    }
  });
module.exports = router;