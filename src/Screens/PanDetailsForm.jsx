import { useEffect, useState } from "react";
import { Form, Input, Button, Upload, notification, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { addPan, apiClient, endpoints } from "../utils/endpoints";
import { getPanVerification } from "../utils/getapi";
import { decodeJWT } from "../utils/decodeJWT";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store";

const PanDetailsForm = () => {
  const [form] = Form.useForm();
  const [panImage, setPanImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [panStatus, setPanStatus] = useState(null);
  const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

  // Function to check PAN status every 30 seconds
  useEffect(() => {
    const fetchPanStatus = async () => {
      try {
        const response = await getPanVerification();
        console.log("PAN Status:", response);
        setPanStatus(response.status);

        if (response.status === "verified") {
          localStorage.setItem("providerName", response.providerName || ""); 
          await handleProviderLogin();
        }
      } catch (error) {
        console.error("Error fetching PAN status:", error);
      }
    };

    fetchPanStatus(); // Initial call
    const interval = setInterval(fetchPanStatus, 30000); // Poll every 30 sec

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to call provider login when PAN is verified
  const handleProviderLogin = async () => {
    try {
      const phoneNumber = localStorage.getItem("mobileNumber");

      const apiResponse = await apiClient.post(endpoints.providerlogin, {
        phone: phoneNumber,
        web: true,
      });

      if (apiResponse.status === 200) {
        const { token } = apiResponse.data;
        if (token) {
          const decodedToken = decodeJWT(token);
          const { role } = decodedToken;

          localStorage.setItem("providerToken", token);
          localStorage.setItem("role", role);

          setAuth(token, null, phoneNumber, role, null);

          if (role === "wallet_user") {
            navigate("/home");
          }
        }
      }
    } catch (error) {
      console.error("Provider login failed:", error);
    }
  };

  // PAN Input Formatting - Enforce "ABCDE1234F" pattern
  const handlePanChange = (e) => {
    let value = e.target.value.toUpperCase();
    let formattedValue = value.replace(/[^A-Z0-9]/g, "").slice(0, 10);
    form.setFieldsValue({ panNumber: formattedValue });
  };

  // Form Submit Handler
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = { name: values.name, pan: values.panNumber };

      // Convert image to Base64
      if (panImage) {
        const reader = new FileReader();
        reader.readAsDataURL(panImage);
        reader.onloadend = async () => {
          payload.image = reader.result;
          await submitPanData(payload);
        };
      } else {
        await submitPanData(payload);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Submit PAN Data
  const submitPanData = async (payload) => {
    try {
      const response = await addPan(payload);
      notification.success({
        message: "Success",
        description: response.data?.message || "PAN details submitted successfully!",
      });

      localStorage.setItem("providerName", payload.name); // Store name
      form.resetFields();
      setPanImage(null);
      setTimeout(() => window.location.reload(), 1000); // Refresh page
    } catch (error) {
      handleError(error);
    }
  };

  // Error Handling
  const handleError = (error) => {
    notification.error({
      message: "Submission Failed",
      description: error?.response?.data?.message || "Something went wrong. Please try again.",
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-12 p-4 shadow-lg rounded bg-white">
          <h3 className="text-center mb-4">
            {panStatus === "pending" ? "Verification in Progress" : "Submit PAN Details"}
          </h3>

          {panStatus === "pending" ? (
            <p className="text-center">
              We have received your details and will update you soon.
            </p>
          ) : (
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Name as per PAN"
                name="name"
                rules={[{ required: true, message: "Please enter your name as per PAN" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="PAN Number"
                name="panNumber"
                rules={[
                  { required: true, message: "Please enter your PAN number" },
                  { len: 10, message: "PAN number must be 10 characters" },
                  { pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/, message: "Invalid PAN format" },
                ]}
              >
                <Input
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  onChange={handlePanChange}
                  autoCapitalize="characters"
                />
              </Form.Item>

              <Form.Item
                label="Upload PAN Image"
                name="panImage"
                rules={[{ required: true, message: "Please upload an image of your PAN" }]}
              >
                <Upload
                  name="panImage"
                  listType="picture"
                  maxCount={1}
                  beforeUpload={(file) => {
                    setPanImage(file);
                    return false;
                  }}
                  onRemove={() => setPanImage(null)}
                >
                  <Button icon={<UploadOutlined />}>Select Image</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  {loading ? <Spin /> : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanDetailsForm;
