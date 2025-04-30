import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JuryApplicationModal from "../../components/JuryApplicationModal";

export default function JuryHome() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/applications");
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Başvurular alınamadı:", error);
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

  const handleSubmitEvaluation = (evaluation) => {
    setEvaluations([...evaluations, evaluation]);
    console.log("Değerlendirme Kaydedildi:", evaluation);
  };

  const handleNavigateToEvaluation = (applicationId) => {
    navigate(`/jury/evaluate/${applicationId}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Atanan Başvurular</h1>
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
        {applications.map((application) => (
            <tr key={application._id}>
              <td className="border px-4 py-2">{application._id}</td>
              <td className="border px-4 py-2">{application.userId}</td>
              <td className="border px-4 py-2">{application.ilanId}</td>
              <td className="border px-4 py-2">{application.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleNavigateToEvaluation(application._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Değerlendir
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>

      {/* Başvuru Detayları Modali */}
      <JuryApplicationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        application={selectedApplication}
        onSubmitEvaluation={handleSubmitEvaluation}
      />
    </div>
  );
}