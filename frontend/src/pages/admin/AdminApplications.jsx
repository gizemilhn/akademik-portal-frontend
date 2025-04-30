export default function AdminApplications() {
  const [basvurular, setBasvurular] = useState([]);
  const [selectedBasvuru, setSelectedBasvuru] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Başvuruları API'den çekme
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/applications');
        const data = await response.json();
        setBasvurular(data);
      } catch (error) {
        console.error("Başvurular alınırken hata oluştu:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleOpenModal = (basvuru) => {
    setSelectedBasvuru(basvuru);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBasvuru(null);
    setIsModalOpen(false);
  };

  const handleForward = (basvuru) => {
    fetch(`http://localhost:5000/api/admin/applications/${basvuru._id}/forward`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`Başvuru "${basvuru.candidate.name}" yetkililere yönlendirildi.`);
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Başvuru yönlendirilirken hata oluştu:", error);
      });
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
            <tr key={basvuru._id}>
              <td className="border border-gray-300 px-4 py-2">{basvuru._id}</td>
              <td className="border border-gray-300 px-4 py-2">{basvuru.candidate.name}</td>
              <td className="border border-gray-300 px-4 py-2">{basvuru.jobPosting.title}</td>
              <td className="border border-gray-300 px-4 py-2">{basvuru.status}</td>
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