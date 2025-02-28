import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserCourses } from "../utils/getapi"; // Import API function
import colors from "../utils/colors"; // Import colors

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
const styles = {
  container: {
    left:isMobile&&'0',
    padding: "20px",
    background: colors.light,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
    color: colors.primary,
    fontSize: "24px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "400px",
    marginTop: "20px",
  },
  card: {
    padding: "15px",
    background: colors.accent,
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    textAlign: "center",
    transition: "0.3s",
    width: "100%",
    fontSize: "16px",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
  },
};

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await getUserCourses();
      if (result?.error) {
        setError(result.error);
      } else {
        console.log(result)
        setCourses(result);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Courses</h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.list}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.courseid}
              style={styles.card}
              onClick={() => navigate(`/c/courses/${course.courseid}`)}
            >
              <h3 style={styles.title}>{course.title}</h3>
            </div>
          ))
        ) : (
          !error && <p>No purchased courses found.</p>
        )}
      </div>
    </div>
  );
};


export default UserCourses;
