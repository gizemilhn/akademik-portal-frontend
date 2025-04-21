import { useState } from "react";

export default function ManagerApplications() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      aday: "Ahmet Yılmaz",
      ilan: "Dr. Öğr. Üyesi Kadrosu",
      durum: "Beklemede",
      belgeler: [
        { id: 1, ad: "Diploma.pdf", url: "/files/diploma.pdf" },
        { id: 2, ad: "Transkript.pdf", url: "/files/transkript.pdf" },
      ],
      puan: 85,
    },
    {
      id: 2,
      aday: "Ayşe Kaya",
      ilan: "Doçent Kadrosu",
      durum: "Beklemede",
      belgeler: [
        { id: 1, ad: "Yabancı Dil Sertifikası.pdf", url: "/files/yabanci-dil.pdf" },
        { id: 2, ad: "Akademik Yayınlar.pdf", url: "/files/akademik-yayinlar.pdf" },
      ],
      puan: 90,
    },
  ]);

  const handleDownloadTablo5 = (applicationId) => {
    const application = applications.find((app) => app.id === applicationId);
    if (!application) return;

    // Örnek PDF oluşturma işlemi
    const pdfContent = `
      Aday: ${application.aday}
      İlan: ${application.ilan}
      Puan: ${application.puan}
      Belgeler:
      ${application.belgeler.map((belge) => `- ${belge.ad}`).join("\n")}
    `;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Tablo5_${application.aday}.pdf`;
    link.click();
  };

  const handleUpdateStatus = (applicationId, status) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, durum: status } : app
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Başvuru Yönetimi</h1>

      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Aday</th>
            <th className="border border-gray-300 px-4 py-2">İlan</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">Puan</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td className="border border-gray-300 px-4 py-2">{application.aday}</td>
              <td className="border border-gray-300 px-4 py-2">{application.ilan}</td>
              <td className="border border-gray-300 px-4 py-2">{application.durum}</td>
              <td className="border border-gray-300 px-4 py-2">{application.puan}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDownloadTablo5(application.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Tablo 5 İndir
                </button>
                <button
                  onClick={() => handleUpdateStatus(application.id, "Kabul Edildi")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Kabul Et
                </button>
                <button
                  onClick={() => handleUpdateStatus(application.id, "Reddedildi")}
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