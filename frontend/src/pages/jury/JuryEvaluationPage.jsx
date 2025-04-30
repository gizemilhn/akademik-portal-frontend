import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function JuryEvaluationPage() {
  const { id } = useParams(); // Başvuru ID'si
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [juryNote, setJuryNote] = useState("");
  const [juryDecision, setJuryDecision] = useState("");
  const [juryReport, setJuryReport] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/applications/${id}`);
        const data = await response.json();
        setApplication(data);
      } catch (error) {
        console.error("Başvuru getirilemedi:", error);
      }
    };
    fetchApplication();
  }, [id]);

  const handleSubmit = async () => {
    if (!juryNote || !juryDecision || !juryReport) {
      alert("Tüm alanları doldurun ve raporu yükleyin.");
      return;
    }

    const formData = new FormData();
    formData.append("juryNote", juryNote);
    formData.append("juryDecision", juryDecision);
    formData.append("juryReport", juryReport);

    try {
      const res = await fetch(`http://localhost:5000/api/applications/${id}/evaluate`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert("Değerlendirme kaydedildi!");
        navigate("/jury/home");
      } else {
        alert("Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  if (!application) return <div>Yükleniyor...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Başvuru Değerlendirme</h2>
      <p><strong>Kullanıcı ID:</strong> {application.userId}</p>
      <p><strong>İlan ID:</strong> {application.ilanId}</p>

      <h3 className="mt-4 text-lg font-semibold">Belgeler</h3>
      <ul className="mb-4 list-disc pl-6">
        {application.documents.map((doc, i) => (
          <li key={i}>
            <a href={`http://localhost:5000/${doc}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {doc.split("/").pop()}
            </a>
          </li>
        ))}
      </ul>

      <textarea
        placeholder="Değerlendirme Notu"
        className="w-full border p-2 mb-4"
        value={juryNote}
        onChange={(e) => setJuryNote(e.target.value)}
      />

      <select
        className="w-full border p-2 mb-4"
        value={juryDecision}
        onChange={(e) => setJuryDecision(e.target.value)}
      >
        <option value="">Nihai Karar Seçin</option>
        <option value="Olumlu">Olumlu</option>
        <option value="Olumsuz">Olumsuz</option>
      </select>

      <input
        type="file"
        accept="application/pdf"
        className="w-full mb-4"
        onChange={(e) => setJuryReport(e.target.files[0])}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Değerlendirmeyi Kaydet
      </button>
    </div>
  );
}
