// src/pages/Login.jsx


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedRole === "aday") {
      if (!formData.tc) {
        toast.error("T.C. Kimlik Numarası gerekli");
        return;
      }
      // Giriş başarılı varsayıyoruz
      toast.success("Aday girişi başarılı!");
      navigate("/candidate/dashboard");
    } else if (selectedRole === "yonetici") {
      if (!formData.username || !formData.password) {
        toast.error("Tüm alanları doldurun");
        return;
      }
      // Giriş başarılı varsayıyoruz
      toast.success("Yönetici girişi başarılı!");
      navigate("/admin/dashboard"); // Daha sonra role kontrolü yapılabilir
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
