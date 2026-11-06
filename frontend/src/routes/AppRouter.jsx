import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ReportIssue from "../pages/ReportIssue";
import TrackComplaint from "../pages/TrackComplaint";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AccessChoice from "../pages/AccessChoice";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AdminComplaintDetails from "../pages/AdminComplaintDetails";
import ComplaintDetails from "../pages/ComplaintDetails";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/access" element={<AccessChoice />} />
        <Route path="/login" element={<AccessChoice initialView="citizen" />} />
        <Route path="/register" element={<AccessChoice />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaint/:id" element={<AdminComplaintDetails />} />
        <Route path="/complaints/:id" element={<ComplaintDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/track" element={<TrackComplaint />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;