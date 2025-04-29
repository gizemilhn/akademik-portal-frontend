import { useState } from "react";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementModal from "./AnnouncementModal";
import { useNavigate } from "react-router-dom";

export default function AnnouncementTabs() {
  const [aktifTab, setAktifTab] = useState("tum");
  const [selectedIlan, setSelectedIlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const ilanlar = [
    { id: 1, baslik: "Öğretim Üyesi", durum: "yayinda", detay: "Bu ilan öğretim üyeleri içindir." },
    { id: 2, baslik: "Araştırma Görevlisi", durum: "bitmis", detay: "Bu ilan araştırma görevlileri içindir." },
  ];

  const filtrelenmis = ilanlar.filter(i => aktifTab === "tum" || i.durum === aktifTab);

  const handleOpenModal = (ilan) => {
    setSelectedIlan(ilan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIlan(null);
  };

  const handleApply = () => {
    if (selectedIlan) {
      navigate(`/candidate/apply/${selectedIlan.id}`);
    }
    handleCloseModal();
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => setAktifTab("tum")} className="font-medium">Tümü</button>
        <button onClick={() => setAktifTab("yayinda")} className="font-medium">Yayında</button>
        <button onClick={() => setAktifTab("bitmis")} className="font-medium">Başvurusu Biten</button>
      </div>
      <div className="grid gap-4">
        {filtrelenmis.map(ilan => (
          <div key={ilan.id}>
            <AnnouncementCard ilan={ilan} />
            <button
              onClick={() => handleOpenModal(ilan)}
              className="text-blue-500 hover:underline"
            >
              Detayları Görüntüle
            </button>
          </div>
        ))}
      </div>
      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ilan={selectedIlan}
        onApply={handleApply}
      />
    </div>
  );
}
