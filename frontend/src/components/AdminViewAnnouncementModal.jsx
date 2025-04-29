import React from "react";

export default function AdminViewAnnouncementModal({ isOpen, onClose, ilan }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">İlan Detayları</h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Başlık:</strong> {ilan?.baslik}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Durum:</strong> {ilan?.durum}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Detay:</strong> {ilan?.detay}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}