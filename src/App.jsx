import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate,Outlet } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import LoginPage from "./auth/LoginPage";
import CustomNav from "./components/Navbar";
import AboutPage from "./components/Aboutpage";
import useAuthStore from "./store";
import PanDetailsForm from "./Screens/PanDetailsForm";
import CourseComponent from "./components/course";
import Header from "./components/Header";
import ConsumerLogin from "./auth/consumerlogin";

const ProtectedLayout = () => {
  return (
    <div>
      <Header/>
      <Outlet /> {/* This renders child routes like /c/courses/:course_id */}
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
          <Route path="login" element={<AboutPage />} />
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
