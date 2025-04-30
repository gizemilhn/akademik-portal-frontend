import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CandidateLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); 
  };

  const role = "candidate"; 

  return (
    <div>
      <Navbar role={role} onLogout={handleLogout} />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
