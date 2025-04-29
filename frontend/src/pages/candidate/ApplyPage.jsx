import { useState } from "react";

export default function ApplicationForm() {
  const [role, setRole] = useState("dr");

  const roleLabel = {
    dr: "Dr. Öğretim Üyesi",
    docent: "Doçent",
    professor: "Profesör",
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-2xl p-8 rounded-2xl space-y-10">
      <h2 className="text-3xl font-bold">Academic Application Form</h2>

      <div className="space-y-2">
        <label htmlFor="role" className="font-semibold">Başvuru Yapılan Kadro</label>
        <select
          id="role"
          className="w-full border rounded px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="dr">Dr. Öğretim Üyesi</option>
          <option value="docent">Doçent</option>
          <option value="professor">Profesör</option>
        </select>
      </div>

      {/* ORTAK BELGELER */}
      <div className="space-y-6 border-t pt-6">
        <h3 className="text-xl font-semibold">Ortak Zorunlu Belgeler</h3>

        <FormFile id="cv" label="YÖKSİS formatında özgeçmiş (.pdf)" />
        <FormFile id="diplomas" label="Lisans ve Lisansüstü diplomalar (.pdf)" multiple />
        <FormFile id="language" label="Yabancı Dil Belgesi (YDS, YÖKDİL vb.) (.pdf)" />
        <FormFile id="pubList" label="Yayın listesi ve tam metinleri (.pdf)" multiple />
        <FormFile id="citations" label="Atıf belgeleri (Web of Science, Scopus çıktıları) (.pdf)" multiple />
        <FormFile id="teachingLoad" label="Ders yükü çizelgeleri (son 3 yıl) (.pdf)" />
        <FormFile id="thesisAdvising" label="Tamamlanmış tez danışmanlıkları (.pdf)" />
        <FormFile id="projects" label="Görev alınan projelere dair belgeler (.pdf)" />
        <FormFile id="mainWorks" label="Başlıca eser, patent veya başvuru belgeleri (.pdf)" />
      </div>

      {/* KADROYA ÖZEL BELGELER */}
      <div className="space-y-6 border-t pt-6">
        <h3 className="text-xl font-semibold">{roleLabel[role]}'ne Özel Belgeler</h3>

        {role === "dr" && (
          <>
            <FormFile id="articleA1" label="A1–A2 dergilerinde yayımlanmış en az 1 makale (.pdf)" />
            <FormFile id="articleA4" label="A1–A4 dergilerinde yayımlanmış en az 2 makale (.pdf)" />
            <FormFile id="articleA5" label="A1–A5 dergilerinde yayımlanmış en az 1 makale (.pdf)" />
            <FormFile id="mainAuthorProof" label="Başlıca yazar olduğuna dair kanıt (.pdf)" />
          </>
        )}

        {role === "docent" && (
          <>
            <FormFile id="totalArticles" label="Toplam en az 6–7 adet makale (belge ile) (.pdf)" />
            <FormFile id="advisingProof" label="Tez danışmanlığına dair belgeler (.pdf)" />
            <FormFile id="projectProof" label="Araştırma projeleri (BAP dışı) görev belgeleri (.pdf)" />
          </>
        )}

        {role === "professor" && (
          <>
            <FormFile id="totalArticles" label="Toplam en az 6–7 adet makale (belge ile) (.pdf)" />
            <FormFile id="advisingProof" label="2 yüksek lisans veya 1 doktora danışmanlığına dair belgeler (.pdf)" />
            <FormFile id="projectProof" label="Araştırma projeleri (BAP dışı) görev belgeleri (.pdf)" />
            <FormFile id="mainAuthorArticles" label="Başlıca yazar olduğu en az 3 makale kanıtı (.pdf)" />
          </>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
      >
        Başvuruyu Gönder
      </button>
    </div>
  );
}

// 👇 Tekil belge alanı bileşeni
function FormFile({ id, label, multiple = false }) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block font-medium">{label}</label>
      <input
        type="file"
        id={id}
        name={id}
        multiple={multiple}
        accept=".pdf"
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}
