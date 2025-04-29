import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ role, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Kullanıcı çıkış yaptı.");
    navigate("/"); // Login sayfasına yönlendirme
    onLogout();
  };

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center">
      <div className="font-bold text-lg">Aday Paneli</div>
      <div className="space-x-4">
        {role === "candidate" && (
          <>
            <Link to="/candidate/home" className="text-blue-500 hover:text-blue-700">
              Anasayfa
            </Link>
            <Link to="/candidate/applications" className="text-blue-500 hover:text-blue-700">
              Başvurularım
            </Link>
          </>
        )}
        {role === "admin" && (
          <>
            <Link to="/admin/dashboard" className="text-sm text-gray-700 hover:text-green-700">
              Admin Paneli
            </Link>
          </>
        )}
        {role === "manager" && (
          <>
            <Link to="/manager/dashboard" className="text-sm text-gray-700 hover:text-green-700">
              Yönetici Paneli
            </Link>
          </>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Çıkış
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
