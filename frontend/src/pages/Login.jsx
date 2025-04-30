import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null); // Aday veya yönetici seçimi
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verilerin doğru gönderildiğini kontrol edelim
    console.log("Gönderilen Veri:", formData);
  
    if (selectedRole === "candidate" && !formData.tc) {
      toast.error("T.C. Kimlik Numarası gerekli");
      return;
    }
  
    if (selectedRole === "yonetici" && !formData.username) {
      toast.error("Kullanıcı adı gerekli");
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Form verilerini doğru şekilde gönderiyoruz
      });
  
      const data = await res.json();
      console.log("Backend'den Gelen Veri:", data);  // Backend'den gelen veriyi kontrol edelim
  
      if (res.ok) {
        toast.success("Giriş başarılı!");
        localStorage.setItem("token", data.token);  // Token'ı localStorage'a kaydediyoruz
  
        // Aday yönlendirmesi
        if (selectedRole === "candidate") {
          navigate("/candidate/home");
        }
  
        // Yönetici yönlendirmesi
        if (selectedRole === "yonetici") {
          if (data.role === "admin") {
            navigate("/admin/home"); // Admin ana sayfasına yönlendirme
          } else if (data.role === "jury") {
            navigate("/jury/home"); // Jüri ana sayfasına yönlendirme
          } else if (data.role === "manager") {
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
              onClick={() => setSelectedRole("candidate")}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
            >
              Aday Girişi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {selectedRole === "candidate" ? (
              <>
                <input
                  type="text"
                  placeholder="T.C. Kimlik Numarası"
                  autoComplete="username"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  onChange={(e) =>
                    setFormData({ ...formData, tc: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  autoComplete="current-password"
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
                  autoComplete="username"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  autoComplete="current-password"
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
