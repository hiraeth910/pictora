import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate,Outlet } from "react-router-dom";
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
    marginLeft:'auto',
    marginRight:'auto'
  };

  return (
    <div>
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
  if (!currentPath.startsWith("/c")) {
    if (role === "wallet_user") {
      navigate("/home", { replace: true });
    } else if (role === "provider_user") {
      navigate("/get-verified", { replace: true });
    }
  }
}, [role, navigate]);

  return (
    <Routes>
      {/* Prevent logged-in users from accessing /login */}
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
<Route path='/' element={<AboutPage/>}/>
      {/* Home Route (Only Wallet Users) */}
      <Route
        path="/home"
        element={role === "wallet_user" ? <CustomNav /> : <Navigate to="/login" replace />}
      />

      {/* Get Verified Route (Only Provider Users) */}
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
      {/* Redirect unknown paths */}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
