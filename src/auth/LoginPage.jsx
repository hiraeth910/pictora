import { useEffect } from "react";
import {jwt_decode} from "jwt-decode";
import useAuthStore from "../store";
import { apiClient, endpoints } from "../utils/endpoints";

const LoginPage = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (!document.getElementById("otpless-sdk")) {
      const script = document.createElement("script");
      script.id = "otpless-sdk";
      script.type = "text/javascript";
      script.src = "https://otpless.com/v4/auth.js";
      script.setAttribute("data-appid", "6VJPMFZXBL47ZICHAF4S"); // Replace with actual App ID

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
              const decodedToken = jwt_decode(token);
              const { userId } = decodedToken;
              const role =
                userId.length === 36 ? "wallet_user" : "provider_user";

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
