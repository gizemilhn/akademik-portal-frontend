import { useState } from "react";

export default function ManagerCriteria() {
  const [criteria, setCriteria] = useState({
    doktor: [],
    docent: [],
    profesor: [],
  });

  const [newCriterion, setNewCriterion] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("doktor");

  const handleAddCriterion = () => {
    if (!newCriterion) return;
    setCriteria((prev) => ({
      ...prev,
      [selectedPosition]: [...prev[selectedPosition], newCriterion],
    }));
    setNewCriterion("");
  };

  const handleDeleteCriterion = (position, index) => {
    setCriteria((prev) => ({
      ...prev,
      [position]: prev[position].filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Kriter Yönetimi</h1>

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

      <h2 className="text-xl font-semibold mb-2">Kriterler</h2>
      <ul className="list-disc pl-6">
        {criteria[selectedPosition].map((criterion, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            <span>{criterion}</span>
            <button
              onClick={() => handleDeleteCriterion(selectedPosition, index)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}