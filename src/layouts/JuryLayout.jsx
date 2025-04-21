import { Outlet, useNavigate } from "react-router-dom";

export default function JuryLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Çıkış işlemleri (örneğin, token temizleme) burada yapılabilir
    navigate("/"); // Login sayfasına yönlendirme
  };

  return (
    <div>
      <nav className="bg-gray-100 p-4 flex justify-between">
        <div className="font-bold text-lg">Jüri Paneli</div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Çıkış
        </button>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}