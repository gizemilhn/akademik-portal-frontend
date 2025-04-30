// frontend/src/pages/manager/ManagerJury.jsx
import { useEffect, useState } from "react";

export default function ManagerJury() {
  const [ilanlar, setIlanlar] = useState([]);
  const [juries, setJuries] = useState([]);
  const [selectedIlan, setSelectedIlan] = useState(null);
  const [selectedJuries, setSelectedJuries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ilanRes = await fetch("http://localhost:5000/api/manager/job-postings");
      const ilanData = await ilanRes.json();
      setIlanlar(ilanData);

      const juryRes = await fetch("http://localhost:5000/api/manager/jury-members");
      const juryData = await juryRes.json();
      setJuries(juryData);
    };

    fetchData();
  }, []);

  const handleSelectJury = (juryId) => {
    setSelectedJuries((prev) =>
      prev.includes(juryId) ? prev.filter((id) => id !== juryId) : [...prev, juryId]
    );
  };

  const handleAssign = async () => {
    for (let juryId of selectedJuries) {
      await fetch("http://localhost:5000/api/manager/assign-jury", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ juryId, jobPostingId: selectedIlan._id }),
      });
    }

    alert("Jüri ataması tamamlandı.");
    setSelectedJuries([]);
    setSelectedIlan(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Jüri Atama</h1>

      <h2 className="text-xl font-semibold mb-2">İlanlar</h2>
      <table className="table-auto w-full border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Başlık</th>
            <th className="border px-4 py-2">Kategori</th>
            <th className="border px-4 py-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan._id}>
              <td className="border px-4 py-2">{ilan.title}</td>
              <td className="border px-4 py-2">{ilan.category}</td>
              <td className="border px-4 py-2">
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
        <div>
          <h2 className="text-xl font-semibold mb-2">Jüri Seçimi - {selectedIlan.title}</h2>
          <ul className="list-disc pl-6 mb-4">
            {juries.map((jury) => (
              <li key={jury._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedJuries.includes(jury._id)}
                    onChange={() => handleSelectJury(jury._id)}
                    className="mr-2"
                  />
                  {jury.username} - {jury.tc}
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleAssign}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Jürileri Ata
          </button>
        </div>
      )}
    </div>
  );
}
