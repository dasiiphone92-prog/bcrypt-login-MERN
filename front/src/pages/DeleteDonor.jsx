// src/pages/DeleteDonor.jsx
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import BackButton from "../components/BackButton.jsx";
import { useState } from "react";

function DeleteDonor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");

    try {
      await api.delete(`/donors/${id}`);
      navigate("/donors", { replace: true });
    } catch (err) {
      console.error("Error deleting donor:", err);
      setError(err.response?.data?.message || "שגיאה במחיקת התורם");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">מחיקת תורם</h1>
      <BackButton to="/donors" />

      <div className="form-card">
        <p>האם את בטוחה שברצונך למחוק את התורם?</p>
        {error && <div className="error-message">{error}</div>}
        <button className="btn btn--danger" onClick={handleDelete}>
          כן, למחוק
        </button>
      </div>
    </div>
  );
}

export default DeleteDonor;
