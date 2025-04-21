import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CandidateLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Çıkış işlemleri (örneğin, token temizleme) burada yapılabilir
    navigate("/"); // Login sayfasına yönlendirme
  };

  // Örnek rol kontrolü (Bu rol bilgisi genelde bir context veya state üzerinden gelir)
  const role = "candidate"; // Örneğin, bu değer bir context veya state'den alınabilir.

  return (
    <div>
      {/* Navbar'a handleLogout fonksiyonunu prop olarak geçiyoruz */}
      <Navbar role={role} onLogout={handleLogout} />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
