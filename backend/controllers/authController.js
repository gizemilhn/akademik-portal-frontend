const jwt = require('jsonwebtoken');
const Candidate = require('../models/Candidate'); // Candidate modelini içe aktaralım
const Yonetici = require('../models/Yonetici'); // Yonetici modelini içe aktaralım

// Kullanıcı girişi işlemi
const loginUser = async (req, res) => {
  const { username, password, tc } = req.body;

  let user;

  try {
    if (tc) {
      user = await Candidate.findOne({ tc });
    } else if (username) {
      user = await Yonetici.findOne({ username });
    }

    if (!user) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı/şifre' });
    }

    // Şifreyi düz metin olarak karşılaştırıyoruz
    if (user.password !== password) {
      return res.status(401).json({ message: 'Geçersiz kullanıcı adı/şifre' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};

module.exports = { loginUser };
