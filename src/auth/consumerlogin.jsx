import { useEffect, useState } from "react";
import { Modal, Input, Button } from "antd";
import useAuthStore from "../store";
import { useNavigate } from "react-router-dom";
import { getUser, updateDetails } from "../utils/getapi";

const ConsumerLogin = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  const setAuth = useAuthStore((state) => state.setAuth);
  const { providerToken, name, mobileNumber, role, token, consumerName } = useAuthStore.getState();
  const [t,setT] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    if (!document.getElementById("otpless-sdk")) {
      const script = document.createElement("script");
      script.id = "otpless-sdk";
      script.type = "text/javascript";
      script.src = "https://otpless.com/v4/auth.js";
      script.setAttribute("data-appid", "6VJPMFZXBL47ZICHAF4S");

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

          phoneNumber = phoneNumber.slice(2);
          setUserPhone(phoneNumber); // Store phone number for later
        localStorage.setItem("phone", phoneNumber);

          console.log("Processed Phone Number:", phoneNumber);

          // API Call to get user token
          const apiResponse = await getUser(phoneNumber);

          if (apiResponse.status === 200) {
            const { token: tokx, name: cn } = apiResponse.data;
            setT(tokx)
            if (!cn) {
              // Name is null, show modal to enter name
              setIsModalOpen(true);
            } else {
              // Name is available, proceed with login
              setAuth(providerToken, name, mobileNumber, role, tokx, cn);
              navigate(-1);
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

  // Handle name submission
  const handleSubmitName = async () => {
    if (!newName.trim()) {
      return;
    }
    try {
      const res = await updateDetails(newName, userPhone);
      if (res === "y") {
        setAuth(providerToken, name, mobileNumber, role, t, newName);
        setIsModalOpen(true);
        navigate(-1);
      } else {
        console.error("Failed to update name");
      }
    } catch (err) {
      console.error("Error updating name:", err);
    }
  };

  return (
    <div className="login-container" style={{ width: isMobile ? "100%" : "auto" }}>
      <div id="otpless-login-page"></div> {/* OTPLESS UI loads here */}

      {/* Modal for entering name */}
      <Modal
        title="Please Enter Your Name for Login"
        open={isModalOpen}
        footer={null}
        closable={false}
        maskClosable={false}
      >
        <Input
          placeholder="Enter your name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button type="primary" onClick={handleSubmitName} style={{ marginTop: 10, width: "100%" }}>
          Submit
        </Button>
      </Modal>
    </div>
  );
};

export default ConsumerLogin;
