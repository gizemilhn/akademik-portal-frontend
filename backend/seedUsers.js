const mongoose = require('mongoose');

const Candidate = require('./models/Candidate'); // Candidate modelini içe aktaralım
const Yonetici = require('./models/Yonetici'); // Yonetici modelini içe aktaralım

mongoose.connect('mongodb://localhost:27017/akademik-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB bağlantısı kuruldu');
}).catch((err) => {
  console.error('❌ MongoDB bağlantı hatası:', err);
});

async function seedUsers() {
  try {
    // 1. Tüm kullanıcıları sil (hem Candidate hem de Yonetici koleksiyonlarındaki veriyi sil)
    await Candidate.deleteMany({});
    await Yonetici.deleteMany({});
    console.log('🧹 Eski kullanıcılar silindi');

    // 2. Yeni kullanıcı verileri
    const candidateUsers = [
      {
        password: 'candidatepass',
        tc: '45678901234',
        role: 'candidate',
      },
    ];

    const yoneticiUsers = [
      {
        username: 'adminuser',
        password: 'adminpass',
        role: 'admin',
      },
      {
        username: 'manageruser',
        password: 'managerpass',
        role: 'manager',
      },
      {
        username: 'juryuser',
        password: 'jurypass',
        role: 'jury',
      },
    ];

    // 3. Candidate kullanıcılarının şifrelerini düz metin olarak kaydet
    for (let user of candidateUsers) {
      const newUser = new Candidate({
        tc: user.tc,
        password: user.password, // Şifreyi düz metin olarak kaydediyoruz
        role: user.role,
      });
      await newUser.save();
      console.log(`✅ ${user.tc} kaydedildi (Aday)`);
    }

    // 4. Yonetici kullanıcılarının şifrelerini düz metin olarak kaydet
    for (let user of yoneticiUsers) {
      const newUser = new Yonetici({
        username: user.username,
        password: user.password, // Şifreyi düz metin olarak kaydediyoruz
        role: user.role,
      });
      await newUser.save();
      console.log(`✅ ${user.username} kaydedildi (Yönetici)`);
    }

  } catch (err) {
    console.error('🚨 Seed sırasında hata:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedUsers();
