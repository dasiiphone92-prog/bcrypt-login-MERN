// src/pages/CreateDonor.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import BackButton from "../components/BackButton.jsx";

function CreateDonor() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    amount: "",
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
      await api.post("/donors", form);
      navigate("/donors", { replace: true });
    } catch (err) {
      console.error("Error creating donor:", err);
      setError(err.response?.data?.message || "שגיאה בשמירת התורם");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">הוספת תורם</h1>
      <BackButton to="/donors" />

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>שם</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>עיר</label>
          <input name="city" value={form.city} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>טלפון</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>סכום קבוע</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="btn" type="submit">
          שמירה
        </button>
      </form>
    </div>
  );
}

export default CreateDonor;
