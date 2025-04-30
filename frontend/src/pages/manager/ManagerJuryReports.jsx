import { useState, useEffect } from "react";

export default function ManagerJuryReports() {
  const [juryReports, setJuryReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/manager/jury-reports");
        if (!res.ok) {
          throw new Error("Jüri raporları alınamadı");
        }
        const data = await res.json();
        setJuryReports(data);
      } catch (error) {
        console.error("Jüri raporları alınırken hata oluştu:", error);
        setJuryReports([]); // Hata durumunda boş bir dizi ayarla
      }
    };

    fetchReports();
  }, []);

  const handleFinalizeDecision = async (reportId, decision) => {
    try {
      await fetch(`http://localhost:5000/api/manager/jury-reports/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });

      setJuryReports((prev) =>
        prev.map((report) =>
          report._id === reportId ? { ...report, nihaiDurum: decision } : report
        )
      );
      alert("Nihai karar başarıyla kaydedildi.");
    } catch (error) {
      console.error("Nihai karar kaydedilirken hata oluştu:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Jüri Raporları Yönetimi</h1>

      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">İlan</th>
            <th className="border border-gray-300 px-4 py-2">Aday</th>
            <th className="border border-gray-300 px-4 py-2">Jüri Raporları</th>
            <th className="border border-gray-300 px-4 py-2">Nihai Durum</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(juryReports) && juryReports.map((report) => (
            <tr key={report._id}>
              <td className="border border-gray-300 px-4 py-2">{report.ilan?.title || "Bilinmiyor"}</td>
              <td className="border border-gray-300 px-4 py-2">{report.userId?.username || "Bilinmiyor"}</td>
              <td className="border border-gray-300 px-4 py-2">{report.juryDecision || "Beklemede"}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleFinalizeDecision(report._id, "Kabul Edildi")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Kabul Et
                </button>
                <button
                  onClick={() => handleFinalizeDecision(report._id, "Reddedildi")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reddet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}