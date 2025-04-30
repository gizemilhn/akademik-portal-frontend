import { useState, useEffect } from "react";

export default function ManagerCriteria() {
  const [newCriterion, setNewCriterion] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("doktor"); // Varsayılan pozisyon
  const [criteria, setCriteria] = useState([]);

  // Kriterleri backend'den çekme
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/manager/criteria");
        if (!response.ok) {
          throw new Error("Kriterler alınırken hata oluştu.");
        }
        const data = await response.json();
        setCriteria(data); // Gelen kriterleri state'e kaydediyoruz
      } catch (error) {
        console.error("Kriterler alınırken hata oluştu:", error);
      }
    };

    fetchCriteria();
  }, []); // Sayfa yüklendiğinde bir kez çalışır

  // Kriter ekleme işlemi
  const handleAddCriterion = async () => {
    if (!newCriterion) return;

    try {
      const response = await fetch("http://localhost:5000/api/manager/criteria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: selectedPosition, requirements: newCriterion }),
      });
      const data = await response.json();
      setCriteria((prev) => [...prev, data]); // Yeni kriteri listeye ekliyoruz
      setNewCriterion("");
    } catch (error) {
      console.error("Kriter eklenirken hata oluştu:", error);
    }
  };

  // Kriter silme işlemi
  const handleDeleteCriterion = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/manager/criteria/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCriteria(criteria.filter((criterion) => criterion._id !== id)); // Silinen kriteri listeden çıkar
        alert("Kriter başarıyla silindi.");
      } else {
        const data = await response.json();
        alert(data.message || "Kriter silinirken hata oluştu.");
      }
    } catch (error) {
      console.error("Kriter silinirken hata oluştu:", error);
      alert("Sunucu hatası.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Kriter Yönetimi</h1>

      {/* Pozisyon Seç */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Pozisyon Seç</label>
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="doktor">Dr. Öğr. Üyesi</option>
          <option value="docent">Doçent</option>
          <option value="profesor">Profesör</option>
        </select>
      </div>

      {/* Yeni Kriter Ekle */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Yeni Kriter Ekle</label>
        <input
          type="text"
          value={newCriterion}
          onChange={(e) => setNewCriterion(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Kriter girin..."
        />
        <button
          onClick={handleAddCriterion}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Ekle
        </button>
      </div>

      {/* Kriter Listesi */}
      <h2 className="text-2xl font-semibold mb-4">Kriterler</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Kategori</th>
            <th className="border border-gray-300 px-4 py-2">Gereksinimler</th>
            <th className="border border-gray-300 px-4 py-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion) => (
            <tr key={criterion._id}>
              <td className="border border-gray-300 px-4 py-2">{criterion.category}</td>
              <td className="border border-gray-300 px-4 py-2">{criterion.requirements}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeleteCriterion(criterion._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-4"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
