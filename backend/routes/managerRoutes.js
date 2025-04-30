const express = require('express');
const Criteria = require('../models/Criteria');
const Application = require('../models/Application'); 
const JuryMember = require('../models/JuryMember');
const Yonetici = require('../models/Yonetici');
const JobPosting = require('../models/JobPosting');
const JuryAssignment = require('../models/JuryAssignment'); // JuryAssignment modelini içe aktardık
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
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Başvurular alınamadı', error });
  }
});
router.put('/applications/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = await Application.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Durum güncellenemedi' });
  }
});

router.post('/jury-members', async (req, res) => {
  const { tc, password } = req.body;

  try {
    const newJury = new Yonetici({
      username: tc,  // TC numarasını username olarak alıyoruz
      password: password,
      role: 'jury',  // Jüri olarak kaydediyoruz
    });

    await newJury.save();
    res.status(201).json({ message: 'Jüri başarıyla kaydedildi.' });
  } catch (err) {
    console.error('Jüri eklenemedi:', err);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});
// Tüm jüri üyelerini getir
router.get("/jury-members", async (req, res) => {
  try {
    // Yonetici modelinden role: 'jury' olanları getir
    const juries = await Yonetici.find({ role: 'jury' });
    res.json(juries);
  } catch (err) {
    res.status(500).json({ message: "Jüriler alınamadı", error: err.message });
  }
});
router.post('/assign-jury', async (req, res) => {
  const { juryId, jobPostingId } = req.body;

  try {
    const newAssignment = new JuryAssignment({
      juryId,
      jobPostingId
    });

    await newAssignment.save();
    res.status(200).json({ message: 'Jüri ataması başarıyla yapıldı' });
  } catch (err) {
    console.error('Jüri atama hatası:', err);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

router.get('/job-postings', async (req, res) => {
  try {
    const jobPostings = await JobPosting.aggregate([
      {
        $lookup: {
          from: 'applications',
          localField: '_id',
          foreignField: 'ilanId',
          as: 'applications',
        },
      },
      {
        $addFields: {
          applicationCount: { $size: '$applications' },
        },
      },
      {
        $project: {
          title: 1,
          category: 1,
          applicationCount: 1,
          status: 1,
        },
      },
    ]);

    res.status(200).json(jobPostings);
  } catch (error) {
    console.error('İlanlar alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

router.get('/jury-by-posting/:jobPostingId', async (req, res) => {
  try {
    const { jobPostingId } = req.params;
    const juries = await JuryMember.find({ assignedPostings: jobPostingId })
      .populate('userId', 'username');
    res.status(200).json(juries);
  } catch (error) {
    console.error("Jüri sorgulama hatası:", error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

router.put('/jury-reports/:id', async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;

  try {
    const updated = await Application.findByIdAndUpdate(
      id,
      { juryDecision: decision },
      { new: true }
    );
    res.status(200).json({ message: 'Nihai karar başarıyla kaydedildi', updated });
  } catch (error) {
    res.status(500).json({ message: 'Nihai karar kaydedilirken hata oluştu' });
  }
});

router.get('/jury-reports', async (req, res) => {
  try {
    const juryReports = await Application.find({ juryDecision: { $exists: true } })
      .populate('ilanId', 'title') // İlan bilgilerini getir
      .populate('userId', 'username'); // Kullanıcı bilgilerini getir

    res.status(200).json(juryReports);
  } catch (error) {
    console.error('Jüri raporları alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
});

module.exports = router;
