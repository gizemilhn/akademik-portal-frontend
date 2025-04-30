import { useState, useEffect } from "react";
import ApplicationDetailsModal from "../../components/ApplicationDetailsModal";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]); // Boş bir dizi olarak başlat
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Başvuruları API'den çekme
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/applications");
        if (!response.ok) {
          throw new Error("Başvurular alınamadı");
        }
        const data = await response.json();
        setApplications(data); // Gelen veriyi state'e kaydet
      } catch (error) {
        console.error("Başvurular alınırken hata oluştu:", error);
        setApplications([]); // Hata durumunda boş bir dizi ayarla
      }
    };

    fetchApplications();
  }, []);

  const handleOpenModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
  };

  const handleForward = (application) => {
    alert(`Başvuru "${application.userId}" yetkililere yönlendirildi.`);
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
          {Array.isArray(applications) && applications.map((application) => (
            <tr key={application._id}>
              <td className="border border-gray-300 px-4 py-2">{application._id}</td>
              <td className="border border-gray-300 px-4 py-2">{application.userId}</td>
              <td className="border border-gray-300 px-4 py-2">{application.ilanId}</td>
              <td className="border border-gray-300 px-4 py-2">{application.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => handleOpenModal(application)}
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
        application={selectedApplication}
        onForward={handleForward}
      />
    </div>
  );
}