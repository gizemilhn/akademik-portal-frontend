import React from "react";
import { useNavigate } from "react-router-dom";

export default function AnnouncementModal({ isOpen, onClose, ilan }) {
  const navigate = useNavigate();

  // Eğer modal kapalıysa, hiçbir şey render edilmesin
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* İlan Başlığı */}
        <h2 className="text-xl font-bold mb-4">{ilan?.title}</h2>
        
        {/* Durum */}
        <p className="text-sm text-gray-600 mb-4">Durum: {ilan?.status}</p>

        {/* Detaylar */}
        <p className="text-gray-700">{ilan?.description}</p>

        {/* Modal Kapanma ve Başvuru Yapma Butonları */}
        <div className="mt-4 flex justify-end space-x-2">
          {/* Kapat butonu */}
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
          >
            Kapat
          </button>
          
          {/* Başvuru butonu */}
          <button
            onClick={() => navigate(`/candidate/apply`)}  // Başvuru sayfasına yönlendir
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Başvur
          </button>
        </div>
      </div>
    </div>
  );
}
