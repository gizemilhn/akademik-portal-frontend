const express = require('express');
const JobPosting = require('../models/JobPosting'); // JobPosting modelini içe aktaralım
const Candidate = require('../models/Candidate'); // Candidate modelini içe aktaralım
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
    try {
      const {
        title,
        description,
        applicationDeadline,
        requiredDocuments,
        conditions,
      } = req.body;
  
      // Zorunlu alanlar kontrolü
      if (!title || !description || !applicationDeadline || !conditions) {
        return res.status(400).json({ message: 'Başlık, açıklama, son başvuru tarihi ve koşullar zorunludur.' });
      }
  
      const newJobPosting = new JobPosting({
        title,
        description,
        applicationDeadline,
        requiredDocuments,
        conditions,
        status: 'Aktif', // Varsayılan durum
      });
  
      const savedJobPosting = await newJobPosting.save();
      res.status(201).json(savedJobPosting);
    } catch (error) {
      console.error('İlan eklenirken hata oluştu:', error);
      res.status(500).json({ message: 'Sunucu hatası' });
    }
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
      const applications = await Application.find()
        .populate('candidate')  // Candidate bilgileriyle birlikte başvuruları getiriyoruz
        .populate('jobPosting'); // JobPosting bilgileriyle birlikte başvuruları getiriyoruz
  
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: 'Başvurular alınırken hata oluştu' });
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
