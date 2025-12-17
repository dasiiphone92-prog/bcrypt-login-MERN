// src/components/Header.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      <img
        src={logo}
        alt='לוגו גמ"ח נחלת דוד'
        className="small-logo"
        onClick={() => navigate("/")}
      />
      <button className="home-link" onClick={() => navigate("/")}>
        דף הבית
      </button>
    </header>
  );
}

export default Header;
