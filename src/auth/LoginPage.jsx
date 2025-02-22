import { useEffect } from "react";
import useAuthStore from "../store";
import { apiClient, endpoints } from "../utils/endpoints";
const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Extract payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
const LoginPage = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (!document.getElementById("otpless-sdk")) {
      const script = document.createElement("script");
      script.id = "otpless-sdk";
      script.type = "text/javascript";
      script.src = "https://otpless.com/v4/auth.js";
      script.setAttribute("data-appid", "DOA43V9OYR3TNFU9R08V"); // Replace with actual App ID

      script.onload = () => console.log("OTPLESS SDK Loaded");
      script.onerror = () => console.error("Failed to load OTPLESS SDK");

      document.head.appendChild(script);
    }

    window.otpless = async (response) => {
      try {
        if (response?.identities?.length > 0) {
          let phoneNumber = response.identities.find(
            (identity) => identity.identityType === "MOBILE"
          )?.identityValue;

          if (!phoneNumber || phoneNumber.length < 3) {
            console.error("Invalid phone number");
            return;
          }

          // Ignore first two digits
          phoneNumber = phoneNumber.slice(2);

          console.log("Processed Phone Number:", phoneNumber);

          // API Call to get user token
          const apiResponse = await apiClient.post(endpoints.providerlogin, {
            phone: phoneNumber,
            web: true,
          });

          if (apiResponse.status === 200) {
            const { token } = apiResponse.data;

            if (token) {
              // Decode JWT to extract role
 const decodedToken = decodeJWT(token);
               const { role } = decodedToken;
              

              // Store in localStorage
              localStorage.setItem("token", token);
              localStorage.setItem("mobileNumber", phoneNumber);
              localStorage.setItem("role", role);

              // Update Zustand store
              setAuth(token,null,  phoneNumber,role);

              console.log("User authenticated successfully with role:", role);
            }
          }
        } else {
          console.error("Invalid OTPLESS response format");
        }
      } catch (error) {
        console.error("Error verifying phone number:", error);
      }
    };
  }, [setAuth]);

  return (
    <div className="login-container">
      <h2>Login with OTPLESS</h2>
      <div id="otpless-login-page"></div> {/* OTPLESS UI loads here */}
    </div>
  );
};

export default LoginPage;
