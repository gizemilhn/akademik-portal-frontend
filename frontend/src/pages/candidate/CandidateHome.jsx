import { useState, useEffect } from "react";
import AnnouncementModal from "../../components/AnnouncementModal";

export default function CandidateHome() {
  const [ilanlar, setIlanlar] = useState([]); // İlanları tutacak state
  const [selectedIlan, setSelectedIlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aktifKategori, setAktifKategori] = useState("Dr. Öğr. Üyesi"); // Varsayılan kategori

  // API'den ilanları çekme
  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/job-postings');
        const data = await response.json();
        setIlanlar(data); // API'den gelen ilanları state'e kaydediyoruz
      } catch (error) {
        console.error("İlanlar alınırken hata oluştu:", error);
      }
    };

    fetchJobPostings(); // İlanları API'den çekiyoruz
  }, []);

  // Aktif kategoriye göre ilanları filtreleme
  const filtrelenmisIlanlar = ilanlar.filter((ilan) => ilan.category === aktifKategori);

  const handleOpenModal = (ilan) => {
    setSelectedIlan(ilan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIlan(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">İlanlar</h1>

      {/* Sekmeler */}
      <div className="flex space-x-4 mb-6">
        {["Dr. Öğr. Üyesi", "Doçent", "Profesör"].map((kategori) => (
          <button
            key={kategori}
            onClick={() => setAktifKategori(kategori)}
            className={`px-4 py-2 rounded ${
              aktifKategori === kategori
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {kategori}
          </button>
        ))}
      </div>

      {/* İlan Tablosu */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Başlık</th>
            <th className="border border-gray-300 px-4 py-2">Kategori</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">Son Başvuru Tarihi</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {filtrelenmisIlanlar.map((ilan) => (
            <tr key={ilan._id}>
              <td className="border border-gray-300 px-4 py-2">{ilan.title}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.category}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(ilan.applicationDeadline).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleOpenModal(ilan)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Detayları Görüntüle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ilan={selectedIlan}
        onApply={() => console.log("Başvuru sayfasına yönlendiriliyor...")}
      />
    </div>
  );
}
