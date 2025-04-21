import { useNavigate } from "react-router-dom";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const ilanlar = [
    { id: 1, baslik: "Dr. Öğr. Üyesi Kadrosu", basvuruSayisi: 12 },
    { id: 2, baslik: "Doçent Kadrosu", basvuruSayisi: 8 },
    { id: 3, baslik: "Profesör Kadrosu", basvuruSayisi: 5 },
  ];

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
            <th className="border border-gray-300 px-4 py-2">İlan</th>
            <th className="border border-gray-300 px-4 py-2">Başvuru Sayısı</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan.id}>
              <td className="border border-gray-300 px-4 py-2">{ilan.baslik}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.basvuruSayisi}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => navigate(`/manager/applications/${ilan.id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Başvuruları Görüntüle
                </button>
              </td>
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