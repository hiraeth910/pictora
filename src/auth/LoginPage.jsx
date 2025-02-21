import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    // Check if OTPLESS script is already added
    if (!document.getElementById("otpless-sdk")) {
      const script = document.createElement("script");
      script.id = "otpless-sdk";
      script.type = "text/javascript";
      script.src = "https://otpless.com/v4/auth.js";
      script.setAttribute("data-appid", "DOA43V9OYR3TNFU9R08V"); // Replace with actual App ID

      script.onload = () => {
        console.log("OTPLESS SDK Loaded");
      };

      script.onerror = () => {
        console.error("Failed to load OTPLESS SDK");
      };

      document.head.appendChild(script);
    }

    // Define the global callback function for OTPLESS response
    window.otpless = (response) => {
      console.log("User Authenticated:", response);
      // Handle authentication response (store user data, navigate, etc.)
    };
  }, []);

  return (
    <div className="login-container">
      <h2>Login with OTPLESS</h2>
      <div id="otpless-login-page"></div> {/* OTPLESS UI loads here */}
    </div>
  );
};

export default LoginPage;
