import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseDetails, buyCourse } from "../utils/getapi"; // Import buyCourse function
import useAuthStore from "../store"; // Import auth store for token
import "./course.css";

const CourseComponent = () => {
  const { course_id } = useParams(); // Get course_id from URL
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!course_id) {
      navigate("/c/purchases"); // Redirect to another screen if no course_id
      return;
    }

    const fetchCourse = async () => {
      const data = await getCourseDetails(course_id);
      console.log(data);
      if (data.error || !data) {
        setError("You came here with a broken link.");
      } else {
        setCourse(data);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [course_id, navigate]);

  // Function to handle payment
  const handlePay = async () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      navigate("/c/login"); // Redirect if not logged in
      return;
    }

    try {
      const res = await buyCourse(course_id); // Call buyCourse function
      if (res.error) {
        throw new Error(res.error);
      }
      alert("Purchase successful!"); // Show success message
      navigate("/c/purchases"); // Redirect after purchase
    } catch (err) {
      alert(`Payment failed: ${err.message}`); // Show error message
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="course-container">
      {/* Course Title */}
      <h1 className="course-title">{course.title}</h1>

      {/* Course Description */}
      <div className="card">
        <h2>Description</h2>
        <p>{course.description}</p>
      </div>

      {/* Course Contents */}
      <div className="card">
        <h2>Course Contents</h2>
        <ul>
          {course.course_contents.split("\n").map((content, index) => (
            <li key={index}>{content}</li>
          ))}
        </ul>
      </div>

      {/* Payment Section */}
      <div className="pay-section">
        <button className="pay-button" onClick={handlePay}>
          Pay ₹{course.price} to Access
        </button>
      </div>
    </div>
  );
};

export default CourseComponent;
