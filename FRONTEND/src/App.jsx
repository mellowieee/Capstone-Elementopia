import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./STUDENT/LandingPage";
import LoginCard from "./STUDENT/login-card";
import RegisterCard from "./STUDENT/register-card";
import AboutUs from "./STUDENT/about-us";
import PageLayout from "./components/PageLayout";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/career" element={<div>Career Page (Coming Soon)</div>} />
          <Route path="/contact-us" element={<div>Contact Us Page (Coming Soon)</div>} />
          <Route path="/login" element={<LoginCard />} />
          <Route path="/sign-up" element={<RegisterCard />} />
          <Route path="/page-layout" element={<PageLayout/>} />
        </Routes>
    </Router>
  );
}
