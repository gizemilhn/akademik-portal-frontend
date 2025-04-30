// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // CORS paketini içeri aktaralım
const authRoutes = require('./routes/authRoutes'); 
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes'); 
const applicationRoutes = require('./routes/applicationRoutes'); 
const juryRoutes = require('./routes/juryRoutes');
dotenv.config();

const app = express();

// CORS konfigürasyonu
const corsOptions = {
  origin: 'http://localhost:5173',  // frontend'in portu
  methods: 'GET,POST,PUT,DELETE',  // izin verilen HTTP metodları
  allowedHeaders: 'Content-Type,Authorization',  // izin verilen başlıklar
};

app.use(cors(corsOptions));  // CORS'u uygulamaya dahil edelim

app.use(express.json());  // JSON verilerini almak için

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB'ye başarıyla bağlanıldı!");
}).catch(err => {
  console.error("MongoDB bağlantı hatası:", err);
});

// Routes
app.use('/api/auth', authRoutes); 
app.use('/api/admin',adminRoutes);
app.use('/api/manager',managerRoutes);
app.use('/api/applications', applicationRoutes); 
app.use('/api/jury', juryRoutes);// Başvuru işlemleri için route'ları kullanıyoruz;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
