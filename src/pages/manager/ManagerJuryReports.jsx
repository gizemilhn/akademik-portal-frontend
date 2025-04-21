import { useState } from "react";

export default function ManagerJuryReports() {
  const [juryReports, setJuryReports] = useState([
    {
      id: 1,
      ilan: "Dr. Öğr. Üyesi Kadrosu",
      aday: "Ahmet Yılmaz",
      raporlar: [
        { id: 1, juri: "Ali Veli", durum: "Tamamlandı", raporUrl: "/files/rapor1.pdf" },
        { id: 2, juri: "Ayşe Yılmaz", durum: "Beklemede", raporUrl: null },
      ],
      nihaiDurum: "Beklemede",
    },
    {
      id: 2,
      ilan: "Doçent Kadrosu",
      aday: "Ayşe Kaya",
      raporlar: [
        { id: 1, juri: "Mehmet Kaya", durum: "Tamamlandı", raporUrl: "/files/rapor2.pdf" },
        { id: 2, juri: "Ali Veli", durum: "Tamamlandı", raporUrl: "/files/rapor3.pdf" },
      ],
      nihaiDurum: "Beklemede",
    },
  ]);

  const handleFinalizeDecision = (reportId, decision) => {
    setJuryReports((prev) =>
      prev.map((report) =>
        report.id === reportId ? { ...report, nihaiDurum: decision } : report
      )
    );
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
          {juryReports.map((report) => (
            <tr key={report.id}>
              <td className="border border-gray-300 px-4 py-2">{report.ilan}</td>
              <td className="border border-gray-300 px-4 py-2">{report.aday}</td>
              <td className="border border-gray-300 px-4 py-2">
                <ul className="list-disc pl-4">
                  {report.raporlar.map((rapor) => (
                    <li key={rapor.id}>
                      {rapor.juri} - {rapor.durum}
                      {rapor.raporUrl && (
                        <a
                          href={rapor.raporUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline ml-2"
                        >
                          Görüntüle
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border border-gray-300 px-4 py-2">{report.nihaiDurum}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleFinalizeDecision(report.id, "Kabul Edildi")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Kabul Et
                </button>
                <button
                  onClick={() => handleFinalizeDecision(report.id, "Reddedildi")}
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