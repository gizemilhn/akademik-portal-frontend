import { useState,useEffect } from "react";

export default function ManagerApplications() {
  useEffect(() => {
    const fetchApplications = async () => {
      const res = await fetch('http://localhost:5000/api/manager/applications');
      const data = await res.json();
      setApplications(data);
    };
    fetchApplications();
  }, []);
  
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

  const handleUpdateStatus = async (applicationId, status) => {
    await fetch(`http://localhost:5000/api/manager/applications/${applicationId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });
  
    setApplications((prev) =>
      prev.map((app) =>
        app._id === applicationId ? { ...app, status } : app
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
          {ilanlar.map((ilan) => (
            <tr key={ilan._id}>
              <td className="border px-4 py-2">{ilan.title}</td>
              <td className="border px-4 py-2">{ilan.category}</td>
              <td className="border px-4 py-2">{ilan.applicationCount}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => setSelectedIlan(ilan)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Detaylar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}