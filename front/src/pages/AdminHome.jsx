import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">אזור מנהל</h1>

      <div className="admin-buttons">
        <button className="admin-btn" onClick={() => navigate("/teams")}>
          קבוצת חלוקה
        </button>

        <button className="admin-btn" onClick={() => navigate("/donors")}>
          תורמים
        </button>

        <button className="admin-btn" onClick={() => navigate("/families")}>
          משפחות
        </button>
        <button className="admin-btn" onClick={() => navigate("/shop")}>
  רשימות קניות 🛒
</button>

      </div>
    </div>
  );
}

export default AdminHome;
