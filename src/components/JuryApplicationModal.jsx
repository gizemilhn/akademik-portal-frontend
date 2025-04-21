import React, { useState } from "react";

export default function JuryApplicationModal({ isOpen, onClose, application, onSubmitEvaluation }) {
  const [evaluation, setEvaluation] = useState("");
  const [finalDecision, setFinalDecision] = useState("");
  const [uploadedReport, setUploadedReport] = useState(null);

  const handleFileUpload = (e) => {
    setUploadedReport(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!evaluation || !finalDecision || !uploadedReport) {
      alert("Lütfen tüm alanları doldurun ve raporunuzu yükleyin.");
      return;
    }

    onSubmitEvaluation({
      applicationId: application.id,
      evaluation,
      finalDecision,
      report: uploadedReport.name,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Başvuru Detayları</h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Aday:</strong> {application?.aday}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>İlan:</strong> {application?.ilan}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Durum:</strong> {application?.durum}
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Değerlendirme</label>
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
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}