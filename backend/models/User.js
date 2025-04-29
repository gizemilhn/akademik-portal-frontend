const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: false },
  tc: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['aday', 'yonetici', 'admin', 'jury'], // jury rolünü ekledik
    required: true 
  }
});

module.exports = mongoose.model('User', userSchema);