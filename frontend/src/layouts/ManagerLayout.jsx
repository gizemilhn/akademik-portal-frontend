import { Outlet, Link, useNavigate } from "react-router-dom";

export default function ManagerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Çıkış işlemleri (örneğin, token temizleme) burada yapılabilir
    navigate("/"); // Login sayfasına yönlendirme
  };

  return (
    <div>
      <nav className="bg-gray-100 p-4 flex justify-between">
        <div className="font-bold text-lg">Yönetici Paneli</div>
        <div className="space-x-4">
          <Link to="/manager/home" className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
            Dashboard
          </Link>
          <Link to="/manager/criteria" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Kriter Yönetimi
          </Link>
          <Link to="/manager/jury" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
            Jüri Yönetimi
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Çıkış
          </button>
        </div>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}