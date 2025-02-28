import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getpaidcourse, buyCourse, getCourseDetails } from "../utils/getapi"; // Updated API function
import useAuthStore from "../store"; // Zustand store
import "./course.css";

const CourseComponent = () => {
  const { course_id } = useParams();
  const { token } = useAuthStore(); // Get token from Zustand store
  const [course, setCourse] = useState(null);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!course_id) return;

    const fetchCourse = async () => {
      try {
        if (!token) {
          setIsPurchased(false)
          const res = await getCourseDetails(course_id);
          if (res.error) {
          setError(res.error);
        } else {
          setCourse(res);
        }
          setLoading(false);
          return;
        }

        const data = await getpaidcourse(course_id, token);
        console.log(data);

        if (data.error) {
          setError(data.error);
        } else {
          setIsPurchased(data.isPurchased);
          setCourse(data.course);
        }
      } catch (err) {
        setError("Failed to load course details.");
      }
      setLoading(false);
    };

    fetchCourse();
  }, [course_id, token]);

  // Function to handle payment
  const handlePay = async () => {
    if (!token) {
      navigate('/c/login')
      return}

    try {
      const res = await buyCourse(course_id);
      if (res.error) throw new Error(res.error);

      alert("Purchase successful!");
      window.location.reload(); // Reload page after successful payment
    } catch (err) {
      alert(`Payment failed: ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="course-container">
      <h1 className="course-title">{course?.title}</h1>

      <div className="card" >
        <h2>Description</h2>
        <p>{course?.description}</p>
      </div>

      <div className="card">
        <h2>Course Contents</h2>
        <ul>
          {course?.course_contents?.split("\n").map((content, index) => (
            <li key={index}>{content}</li>
          ))}
        </ul>
      </div>

      {/* If course is purchased, show videos; otherwise, show payment button */}
      {isPurchased ? (
        <div className="card">
          <h2>Course Videos</h2>
          <ul>
            {course?.videos?.map((video, index) => (
              <li key={index}>
                <video controls width="100%">
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p>{video.title}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="pay-section">
          <button className="pay-button" onClick={handlePay}>
            Pay ₹{course?.price} to Access
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
