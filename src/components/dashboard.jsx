import  { useState } from "react";
import PropTypes from "prop-types";
import {
  Navbar,
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { FaArrowLeft ,FaTrash} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { createCourse } from "../utils/getapi";

// Custom shared input style
const inputStyle = {
  backgroundColor: "#E4F9F5",
  borderColor: "#ccc",
  color: "#333",
  padding: "10px",
  borderRadius: "4px",
};

// OptionsGrid component: displays the two grid options
const OptionsGrid = ({ onSelect }) => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card onClick={() => onSelect("create-course")} className="hover-card" style={{ cursor: "pointer" }}>
            <Card.Body>
              <Card.Title>Create Course</Card.Title>
              <Card.Text>
                Build and sell your course with our easy-to-use tools.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-4">
          <Card onClick={() => onSelect("sell-image")} className="hover-card" style={{ cursor: "pointer" }}>
            <Card.Body>
              <Card.Title>Sell Image</Card.Title>
              <Card.Text>
                Upload and sell your digital images to a broad audience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

OptionsGrid.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

// CreateCourse component: shows an appbar with back arrow and the form for creating a course
const CreateCourse = ({ onBack ,onsuccess}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseContents, setCourseContents] = useState("");
  const [price, setPrice] = useState("");
  const [videos, setVideos] = useState([]);
const removeVideo = (index) => {
  const updatedVideos = [...videos];
  updatedVideos.splice(index, 1); // Remove the video at the specified index
  setVideos(updatedVideos);
};
  // Helper function to convert a File to a base64 string
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const addVideo = () => {
    setVideos([...videos, { title: "", file: null, description: "" }]);
  };

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = { ...updatedVideos[index], [field]: value };
    setVideos(updatedVideos);
  };

  const handleFileChange = async (index, file) => {
    const base64 = await convertFileToBase64(file);
    const updatedVideos = [...videos];
    updatedVideos[index] = {
      ...updatedVideos[index],
      file: file,
      base64, // store the base64 string
    };
    setVideos(updatedVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build videos payload after converting files to base64
    const videoPayloads = await Promise.all(
      videos.map(async (video) => ({
        title: video.title,
        file: video.base64 || "",
        fileName: video.file ? video.file.name : "",
        mimetype: video.file ? video.file.type : "",
        description: video.description,
      }))
    );

    const payload = {
      title,
      description,
      course_contents: courseContents,
      price: parseFloat(price),
      videos: videoPayloads,
    };
   const res = await createCourse(payload)
   if (res){
return onsuccess('Your products')   }
   else{alert('something went wrong ')}
  };

  return (
    <>
      {/* Appbar with back arrow */}
      <Navbar bg="light" variant="light" className="mb-3">
        <Container>
          <Button variant="link" onClick={onBack}>
            <FaArrowLeft /> Go to Menu
          </Button>
          <Navbar.Brand>Create Course</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="formTitle">
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Course Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  style={inputStyle}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={inputStyle}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCourseContents">
            <Form.Label>Course Contents</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="e.g. 1. Components 2. State 3. Props"
              value={courseContents}
              onChange={(e) => setCourseContents(e.target.value)}
              required
              style={inputStyle}
            />
          </Form.Group>
          <hr />
         <h5>Videos</h5>
{videos.map((video, index) => (
  <div key={index} className="mb-3 p-3 border rounded position-relative">
    <Row className="mb-2">
      <Col xs={12} md={6}>
        <Form.Group controlId={`videoTitle${index}`}>
          <Form.Label>Video Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Video Title"
            value={video.title}
            onChange={(e) =>
              handleVideoChange(index, "title", e.target.value)
            }
            required
            style={inputStyle}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={6}>
        <Form.Group controlId={`videoFile${index}`}>
          <Form.Label>Video File</Form.Label>
          <Form.Control
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(index, e.target.files[0])}
            required
            style={inputStyle}
          />
        </Form.Group>
      </Col>
    </Row>
    <Form.Group controlId={`videoDesc${index}`}>
      <Form.Label>Video Description</Form.Label>
      <Form.Control
        as="textarea"
        rows={2}
        placeholder="Video Description"
        value={video.description}
        onChange={(e) =>
          handleVideoChange(index, "description", e.target.value)
        }
        required
        style={inputStyle}
      />
    </Form.Group>
    
    {/* Delete Button */}
    <Button
      variant="outline-danger"
      size="sm"
      className="position-absolute top-0 end-0 m-2"
      onClick={() => removeVideo(index)}
    >
      <FaTrash />
    </Button>
  </div>
))}
          <Button variant="outline-primary" onClick={addVideo} className="mb-3">
            + Add Video
          </Button>
          <div className="d-grid">
            <Button variant="primary" type="submit">
              Create Course
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

CreateCourse.propTypes = {
  onBack: PropTypes.func.isRequired,
};
CreateCourse.propTypes = {
  onsuccess: PropTypes.func.isRequired,
};

// Placeholder SellImage component
const SellImage = ({ onBack }) => {
  return (
    <>
      <Navbar bg="light" variant="light" className="mb-3">
        <Container>
          <Button variant="link" onClick={onBack}>
            <FaArrowLeft /> Go to Menu
          </Button>
          <Navbar.Brand>Sell Image</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <h3>Sell Image functionality coming soon...</h3>
      </Container>
    </>
  );
};

SellImage.propTypes = {
  onBack: PropTypes.func.isRequired,
};

// Parent component that switches between the options grid and the chosen view
const MarketplaceDashboard = ({ onAction }) => {
  // activeView can be "menu", "create-course", or "sell-image"
  const [activeView, setActiveView] = useState("menu");

  const renderView = () => {
    if (activeView === "create-course") {
      return <CreateCourse onBack={() => setActiveView("menu")} onsuccess={onAction} />;
    } else if (activeView === "sell-image") {
      return <SellImage onBack={() => setActiveView("menu")} />;
    } else {
      return <OptionsGrid onSelect={(option) => setActiveView(option)} />;
    }
  };

  return <div>{renderView()}</div>;
};

MarketplaceDashboard.propTypes = {
  onAction: PropTypes.func.isRequired, // Ensuring function is passed
};


export default MarketplaceDashboard;
