import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function JuryEvaluationPage() {
  const { id } = useParams(); // Başvuru ID'si
  const navigate = useNavigate();

  // Örnek başvuru verisi
  const application = {
    id,
    aday: "Ahmet Yılmaz",
    ilan: "Dr. Öğr. Üyesi Kadrosu",
    belgeler: [
      { id: 1, ad: "Diploma.pdf", url: "/files/diploma.pdf", durum: null },
      { id: 2, ad: "Transkript.pdf", url: "/files/transkript.pdf", durum: null },
      { id: 3, ad: "Yabancı Dil Sertifikası.pdf", url: "/files/yabanci-dil.pdf", durum: null },
    ],
  };

  const [belgeDurumlari, setBelgeDurumlari] = useState(application.belgeler);
  const [evaluation, setEvaluation] = useState("");
  const [finalDecision, setFinalDecision] = useState("");
  const [uploadedReport, setUploadedReport] = useState(null);

  const handleBelgeDurumuDegistir = (id, durum) => {
    setBelgeDurumlari((prev) =>
      prev.map((belge) =>
        belge.id === id ? { ...belge, durum } : belge
      )
    );
  };

  const handleFileUpload = (e) => {
    setUploadedReport(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!evaluation || !finalDecision || !uploadedReport) {
      alert("Lütfen tüm alanları doldurun ve raporunuzu yükleyin.");
      return;
    }

    const onaylananBelgeler = belgeDurumlari.filter((belge) => belge.durum === "Onaylandı").length;
    const toplamPuan = onaylananBelgeler * 10; // Örnek puanlama: her onaylanan belge 10 puan

    console.log("Değerlendirme Kaydedildi:", {
      applicationId: application.id,
      evaluation,
      finalDecision,
      toplamPuan,
      report: uploadedReport.name,
    });

    alert(`Değerlendirme kaydedildi. Toplam Puan: ${toplamPuan}`);
    navigate("/jury/home");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Başvuru Değerlendirme</h1>
      <p className="mb-2">
        <strong>Aday:</strong> {application.aday}
      </p>
      <p className="mb-4">
        <strong>İlan:</strong> {application.ilan}
      </p>

      <h2 className="text-xl font-semibold mb-2">Belgeler</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Belge Adı</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {belgeDurumlari.map((belge) => (
            <tr key={belge.id}>
              <td className="border border-gray-300 px-4 py-2">{belge.ad}</td>
              <td className="border border-gray-300 px-4 py-2">{belge.durum || "Beklemede"}</td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={belge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                >
                  Görüntüle
                </a>
                <button
                  onClick={() => handleBelgeDurumuDegistir(belge.id, "Onaylandı")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                >
                  Onayla
                </button>
                <button
                  onClick={() => handleBelgeDurumuDegistir(belge.id, "Reddedildi")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reddet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Değerlendirme Notu</label>
        <textarea
          value={evaluation}
          onChange={(e) => setEvaluation(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Değerlendirme notunuzu girin..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Nihai Karar</label>
        <select
          value={finalDecision}
          onChange={(e) => setFinalDecision(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="">Seçiniz</option>
          <option value="Olumlu">Olumlu</option>
          <option value="Olumsuz">Olumsuz</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rapor Yükle</label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Değerlendirmeyi Kaydet
      </button>
    </div>
  );
}