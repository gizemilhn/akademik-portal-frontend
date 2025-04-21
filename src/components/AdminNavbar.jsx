import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Admin çıkış yaptı.");
    navigate("/"); // Login sayfasına yönlendirme
  };

  return (
    <div className="space-x-4 flex items-center justify-between bg-gray-100 p-4">
      <div className="flex space-x-4">
        <Link to="/admin/home" className="text-sm text-gray-700 hover:text-green-700">
          Anasayfa
        </Link>
        <Link to="/admin/applications" className="text-sm text-gray-700 hover:text-green-700">
          Başvurular
        </Link>
        <Link to="/admin/announcements" className="text-sm text-gray-700 hover:text-green-700">
          İlanlar
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Çıkış
      </button>
    </div>
  );
};

export default AdminNavbar;