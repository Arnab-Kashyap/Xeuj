import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ReportIssue from "../pages/ReportIssue";
import TrackComplaint from "../pages/TrackComplaint";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminComplaintDetails from "../pages/AdminComplaintDetails";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route
          path="/admin/complaint/:id"
          element={<AdminComplaintDetails />}
        />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login/*" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
