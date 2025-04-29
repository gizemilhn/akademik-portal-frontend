// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const loginUser = async (req, res) => {
  const { username, password, tc } = req.body;

  let user;
  if (tc) {
    user = await User.findOne({ tc });
  } else if (username) {
    user = await User.findOne({ username });
  }

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Geçersiz kullanıcı adı/şifre' });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};

module.exports = { loginUser };
