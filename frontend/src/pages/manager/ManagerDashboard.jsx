import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const [ilanlar, setIlanlar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/manager/job-postings");
      const data = await response.json();
      setIlanlar(data);
    };

    fetchData();
  }, []);

  const juriRaporlari = [
    { id: 1, ilan: "Dr. Öğr. Üyesi Kadrosu", raporDurumu: "Tamamlandı" },
    { id: 2, ilan: "Doçent Kadrosu", raporDurumu: "Beklemede" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Yönetici Dashboard</h1>

      <h2 className="text-xl font-semibold mb-2">İlanlara Yapılan Başvurular</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">İlan Başlığı</th>
            <th className="border border-gray-300 px-4 py-2">Başvuru Sayısı</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan._id}>
              <td className="border border-gray-300 px-4 py-2">{ilan.title}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.applicationCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Jüri Raporları</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">İlan</th>
            <th className="border border-gray-300 px-4 py-2">Rapor Durumu</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {juriRaporlari.map((rapor) => (
            <tr key={rapor.id}>
              <td className="border border-gray-300 px-4 py-2">{rapor.ilan}</td>
              <td className="border border-gray-300 px-4 py-2">{rapor.raporDurumu}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => navigate(`/manager/jury-reports/${rapor.id}`)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Raporları Görüntüle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}