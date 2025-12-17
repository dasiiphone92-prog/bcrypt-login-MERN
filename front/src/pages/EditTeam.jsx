import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import BackButton from "../components/BackButton.jsx";
import Loader from "../components/Loader.jsx";

function EditTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTeam() {
      try {
        const { data } = await api.get(`/team/${id}`);
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          area: data.area || "",
          role: data.role || "",
        });
      } catch (err) {
        console.error("Error loading team:", err);
        setError(err.response?.data?.message || "שגיאה בטעינת הקבוצה");
      } finally {
        setLoading(false);
      }
    }

    loadTeam();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.put(`/team/${id}`, form);
      navigate("/teams", { replace: true });
    } catch (err) {
      console.error("Error updating team:", err);
      setError(err.response?.data?.message || "שגיאה בשמירת השינויים");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">עריכת קבוצה</h1>
      <BackButton to="/teams" />

      {loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}

export default EditTeam;
