import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";

function TeamLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Simple frontend-only validation with fixed credentials
  // Only one specific email and password combination is allowed
  const FIXED_EMAIL = "teamlogin@gmail.com";
  const FIXED_PASSWORD = "teamsuper";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Simple client-side validation
    if (!email || !password) {
      setError("אנא מלאי את כל השדות");
      return;
    }

    // Check if email matches the fixed email
    if (email.toLowerCase().trim() !== FIXED_EMAIL.toLowerCase().trim()) {
      setError("אימייל שגוי. אנא נסי שוב.");
      return;
    }

    // Check if password matches the fixed password
    if (password !== FIXED_PASSWORD) {
      setError("סיסמה שגויה. אנא נסי שוב.");
      return;
    }

    // If validation passes, redirect to shopping list
    // This is frontend-only, no backend validation
    navigate("/shop");
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">התחברות חבר צוות</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>אימייל:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="הכנסי את האימייל שלך"
          />
        </div>

        <div className="form-group">
          <label>סיסמה:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="הכנסי את הסיסמה שלך"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="btn">
          כניסה
        </button>
      </form>
    </div>
  );
}

export default TeamLogin;

