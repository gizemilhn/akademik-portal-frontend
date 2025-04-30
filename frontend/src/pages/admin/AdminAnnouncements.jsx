import { useState, useEffect } from "react";
import EditAnnouncementModal from "../../components/EditAnnouncementModal";  // Modal bileşeni

export default function AdminAnnouncements() {
  const [ilanlar, setIlanlar] = useState([]);
  const [selectedIlan, setSelectedIlan] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // API'den ilanları çekme
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/job-postings');
        const data = await response.json();
        setIlanlar(data);  // API'den çekilen ilanları state'e kaydediyoruz
      } catch (error) {
        console.error("İlanlar alınırken hata oluştu:", error);
      }
    };
    
    fetchAnnouncements();  // İlanları ilk renderda çekiyoruz
  }, []);

  // İlan ekleme işlemi
  const handleOpenEditModal = (ilan) => {
    setSelectedIlan(ilan);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedIlan(null);
    setIsEditModalOpen(false);
  };

  // İlan güncellenmesi işlemi
  const handleUpdateAnnouncement = async (updatedIlan) => {
    console.log("Güncellenen İlan:", updatedIlan); // updatedIlan nesnesini loglayın
    try {
      // Eğer _id eksikse işlem yapma
      if (!updatedIlan._id) {
        console.error("İlan ID'si eksik!");
        return;
      }
  
      const response = await fetch(`http://localhost:5000/api/admin/job-postings/${updatedIlan._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedIlan),
      });
  
      const data = await response.json();
      // Eğer güncelleme başarılıysa, listeyi güncelle
      setIlanlar(ilanlar.map((ilan) => ilan._id === data._id ? data : ilan));
    } catch (error) {
      console.error("İlan güncellenirken hata oluştu:", error);
    }
  };

  // Yeni ilan ekleme işlemi
  const handleAddAnnouncement = async (newIlan) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/job-postings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIlan),  // Modaldan alınan yeni ilan bilgilerini gönderiyoruz
      });
      const data = await response.json();
      setIlanlar([...ilanlar, data]);  // Yeni eklenen ilanı listeye ekliyoruz
    } catch (error) {
      console.error("İlan eklenirken hata oluştu:", error);
    }
  };

  // İlan silme işlemi
  const handleDeleteAnnouncement = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/job-postings/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setIlanlar(ilanlar.filter((ilan) => ilan._id !== id));
        alert('İlan başarıyla silindi.');
      }
    } catch (error) {
      console.error("İlan silinirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">İlanlar</h1>
      <button
        onClick={() => handleOpenEditModal(null)} // Yeni ilan eklerken modal açılacak
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
      >
        İlan Ekle
      </button>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Kategori</th>
            <th className="border border-gray-300 px-4 py-2">Başlık</th>
            <th className="border border-gray-300 px-4 py-2">Başvuru Tarihi</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan, index) => (
            <tr key={ilan._id}>
              <td className="border border-gray-300 px-4 py-2">{ilan._id}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.category}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.title}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(ilan.applicationDeadline).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleOpenEditModal(ilan)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-4"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteAnnouncement(ilan._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Düzenleme Modali */}
      <EditAnnouncementModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        ilan={selectedIlan}
        onSave={(updatedIlan) => {
          if (selectedIlan) {
            handleUpdateAnnouncement(updatedIlan); // İlan güncelleniyor
          } else {
            handleAddAnnouncement(updatedIlan); // Yeni ilan ekleniyor
          }
          handleCloseEditModal();
        }}
      />
    </div>
  );
}
