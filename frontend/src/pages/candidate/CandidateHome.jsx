import { useState } from "react";
import AnnouncementModal from "../../components/AnnouncementModal";

export default function CandidateHome() {
  const [selectedIlan, setSelectedIlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aktifKategori, setAktifKategori] = useState("Dr. Öğr. Üyesi");

  const ilanlar = [
    { id: 1, baslik: "Dr. Öğr. Üyesi Kadrosu", kategori: "Dr. Öğr. Üyesi", durum: "Yayında", basvuruTarihi: "2025-04-30", detay: "Bu ilan Dr. Öğr. Üyesi içindir." },
    { id: 2, baslik: "Doçent Kadrosu", kategori: "Doçent", durum: "Yayında", basvuruTarihi: "2025-05-15", detay: "Bu ilan Doçent içindir." },
    { id: 3, baslik: "Profesör Kadrosu", kategori: "Profesör", durum: "Başvurusu Biten", basvuruTarihi: "2025-04-15", detay: "Bu ilan Profesör içindir." },
  ];

  // Aktif kategoriye göre ilanları filtreleme
  const filtrelenmisIlanlar = ilanlar.filter((ilan) => ilan.kategori === aktifKategori);

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
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Başlık</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">Son Başvuru Tarihi</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {filtrelenmisIlanlar.map((ilan) => (
            <tr key={ilan.id}>
              <td className="border border-gray-300 px-4 py-2">{ilan.id}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.baslik}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.durum}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.basvuruTarihi}</td>
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
