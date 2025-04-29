import { useState } from "react";
import ApplicationDetailsModal from "../../components/ApplicationDetailsModal";

export default function AdminApplications() {
  const [selectedBasvuru, setSelectedBasvuru] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const basvurular = [
    { id: 1, aday: "Ahmet Yılmaz", ilan: "Dr. Öğr. Üyesi Kadrosu", durum: "Beklemede" },
    { id: 2, aday: "Mehmet Kaya", ilan: "Doçent Kadrosu", durum: "Onaylandı" },
    { id: 3, aday: "Ayşe Demir", ilan: "Profesör Kadrosu", durum: "Reddedildi" },
  ];

  const handleOpenModal = (basvuru) => {
    setSelectedBasvuru(basvuru);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBasvuru(null);
    setIsModalOpen(false);
  };

  const handleForward = (basvuru) => {
    console.log(`Başvuru ID: ${basvuru.id} yetkililere yönlendirildi.`);
    alert(`Başvuru "${basvuru.aday}" yetkililere yönlendirildi.`);
    handleCloseModal();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Başvurular</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Aday</th>
            <th className="border border-gray-300 px-4 py-2">İlan</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {basvurular.map((basvuru) => (
            <tr key={basvuru.id}>
              <td className="border border-gray-300 px-4 py-2">{basvuru.id}</td>
              <td className="border border-gray-300 px-4 py-2">{basvuru.aday}</td>
              <td className="border border-gray-300 px-4 py-2">{basvuru.ilan}</td>
              <td className="border border-gray-300 px-4 py-2">{basvuru.durum}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => handleOpenModal(basvuru)}
                >
                  Detayları Görüntüle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Başvuru Detayları Modali */}
      <ApplicationDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        basvuru={selectedBasvuru}
        onForward={handleForward}
      />
    </div>
  );
}