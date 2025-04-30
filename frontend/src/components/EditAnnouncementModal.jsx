import React, { useState, useEffect } from "react";

export default function EditAnnouncementModal({ isOpen, onClose, ilan, onSave, onDelete }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    applicationDeadline: "",
    requiredDocuments: [],
    conditions: "",
    status: "Aktif", // Varsayılan olarak Aktif
  });

  // Eğer ilan varsa, modalı düzenleme moduna alacağız
  useEffect(() => {
    if (ilan) {
      setFormData({
        title: ilan.title,
        description: ilan.description,
        applicationDeadline: new Date(ilan.applicationDeadline).toISOString().slice(0, 10), // YYYY-MM-DD formatında alıyoruz
        requiredDocuments: ilan.requiredDocuments || [],
        conditions: ilan.conditions,
        status: ilan.status || "Aktif",
      });
    }else {
      // Yeni ilan ekleniyorsa formu temizle
      setFormData({
        title: "",
        description: "",
        applicationDeadline: "",
        requiredDocuments: [],
        conditions: "",
        status: "Aktif",
      });
    }
  }, [ilan]); // İlan değiştiğinde formu güncelle

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
    setFormData({
      title: "",
      description: "",
      applicationDeadline: "",
      requiredDocuments: [],
      conditions: "",
      status: "Aktif",
    });
  };// Yeni ilan veya düzenlenmiş ilanı kaydediyoruz


  const handleDocumentChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      requiredDocuments: value.split(",").map((doc) => doc.trim()), // Virgülle ayrılan belgeleri alıyoruz
    }));
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
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Açıklama</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Başvuru Tarihi</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Gerekli Belgeler (Virgülle ayırın)</label>
            <input
              type="text"
              name="requiredDocuments"
              value={formData.requiredDocuments.join(", ")} // Belgeleri virgülle ayırıyoruz
              onChange={handleDocumentChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Başvuru Koşulları</label>
            <input
              type="text"
              name="conditions"
              value={formData.conditions}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Durum</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Aktif">Aktif</option>
              <option value="Başvurusu Biten">Başvurusu Biten</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            {ilan && (
              <button
                type="button"
                onClick={() => onDelete(ilan._id)}
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