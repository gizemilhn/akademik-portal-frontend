import { useState } from "react";
import AdminViewAnnouncementModal from "../../components/AdminViewAnnouncementModal";
import EditAnnouncementModal from "../../components/EditAnnouncementModal";

export default function AdminAnnouncements() {
  const [ilanlar, setIlanlar] = useState([
    { id: 1, baslik: "Dr. Öğr. Üyesi Kadrosu", durum: "Yayında", detay: "Bu ilan Dr. Öğr. Üyesi içindir." },
    { id: 2, baslik: "Doçent Kadrosu", durum: "Yayında", detay: "Bu ilan Doçent içindir." },
    { id: 3, baslik: "Profesör Kadrosu", durum: "Başvurusu Biten", detay: "Bu ilan Profesör içindir." },
  ]);

  const [selectedIlan, setSelectedIlan] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenViewModal = (ilan) => {
    setSelectedIlan(ilan);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setSelectedIlan(null);
    setIsViewModalOpen(false);
  };

  const handleOpenEditModal = (ilan) => {
    setSelectedIlan(ilan);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedIlan(null);
    setIsEditModalOpen(false);
  };

  const handleAddAnnouncement = (newIlan) => {
    setIlanlar([...ilanlar, { id: ilanlar.length + 1, ...newIlan }]);
  };

  const handleDeleteAnnouncement = (id) => {
    setIlanlar(ilanlar.filter((ilan) => ilan.id !== id));
    handleCloseEditModal();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">İlanlar</h1>
      <button
        onClick={() => handleOpenEditModal(null)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
      >
        İlan Ekle
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Başlık</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan.id}>
              <td className="border border-gray-300 px-4 py-2">{ilan.id}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.baslik}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.durum}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleOpenViewModal(ilan)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Görüntüle
                </button>
                <button
                  onClick={() => handleOpenEditModal(ilan)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Düzenle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Görüntüleme Modali */}
      <AdminViewAnnouncementModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        ilan={selectedIlan}
      />

      {/* Düzenleme Modali */}
      <EditAnnouncementModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        ilan={selectedIlan}
        onSave={(updatedIlan) => {
          if (selectedIlan) {
            setIlanlar(
              ilanlar.map((ilan) => (ilan.id === updatedIlan.id ? updatedIlan : ilan))
            );
          } else {
            handleAddAnnouncement(updatedIlan);
          }
          handleCloseEditModal();
        }}
        onDelete={handleDeleteAnnouncement}
      />
    </div>
  );
}