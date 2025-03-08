import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import LandingPage from "./STUDENT/LandingPage";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<div>About Us Page (Coming Soon)</div>} />
          <Route path="/career" element={<div>Career Page (Coming Soon)</div>} />
          <Route path="/contact-us" element={<div>Contact Us Page (Coming Soon)</div>} />
          <Route path="/login" element={<div>Login Page (Coming Soon)</div>} />
          <Route path="/sign-up" element={<div>Sign Up Page (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}
