import { useState } from "react";
import  { Dashboar } from "./profile";
import colors from "../utils/colors";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import './Navbar.css'
import MarketplaceDashboard from "./dashboard";
import CourseList from "./courses";
import WalletWithdrawal from "./wallet";
const CustomNav = () => {
  const [activeTab, setActiveTab] = useState("Sell product");
  const [isOpen, setIsOpen] = useState(false);
const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
const styles = {
  width: isMobile ? "100%" : "77.5%",
  minWidth: isMobile ? "auto" : "720px",
  margin: "0 auto", // Centers the navbar
  display: "flex", // Enables flexbox for child divs
  flexDirection: isMobile ? "column" : "row", // Stack items vertically on mobile
  alignItems: "center", // Centers items vertically
  justifyContent: isMobile ? "center" : "flex-start", // Aligns inner divs
  padding: "10px", // Add some spacing inside
};
const styles1 = {
  background: colors.accent,
  width: isMobile ? "100%" : "65%",
  minWidth: isMobile ? "auto" : "720px",
  margin: "0 auto", // Centers the navbar
  display: "flex", // Enables flexbox for child divs
  flexDirection: isMobile ? "column" : "row", // Stack items vertically on mobile
  alignItems: "center", // Centers items vertically
  justifyContent: isMobile ? "center" : "flex-start", // Aligns inner divs
  padding: "10px", // Add some spacing inside
};

const styles2 = {
  marginTop:isMobile?'20px':'40px',
  width:isMobile?'125%':'100%',
  background: colors.light,
  positon:isMobile?'absolute':'relative',
  right:isMobile&&"0"
};

  const tabs = ["Sell product", "Your products", "Wallet", "Profile"];
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); // Close menu when an option is selected
  };
  return (
    <div style={styles}>
      {/* Navbar fixed on top */}
      <Navbar
        expand="md"
        expanded={isOpen}
        onToggle={(expanded) => setIsOpen(expanded)}
style={styles1}
        variant="dark"
        fixed="top"
        
      >
        <Container fluid>
          <Navbar.Brand className="text-white">Pictora</Navbar.Brand>
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
      <div style={styles2}>
        {activeTab === "Profile" && <Dashboar />}
        {activeTab === "Sell product" && (
         <MarketplaceDashboard onAction={handleTabChange}/>
        )}
        {activeTab === "Your products" && (
          <CourseList/>
        )}
        {activeTab === "Wallet" && (
          <WalletWithdrawal/>
        )}
      </div>

      
    </div>
  );
};

export default CustomNav;
