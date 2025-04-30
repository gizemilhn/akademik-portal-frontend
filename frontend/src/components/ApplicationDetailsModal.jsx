import React from "react";

export default function ApplicationDetailsModal({ isOpen, onClose, application, onForward }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Başvuru Detayları</h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Aday:</strong> {application?.userId}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>İlan:</strong> {application?.ilanId}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Durum:</strong> {application?.status}
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Kapat
          </button>
          <button
            onClick={() => onForward(application)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Yetkililere Yönlendir
          </button>
        </div>
      </div>
    </div>
  );
}