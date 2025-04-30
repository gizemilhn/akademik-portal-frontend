const Evaluation = require('../models/Evaluation');

router.get('/jury-reports', async (req, res) => {
  try {
    const evaluations = await Evaluation.find();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: 'Jüri raporları alınamadı', error });
  }
});
