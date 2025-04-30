Akademik Personel Başvuru ve Değerlendirme Sistemi
Bu proje, akademik personel başvuruları ve değerlendirmeleri için geliştirilmiş bir sistemdir. Yöneticiler, başvuru sürecini yönetebilir, başvuruları değerlendirebilir, jüri üyelerini atayabilir ve nihai kararları verebilir. Adaylar başvurularını oluşturabilir ve gerekli belgeleri yükleyebilir.

İçindekiler
Proje Açıklaması

Kurulum

Kullanım

Yapılan Çalışmalar

Teknolojiler

Katkıda Bulunma

Proje Açıklaması
Bu sistem, akademik personel alımlarında kullanılan başvuru, değerlendirme ve jürilik atama süreçlerini yönetmek için tasarlanmıştır. Proje, başvuru yapacak adaylardan, başvuruları inceleyecek jürilere ve başvuruları onaylayacak yöneticilere kadar her aşamayı içerir.

Proje, front-end kısmı için React.js, back-end kısmı için Express.js ve MongoDB kullanarak geliştirilmiştir.

Özellikler:
Yönetici Paneli:

İlanlar ve başvuru sayısını görüntüleme.

Jüri atama ve yönetme.

Başvuruların nihai kararını verme.

Başvurulara ilişkin detayları görüntüleme.

Aday Paneli:

İlanlara başvuru yapma.

Gerekli belgeleri yükleme.

Başvurularının durumunu görüntüleme.

Jüri Paneli:

Başvuruları değerlendirme.

Belgeleri onaylama veya reddetme.

Nihai karar verme ve bu kararın başvuru statüsünü güncelleme.

Kurulum
Projenin hem front-end hem de back-end kısımlarını çalıştırabilmek için aşağıdaki adımları izleyebilirsiniz.

Backend Kurulumu
Backend için gerekli bağımlılıkları yüklemek için terminalde aşağıdaki komutu çalıştırın:

bash
cd backend
npm install

.env dosyasını oluşturun ve aşağıdaki gibi yapılandırın:
ini

MONGO_URI=<MongoDB URI>
PORT=5000

Backend server'ı başlatmak için şu komutu çalıştırın:

bash
npm start
Backend server'ınız şimdi http://localhost:5000 adresinde çalışıyor olmalıdır.

Frontend Kurulumu
Frontend için gerekli bağımlılıkları yüklemek için terminalde aşağıdaki komutu çalıştırın:

bash
cd frontend
npm install

Frontend server'ı başlatmak için şu komutu çalıştırın:
bash
npm start
Frontend uygulamanız http://localhost:3000 adresinde çalışacaktır.

Veritabanı ve Başlangıç Verisi
MongoDB veritabanı kullanılmaktadır. Uygulamayı çalıştırmadan önce MongoDB'nin kurulu olduğundan emin olun veya bir MongoDB Atlas hesabı oluşturun.

Kullanım
Admin Paneli
Admin panelinden başvuru yapılan ilanları görüntüleyebilir ve jürileri atayabilirsiniz.

Başvuruların değerlendirilmesini sağlayabilirsiniz.

Aday Paneli
Adaylar ilanları görüntüleyebilir ve başvuru yapabilir.

Başvurdukları ilanlar için gerekli belgeleri yükleyebilirler.

Jüri Paneli
Jüriler başvuruları görüntüleyebilir, belgeleri onaylayabilir veya reddedebilir.

Nihai değerlendirmeyi ve kararı belirleyebilirler.

Yapılan Çalışmalar
Başvuru ve Jüri Atama: Adaylar başvurularını yönetebilir ve jüri üyeleri atayabilir.

Değerlendirme: Jüri üyeleri başvuruları değerlendirir ve kararlarını verir.

Yönetici Yetkileri: Yöneticiler başvuruları onaylayabilir, reddedebilir ve jürileri atayabilir.

Backend API'leri: Başvuruların, jürilerin ve ilanların yönetimi için Express.js kullanarak API'ler oluşturulmuştur.

Teknolojiler
Frontend: React.js, React Router, Axios

Backend: Node.js, Express.js, MongoDB (Mongoose)

Authentication: JSON Web Token (JWT)

File Uploads: Multer

CORS: CORS middleware for cross-origin requests

Katkıda Bulunma
Bu projeye katkıda bulunmak isterseniz, lütfen aşağıdaki adımları izleyin:

Repo'yu fork edin.

Kendi dalınızda değişiklik yapın.

Pull request açarak yaptığınız değişiklikleri ana projeye eklenmesi için gönderin.
