// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CandidateHome from "./pages/candidate/CandidateHome";
import CandidateLayout from "./layouts/CandidateLayout";
import CandidateApplications from "./pages/candidate/Applications";
import ApplyPage from "./pages/candidate/ApplyPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import JuryLayout from "./layouts/JuryLayout";
import JuryHome from "./pages/jury/JuryHome";
import JuryEvaluationPage from "./pages/jury/JuryEvaluationPage";
import ManagerLayout from "./layouts/ManagerLayout";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerCriteria from "./pages/manager/ManagerCriteria";
import ManagerJury from "./pages/manager/ManagerJury";
import ManagerApplications from "./pages/manager/ManagerApplications";
import ManagerJuryReports from "./pages/manager/ManagerJuryReports";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and NotFound */}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        {/* Candidate Routes */}
        <Route path="/candidate" element={<CandidateLayout />}>
          <Route path="home" element={<CandidateHome />} />
          <Route path="applications" element={<CandidateApplications />} />
          <Route path="apply/:id" element={<ApplyPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
        </Route>

        {/* Jury Routes */}
        <Route path="/jury" element={<JuryLayout />}>
          <Route path="home" element={<JuryHome />} />
          <Route path="evaluate/:id" element={<JuryEvaluationPage />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route path="home" element={<ManagerDashboard />} />
          <Route path="criteria" element={<ManagerCriteria />} />
          <Route path="jury" element={<ManagerJury />} />
          <Route path="applications/:id" element={<ManagerApplications />} />
          <Route path="jury-reports/:id" element={<ManagerJuryReports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
