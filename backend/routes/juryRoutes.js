// backend/routes/juryRoutes.js

const express = require('express');
const router = express.Router();
const JuryAssignment = require('../models/JuryAssignment');
const Application = require('../models/Application');
const JobPosting = require('../models/JobPosting');

// Jüriye atanan başvuruları getir
router.get('/assigned-applications/:juryId', async (req, res) => {
  const { juryId } = req.params;

  try {
    // 1. Jüriye atanmış ilanları bul
    const assignments = await JuryAssignment.find({ juryId });

    const jobPostingIds = assignments.map((a) => a.jobPostingId);

    // 2. Bu ilanlara ait başvuruları bul
    const applications = await Application.find({ ilanId: { $in: jobPostingIds } }).populate('ilanId');

    res.status(200).json(applications);
  } catch (error) {
    console.error("Jüri başvurularını çekerken hata:", error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

module.exports = router;
