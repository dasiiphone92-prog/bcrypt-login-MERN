
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";

function Login() {
  // Load saved email from localStorage on component mount
  const [email, setEmail] = useState(() => {
    return localStorage.getItem("adminEmail") || "";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/users/login", { email, password });
      localStorage.setItem("token", data.token);
      // Save admin email to localStorage (not password)
      localStorage.setItem("adminEmail", email);
      navigate("/admin");
    } catch (err) {
      setError("סיסמה או אימייל שגויים");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">אזור מנהל</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>אימייל:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>סיסמה:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn">כניסה</button>
      </form>
    </div>
  );
}

export default Login;
