export default function CandidateApplications() {
  const basvurular = [
    { id: 1, ilan: "Öğretim Üyesi", durum: "Beklemede" },
    { id: 2, ilan: "Araştırma Görevlisi", durum: "Onaylandı" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Başvurularım</h1>
      <ul className="space-y-4">
        {basvurular.map(basvuru => (
          <li key={basvuru.id} className="p-4 border rounded shadow">
            <p className="font-medium">{basvuru.ilan}</p>
            <p className="text-sm text-gray-600">Durum: {basvuru.durum}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}