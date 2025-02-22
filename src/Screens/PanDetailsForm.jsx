import  { useState } from "react";
import { Form, Input, Button, Upload, notification, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { addPan } from "../utils/endpoints";

const PanDetailsForm = () => {
  const [form] = Form.useForm();
  const [panImage, setPanImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // PAN Input Formatting - Enforce "ABCDE1234F" pattern
 const handlePanChange = (e) => {
  let value = e.target.value.toUpperCase();
  let formattedValue = "";

  for (let i = 0; i < value.length; i++) {
    if (i < 5) {
      // First 5 chars - Only Alphabets
      if (/[A-Z]/.test(value[i])) formattedValue += value[i];
    } else if (i >= 5 && i < 9) {
      // Next 4 chars - Only Numbers
      if (/[0-9]/.test(value[i])) formattedValue += value[i];
    } else if (i === 9) {
      // Last char - Only Alphabet
      if (/[A-Z]/.test(value[i])) formattedValue += value[i];
    }
  }

  // Ensure max length of 10 characters
  formattedValue = formattedValue.slice(0, 10);
  
  // Update state without losing cursor position
  form.setFieldsValue({ panNumber: formattedValue });
};


  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        pan: values.panNumber,
      };

      // Convert image to Base64 if uploaded
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

  const submitPanData = async (payload) => {
    try {
      const response = await addPan(payload);
      notification.success({
        message: "Success",
        description: response.data?.message || "PAN details submitted successfully!",
      });
      form.resetFields();
      setPanImage(null);
      setTimeout(() => (window.location.href = "/nextPage"), 1000);
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
          <h3 className="text-center mb-4">Submit PAN Details</h3>
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
                inputMode="text"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]"
                autoCapitalize="characters"
                autoComplete="off"
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
        </div>
      </div>
    </div>
  );
};

export default PanDetailsForm;
