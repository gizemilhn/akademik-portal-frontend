import { useState } from "react";

export default function ManagerJury() {
  const [ilanlar, setIlanlar] = useState([
    { id: 1, baslik: "Dr. Öğr. Üyesi Kadrosu", basvuruDurumu: "Tamamlandı", atananJuriler: [] },
    { id: 2, baslik: "Doçent Kadrosu", basvuruDurumu: "Tamamlandı", atananJuriler: [] },
  ]);

  const [juries, setJuries] = useState([
    { id: 1, ad: "Ali Veli", tc: "12345678901" },
    { id: 2, ad: "Ayşe Yılmaz", tc: "98765432109" },
    { id: 3, ad: "Mehmet Kaya", tc: "45678912345" },
  ]);

  const [selectedIlan, setSelectedIlan] = useState(null);
  const [selectedJuries, setSelectedJuries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJury, setNewJury] = useState({ ad: "", tc: "" });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddJury = () => {
    if (!newJury.ad || !newJury.tc) return;
    setJuries((prev) => [...prev, { ...newJury, id: prev.length + 1 }]);
    setNewJury({ ad: "", tc: "" });
    handleCloseModal();
  };

  const handleSelectJury = (juryId) => {
    if (selectedJuries.includes(juryId)) {
      setSelectedJuries(selectedJuries.filter((id) => id !== juryId));
    } else {
      setSelectedJuries([...selectedJuries, juryId]);
    }
  };

  const handleAssignJuries = () => {
    if (!selectedIlan || selectedJuries.length === 0) return;

    setIlanlar((prev) =>
      prev.map((ilan) =>
        ilan.id === selectedIlan.id
          ? { ...ilan, atananJuriler: [...ilan.atananJuriler, ...selectedJuries] }
          : ilan
      )
    );

    setSelectedJuries([]);
    setSelectedIlan(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Jüri Yönetimi</h1>

      <h2 className="text-xl font-semibold mb-2">Başvurusu Biten İlanlar</h2>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">İlan</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">Atanan Jüri</th>
            <th className="border border-gray-300 px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan.id}>
              <td className="border border-gray-300 px-4 py-2">{ilan.baslik}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.basvuruDurumu}</td>
              <td className="border border-gray-300 px-4 py-2">
                {ilan.atananJuriler.length > 0
                  ? ilan.atananJuriler
                      .map((juryId) => juries.find((jury) => jury.id === juryId)?.ad)
                      .join(", ")
                  : "Atanmadı"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => setSelectedIlan(ilan)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Jüri Ata
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedIlan && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Jüri Seçimi - {selectedIlan.baslik}</h2>
          <ul className="list-disc pl-6">
            {juries.map((jury) => (
              <li key={jury.id} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedJuries.includes(jury.id)}
                  onChange={() => handleSelectJury(jury.id)}
                  className="mr-2"
                />
                {jury.ad} - {jury.tc}
              </li>
            ))}
          </ul>
          <button
            onClick={handleAssignJuries}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Jüri Ata
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Jüri Listesi</h2>
      <ul className="list-disc pl-6">
        {juries.map((jury) => (
          <li key={jury.id} className="mb-2">
            {jury.ad} - {jury.tc}
          </li>
        ))}
      </ul>

      <button
        onClick={handleOpenModal}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Yeni Jüri Ekle
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Yeni Jüri Ekle</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ad Soyad</label>
              <input
                type="text"
                value={newJury.ad}
                onChange={(e) => setNewJury({ ...newJury, ad: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">TC Kimlik No</label>
              <input
                type="text"
                value={newJury.tc}
                onChange={(e) => setNewJury({ ...newJury, tc: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
              >
                İptal
              </button>
              <button
                onClick={handleAddJury}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}