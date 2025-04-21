export default function AdminHome() {
  const ilanlar = [
    { id: 1, baslik: "Dr. Öğr. Üyesi Kadrosu", durum: "Yayında", basvuruTarihi: "2025-04-30" },
    { id: 2, baslik: "Doçent Kadrosu", durum: "Yayında", basvuruTarihi: "2025-05-15" },
    { id: 3, baslik: "Profesör Kadrosu", durum: "Başvurusu Biten", basvuruTarihi: "2025-04-15" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">İlanlar</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Başlık</th>
            <th className="border border-gray-300 px-4 py-2">Durum</th>
            <th className="border border-gray-300 px-4 py-2">Son Başvuru Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan.id}>
              <td className="border border-gray-300 px-4 py-2">{ilan.id}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.baslik}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.durum}</td>
              <td className="border border-gray-300 px-4 py-2">{ilan.basvuruTarihi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}