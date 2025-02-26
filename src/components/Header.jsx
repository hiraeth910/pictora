import { Link } from "react-router-dom";
import useAuthStore from "../store";

const Header = () => {
  const { token, name, mobileNumber, logout } = useAuthStore();

  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {token ? (
          <>
            <span>Welcome, {name} ({mobileNumber})</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
