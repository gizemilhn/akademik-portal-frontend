const express = require('express');
const JobPosting = require('../models/JobPosting'); // JobPosting modelini içe aktaralım
const Application = require('../models/Application');
const router = express.Router();

// 1. İlanları Listeleme
router.get('/job-postings', async (req, res) => {
    try {
      const jobPostings = await JobPosting.find();
      res.json(jobPostings);
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'İlanlar alınırken hata oluştu' });
    }
  });
  
  // 2. Yeni İlan Ekleme
  router.post('/job-postings', async (req, res) => {
    console.log("Gelen Veri:", req.body);
    const { title, description, applicationDeadline, category, requiredDocuments, conditions, status } = req.body;
  
    const jobPosting = new JobPosting({
      title,
      description,
      applicationDeadline,
      category, // Kategori seçimi burada
      requiredDocuments,
      conditions,
      status,
    });
  
    await jobPosting.save();
  
    res.status(201).json(jobPosting); // Başarıyla kaydedilen ilanı geri gönderiyoruz
  });
  
  // 3. İlan Güncelleme
  router.put('/job-postings/:id', async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      applicationDeadline,
      requiredDocuments,
      conditions,
      status,
    } = req.body;
  
    try {
      const updatedJobPosting = await JobPosting.findByIdAndUpdate(id, {
        title,
        description,
        applicationDeadline,
        requiredDocuments,
        conditions,
        status,
      }, { new: true });
  
      if (!updatedJobPosting) {
        return res.status(404).json({ error: 'İlan bulunamadı' });
      }
  
      res.json(updatedJobPosting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'İlan güncellenirken hata oluştu' });
    }
  });
  
  // 4. İlan Silme
  router.delete('/job-postings/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedJobPosting = await JobPosting.findByIdAndDelete(id);
      if (!deletedJobPosting) {
        return res.status(404).json({ error: 'İlan bulunamadı' });
      }
      res.json({ message: 'İlan başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'İlan silinirken hata oluştu' });
    }
  });

// 5. Başvuruları Listeleme
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications); // Başvuruları döndür
  } catch (error) {
    console.error('Başvurular alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Başvurular alınamadı' });
  }
});

// 6. Başvuru Yönlendirme
router.post('/applications/:id/forward', async (req, res) => {
    const { id } = req.params;
  
    try {
      const application = await Application.findById(id).populate('candidate');
      if (!application) return res.status(404).json({ error: 'Başvuru bulunamadı' });
  
      // Başvuru durumunu güncelle
      application.status = "Yönlendirildi";
      await application.save();
  
      res.json({ message: 'Başvuru yetkililere yönlendirildi', application });
    } catch (error) {
      res.status(500).json({ error: 'Başvuru yönlendirilirken hata oluştu' });
    }
  });

module.exports = router;
