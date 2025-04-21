import React, { useState } from "react";

export default function EditAnnouncementModal({ isOpen, onClose, ilan, onSave, onDelete }) {
  const [formData, setFormData] = useState(
    ilan || { baslik: "", durum: "Yayında", detay: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {ilan ? "İlanı Düzenle" : "Yeni İlan Ekle"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Başlık</label>
            <input
              type="text"
              name="baslik"
              value={formData.baslik}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Durum</label>
            <select
              name="durum"
              value={formData.durum}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Yayında">Yayında</option>
              <option value="Başvurusu Biten">Başvurusu Biten</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Detay</label>
            <textarea
              name="detay"
              value={formData.detay}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            {ilan && (
              <button
                type="button"
                onClick={() => onDelete(ilan.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Sil
              </button>
            )}
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
              >
                İptal
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Kaydet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}