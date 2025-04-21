import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ApplyPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Başvuru yapıldı:", formData);
    alert("Başvurunuz başarıyla alındı!");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Başvuru Formu (İlan ID: {id})</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Ad Soyad</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">E-posta</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Belgeler</label>
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Başvur
        </button>
      </form>
    </div>
  );
}