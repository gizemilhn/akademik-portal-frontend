import { useState } from "react";

export default function ApplicationForm() {
  const [role, setRole] = useState("dr");
  const [documents, setDocuments] = useState([]);
  const [ilanId] = useState("123456"); // Örnek sabit ilan ID
  const [userId] = useState("789012"); // Örnek sabit kullanıcı ID
  const [status] = useState("Beklemede");

  const roleLabel = {
    dr: "Dr. Öğretim Üyesi",
    docent: "Doçent",
    professor: "Profesör",
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setDocuments((prev) => [...prev, ...newFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    documents.forEach((file) => {
      formData.append("documents", file);
    });

    formData.append("ilanId", ilanId);
    formData.append("userId", userId);
    formData.append("status", status);

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Başvuru başarıyla kaydedildi", data);
    } catch (error) {
      console.error("Başvuru kaydedilirken hata oluştu:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto mt-10 bg-white shadow-2xl p-8 rounded-2xl space-y-10"
    >
      <h2 className="text-3xl font-bold">Academic Application Form</h2>

      {/* Kadro Seçimi */}
      <div>
        <label className="font-semibold">Başvuru Yapılan Kadro</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="dr">Dr. Öğretim Üyesi</option>
          <option value="docent">Doçent</option>
          <option value="professor">Profesör</option>
        </select>
      </div>

      {/* Ortak Belgeler */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-xl font-semibold">Ortak Belgeler</h3>
        <input type="file" multiple onChange={handleFileChange} accept=".pdf" />
      </div>

      {/* Role'e Özel Belgeler */}
      <div className="border-t pt-6 space-y-4">
        <h3 className="text-xl font-semibold">{roleLabel[role]}'ne Özel Belgeler</h3>

        {role === "dr" && (
          <>
            <InputFile label="A1–A2 makale (.pdf)" onFileSelect={handleFileChange} />
            <InputFile label="A1–A4 makale (.pdf)" onFileSelect={handleFileChange}/>
            <InputFile label="A1–A5 makale (.pdf)"onFileSelect={handleFileChange} />
            <InputFile label="Başlıca yazar kanıtı (.pdf)"onFileSelect={handleFileChange} />
          </>
        )}

        {role === "docent" && (
          <>
            <InputFile label="Toplam 6–7 makale (.pdf)"onFileSelect={handleFileChange} />
            <InputFile label="Tez danışmanlık belgesi (.pdf)"onFileSelect={handleFileChange} />
            <InputFile label="Proje görev belgesi (.pdf)"onFileSelect={handleFileChange} />
          </>
        )}

        {role === "professor" && (
          <>
            <InputFile label="Toplam 6–7 makale (.pdf)"onFileSelect={handleFileChange} />
            <InputFile label="2 YL veya 1 Doktora danışmanlığı (.pdf)"onFileSelect={handleFileChange} />
            <InputFile label="Araştırma proje belgeleri (.pdf)"onFileSelect={handleFileChange} />
            <InputFile label="Başlıca yazar olduğu 3 makale (.pdf)"onFileSelect={handleFileChange} />
          </>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
      >
        Başvuruyu Gönder
      </button>
    </form>
  );
}

// 🔹 Dosya girişi bileşeni
function InputFile({ label, onFileSelect }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="file"
        onChange={onFileSelect}
        accept=".pdf"
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}

// Dosya toplamak için useState dışındaki handleFileChange fonksiyonunu dışarıda global kullanmak istiyorsan,
// onu props olarak `InputFile` bileşenine geçirmen gerekir. Alternatif olarak yukarıdaki örnek sadeleştirilmiş versiyondur.
