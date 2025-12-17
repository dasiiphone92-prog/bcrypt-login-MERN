import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import BackButton from "../components/BackButton.jsx";

function DeleteFamily() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");
    try {
      await api.delete(`/families/${id}`);
      navigate("/families", { replace: true });
    } catch (err) {
      console.error("Error deleting family:", err);
      setError(err.response?.data?.message || "שגיאה במחיקת המשפחה");
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">מחיקת משפחה</h1>
      <BackButton to="/families" />

      <div className="form-card">
        <p>האם את בטוחה שברצונך למחוק את המשפחה?</p>

        {error && <div className="error-message">{error}</div>}

        <button className="btn btn--danger" onClick={handleDelete}>
          כן, למחוק
        </button>
      </div>
    </div>
  );
}

export default DeleteFamily;
