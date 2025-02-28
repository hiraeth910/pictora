import { useEffect, useState } from "react";
import { fetchCourses } from "../utils/getapi";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCourseId, setCopiedCourseId] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const data = await fetchCourses();
      setCourses(data);
      setLoading(false);
    };

    loadCourses();
  }, []);
  const handleCopyLink = (courseId) => {
    const courseLink = `https://pictora.in/c/courses/${courseId}`;
    navigator.clipboard.writeText(courseLink).then(() => {
      setCopiedCourseId(courseId);
      setTimeout(() => setCopiedCourseId(null), 2000); // Reset after 2 seconds
    });
  };
  return (
    <div className="container mt-4">
      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div key={course.course_id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text text-muted">{course.description.slice(0, 100)}...</p>
                 <button
          key={course.course_id}
          onClick={() => handleCopyLink(course.course_id)}
          className="btn btn-primary w-100"
        >
          {copiedCourseId === course.course_id ? "Copied!" : "Copy Selling Link"}
        </button>
                  <p className="mt-2 text-muted">
                    <strong>Subscribers:</strong> {course.subs} <br />
                    <strong>Earnings:</strong> ₹{course.earnings.toFixed(2)}
                  </p>
                  <p className="text-muted small">Subscribers count may take time to update. Try refreshing.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
