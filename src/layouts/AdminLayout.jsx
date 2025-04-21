import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}