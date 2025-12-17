
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import FamiliesTable from "../components/FamiliesTable.jsx";
import Loader from "../components/Loader.jsx";
import BackButton from "../components/BackButton.jsx";

function ShowFamily() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // ⭐ שדה חיפוש
  const location = useLocation();

  useEffect(() => {
    async function fetchFamilies() {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get("/families");
        console.log("Families data received:", data);
        setFamilies(data || []);
      } catch (err) {
        console.error("Error fetching families:", err);
        setError(err.response?.data?.message || "שגיאה בטעינת רשימת המשפחות");
      } finally {
        setLoading(false);
      }
    }

    fetchFamilies();
  }, [location.key]); // מרענן רק אחרי פעולות כמו עריכה/מחיקה

  // ⭐ סינון לפי שם משפחה
  const filteredFamilies = families.filter((family) =>
    family.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <Header />

      {/* ⭐ כפתור חזרה קבוע לדף /admin */}
      <BackButton to="/admin" />

      <h1 className="page-title">רשימת משפחות</h1>

      {/* ⭐ שדה חיפוש */}
      <input
        type="text"
        placeholder="...חיפוש לפי שם משפחה"
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "250px",
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <Link to="/families/create" className="btn">
        הוספת משפחה ➕
      </Link>

      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <div>
          {filteredFamilies.length === 0 ? (
            <p className="empty-message">אין משפחות התואמות לחיפוש</p>
          ) : (
            <FamiliesTable families={filteredFamilies} />
          )}
        </div>
      )}
    </div>
  );
}

export default ShowFamily;
