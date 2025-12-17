import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import BackButton from "../components/BackButton.jsx";

function CreateTeam() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    role: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/team", form);
      navigate("/teams", { replace: true });
    } catch (err) {
      console.error("Error creating team:", err);
      setError(err.response?.data?.message || "שגיאה בשמירת הקבוצה");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">הוספת קבוצה</h1>
      <BackButton to="/teams" />

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>שם</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>טלפון</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>אזור</label>
          <input name="area" value={form.area} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>תפקיד</label>
          <input name="role" value={form.role} onChange={handleChange} />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="btn" type="submit">
          שמירה
        </button>
      </form>
    </div>
  );
}

export default CreateTeam;
