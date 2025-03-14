import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./auth/LoginPage";
import CustomNav from "./components/Navbar";
import AboutPage from "./components/Aboutpage";
import useAuthStore from "./store";
import PanDetailsForm from "./Screens/PanDetailsForm";
import CourseComponent from "./components/course";
import Header from "./components/Header";
import ConsumerLogin from "./auth/consumerlogin";
import UserCourses from "./components/UserCourses";
import Footer from "./components/Footer";
import PrivacyPolicy from "./rules/Privacy";
import TermsAndConditions from "./rules/Terms";
import RefundPolicy from "./rules/RefundPolicy";
import DataDeletionNotice from "./rules/Mailus";

const ProtectedLayout = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    width: isMobile ? "100%" : "65vw",
    position: isMobile ? "absolute" : "relative",
    left: isMobile ? "0" : "auto",
    marginTop: "50px",
    marginLeft: 'auto',
    marginRight: 'auto'
  };

  return (
    <div className="content-container">
      <Header />
      <div style={styles}>
        <Outlet /> {/* Renders child routes */}
      </div>
    </div>
  );
};

function AppWrapper() {
  const { role } = useAuthStore(); // Get role from Zustand store
  const navigate = useNavigate();

  // Redirect users based on role at app start
  useEffect(() => {
    const currentPath = window.location.pathname;

    // Exclude /c pages from automatic redirection
    if (!currentPath.startsWith("/c") && 
    !["/privacy-policy", "/terms&conditions", "/Refund-policy", "/About"].includes(currentPath)) {
      if (role === "wallet_user") {
        navigate("/home", { replace: true });
      } else if (role === "provider_user") {
        navigate("/get-verified", { replace: true });
      }
    }
  }, [role, navigate]);

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/login"
          element={
            role ? (
              <Navigate to={role === "wallet_user" ? "/home" : "/get-verified"} replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/" element={<AboutPage />} />
        <Route path='/About' element={<AboutPage/>}/>
        <Route
          path="/home"
          element={role === "wallet_user" ? <CustomNav /> : <Navigate to="/login" replace />}
        />
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/data-deletion' element={<DataDeletionNotice/>}/>
        <Route path='/terms&conditions' element={<TermsAndConditions/>}/>
        <Route path='/Refund-policy' element={<RefundPolicy/>}/>
        <Route
          path="/get-verified"
          element={role === "provider_user" ? <PanDetailsForm /> : <Navigate to="/login" replace />}
        />
        <Route path="/c" element={<ProtectedLayout />}>
          <Route path="courses/:course_id" element={<CourseComponent />} />
          <Route path="login" element={<ConsumerLogin />} />
          <Route path="purchases" element={<UserCourses />} />
          <Route path="*" element={<AboutPage />} />
        </Route>
      </Routes>
      <Footer /> {/* Footer added at the bottom */}
    </div>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <AppWrapper />
      </Router>
    </div>
  );
}

export default App;
