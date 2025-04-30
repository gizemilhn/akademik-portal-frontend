import { useState, useEffect } from "react";

export default function AdminHome() {
  const [ilanlar, setIlanlar] = useState([]); // İlanları tutacak state

  // API'den ilanları çekme
  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/job-postings');
        const data = await response.json();
        setIlanlar(data); // Veritabanından gelen ilanları state'e kaydediyoruz
      } catch (error) {
        console.error("İlanlar alınırken hata oluştu:", error);
      }
    };

    fetchJobPostings(); // İlanları API'den çekiyoruz
  }, []); // Component ilk render olduğunda çalışacak

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">İlanlar</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Başlık</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">Başvuru Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan._id}>
              <td className="border border-gray-300 px-4 py-2">{ilan._id}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.title}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(ilan.applicationDeadline).toLocaleDateString()} {/* Başvuru tarihini doğru formatta göster */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}