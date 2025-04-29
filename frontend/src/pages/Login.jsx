import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedAdminRole, setSelectedAdminRole] = useState(null); // Yönetici türünü seçmek için
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedRole === "aday" && !formData.tc) {
      toast.error("T.C. Kimlik Numarası gerekli");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Giriş başarılı!");
        localStorage.setItem("token", data.token);  // Token'ı localStorage'a kaydediyoruz

        // Aday yönlendirmesi
        if (selectedRole === "aday") {
          navigate("/candidate/home");
        }
        
        // Yönetici yönlendirmesi
        if (selectedRole === "yonetici") {
          if (selectedAdminRole === "admin") {
            navigate("/admin/home"); // Admin ana sayfasına yönlendirme
          } else if (selectedAdminRole === "jury") {
            navigate("/jury/home"); // Jüri ana sayfasına yönlendirme
          } else if (selectedAdminRole === "manager") {
            navigate("/manager/home"); // Yönetici ana sayfasına yönlendirme
          }
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Giriş hatası");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <img
          src={logo}
          alt="Kocaeli Üniversitesi"
          className="mx-auto mb-4 h-30"
        />
        <h1 className="text-xl font-bold">KOCAELİ ÜNİVERSİTESİ</h1>
        <p className="mb-6 text-sm">AKADEMİK PERSONEL BAŞVURU SİSTEMİ</p>

        {!selectedRole ? (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedRole("yonetici")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              Yönetici Girişi
            </button>
            <button
              onClick={() => setSelectedRole("aday")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              Aday Girişi
            </button>
          </div>
        ) : selectedRole === "yonetici" ? (
          // Yönetici için rol seçimi
          <div className="space-y-4">
            <button
              onClick={() => setSelectedAdminRole("admin")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              Admin Girişi
            </button>
            <button
              onClick={() => setSelectedAdminRole("manager")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              Yönetici Girişi
            </button>
            <button
              onClick={() => setSelectedAdminRole("jury")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              Jüri Girişi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {selectedRole === "aday" ? (
              <>
                <input
                  type="text"
                  placeholder="T.C. Kimlik Numarası"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  onChange={(e) =>
                    setFormData({ ...formData, tc: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Kullanıcı Adı"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="text-sm text-gray-500"
              >
                Geri
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                Giriş Yap
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
