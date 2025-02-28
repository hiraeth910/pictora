import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaInfoCircle, FaShieldAlt, FaFileContract, FaUndo } from "react-icons/fa"; // Importing icons

const Footer = () => {
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => setIsMobile(window.innerWidth <= 768));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => setIsMobile(window.innerWidth <= 768));
    };
  }, []);

  return (
    <footer className={`footer ${visible ? "visible" : "hidden"}`}>
      <div className="footer-links">
        {isMobile ? (
          // Show only icons on mobile
          <div className="footer-icons">
            <Link to="/About" title="About"><FaInfoCircle /></Link>
            <Link to="/privacy-policy" title="Privacy Policy"><FaShieldAlt /></Link>
            <Link to="/terms&conditions" title="Terms & Conditions"><FaFileContract /></Link>
            <Link to="/Refund-policy" title="Refund Policy"><FaUndo /></Link>
          </div>
        ) : (
          // Show text links on desktop
          <ul className="footer-list">
            <li><Link to="/About">About</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms&conditions">Terms & Conditions</Link></li>
            <li><Link to="/Refund-policy">Refund Policy</Link></li>
          </ul>
        )}
      </div>
      <p>© 2025 Pictora. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
