import { useState } from "react";
import Profile from "./profile";
import colors from "../utils/colors";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import './Navbar.css'
import MarketplaceDashboard from "./dashboard";
const CustomNav = () => {
  const [activeTab, setActiveTab] = useState("Sell Product");
  const [isOpen, setIsOpen] = useState(false);
const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
const styles = {
  background: colors.accent,
  width: isMobile ? "100%" : "65%",
minWidth:'720px',
  marginRight:'auto',
  marginLeft:'auto'
};

  const tabs = ["Sell product", "Your products", "Wallet", "Profile"];

  return (
    <div style={styles}>
      {/* Navbar fixed on top */}
      <Navbar
        expand="md"
        expanded={isOpen}
        onToggle={(expanded) => setIsOpen(expanded)}
style={styles}
        variant="dark"
        fixed="top"
        
      >
        <Container fluid>
          <Navbar.Brand className="text-white">My App</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="w-100">
              {tabs.map((tab) => (
                <Nav.Link
                  key={tab}
                  className={`nav-link ${activeTab === tab ? "active" : ""}`}
                  style={{
                    color: activeTab === tab ? colors.light : colors.primary,
                    background: activeTab === tab ? colors.secondary : "transparent",
                    borderRadius: "5px",
                    padding: "10px 15px",
                  }}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsOpen(false); // Close menu when an option is selected
                  }}
                >
                  {tab}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Content (with top padding to prevent being hidden under fixed navbar) */}
      <div style={{ marginTop: "50px",width:'100%', backgroundColor:colors.light}}>
        {activeTab === "Profile" && <Profile />}
        {activeTab === "Sell product" && (
         <MarketplaceDashboard/>
        )}
        {activeTab === "Your products" && (
          <div className="text-center">Your Courses Component</div>
        )}
        {activeTab === "Wallet" && (
          <div className="text-center">Wallet Details</div>
        )}
      </div>

      
    </div>
  );
};

export default CustomNav;
