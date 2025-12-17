// src/pages/EditDonor.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import BackButton from "../components/BackButton.jsx";
import Loader from "../components/Loader.jsx";

function EditDonor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    city: "",
    phone: "",
    amount: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDonor() {
      try {
        const { data } = await api.get(`/donors/${id}`);
        setForm({
          name: data.name || "",
          city: data.city || "",
          phone: data.phone || "",
          amount: data.amount || "",
        });
      } catch (err) {
        console.error("Error loading donor:", err);
        setError(err.response?.data?.message || "שגיאה בטעינת התורם");
      } finally {
        setLoading(false);
      }
    }

    fetchDonor();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api.put(`/donors/${id}`, form);
      navigate("/donors", { replace: true });
    } catch (err) {
      console.error("Error updating donor:", err);
      setError(err.response?.data?.message || "שגיאה בשמירת השינויים");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">עריכת תורם</h1>
      <BackButton to="/donors" />

      {loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
}

export default EditDonor;
