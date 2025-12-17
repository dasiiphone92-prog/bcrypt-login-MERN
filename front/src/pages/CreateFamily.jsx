
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import BackButton from "../components/BackButton.jsx";

function CreateFamily() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    phone: "",
    people: "",
    kids: "",
    team: "",
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
      await api.post("/families", form);
      navigate("/families", { replace: true });
    } catch (err) {
      console.error("Error creating family:", err);
      setError(err.response?.data?.message || "שגיאה בשמירת המשפחה");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">הוספת משפחה</h1>
      <BackButton to="/families" />

      <form onSubmit={handleSubmit} className="form-card">

        <div className="form-group">
          <label>שם פרטי</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>שם משפחה</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>טלפון</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>מספר נפשות</label>
          <input
            type="number"
            name="people"
            value={form.people}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>ילדים עד גיל 18</label>
          <input
            type="number"
            name="kids"
            value={form.kids}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>מחליק / קבוצה</label>
          <input
            type="text"
            name="team"
            value={form.team}
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

export default CreateFamily;
