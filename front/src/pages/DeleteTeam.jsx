import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import BackButton from "../components/BackButton.jsx";

function DeleteTeam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");
    try {
      await api.delete(`/team/${id}`);
      navigate("/teams", { replace: true });
    } catch (err) {
      console.error("Error deleting team:", err);
      setError(err.response?.data?.message || "שגיאה במחיקת הקבוצה");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">מחיקת קבוצה</h1>
      <BackButton to="/teams" />

      <div className="form-card">
        <p>האם את בטוחה שברצונך למחוק את הקבוצה?</p>

        {error && <div className="error-message">{error}</div>}

        <button className="btn btn--danger" onClick={handleDelete}>
          כן, למחוק
        </button>
      </div>
    </div>
  );
}

export default DeleteTeam;
