import  { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap"; // Bootstrap dropdown
import colors from "../utils/colors";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import useAuthStore from "../store";

const Header = () => {
  const { consumerName, consumerLogout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    consumerLogout();
    setShowDropdown(false);
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>Pictora</h1>
      <div style={styles.profileContainer}>
        {consumerName ? (
          <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
            <Dropdown.Toggle as="div" style={styles.icon} onClick={() => setShowDropdown(!showDropdown)}>
              <i className="bi bi-person-circle" style={styles.profileIcon}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item as={Link} to="/c/purchases">
                Purchases
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to="/c/login" style={styles.icon}>
            <i className="bi bi-box-arrow-in-right" style={styles.profileIcon}></i>
          </Link>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: colors.accent,
    color: colors.primary,
    position: "absolute",
    top: 0,
    left:0,
    
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  profileIcon: {
    fontSize: "24px",
    color: colors.primary,
  },
};

export default Header;
