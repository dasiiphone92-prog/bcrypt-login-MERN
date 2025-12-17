// src/pages/ShowDonor.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import DonorsTable from "../components/DonorsTable.jsx";
import Loader from "../components/Loader.jsx";
import BackButton from "../components/BackButton.jsx";

function ShowDonor() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // ⭐ חדש — סטייט של חיפוש
  const location = useLocation();

  useEffect(() => {
    async function fetchDonors() {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get("/donors");
        console.log("Donors data received:", data);
        setDonors(data || []);
      } catch (err) {
        console.error("Error fetching donors:", err);
        if (err.response?.status === 401) {
          setError("הפניה שניתנה אינה תקינה — אנא התחברו מחדש");
        } else {
          setError(err.response?.data?.message || "שגיאה בטעינת רשימת תורמים");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDonors();
  }, [location.key]);

  // ⭐ סינון לפי חיפוש
  const filteredDonors = donors.filter((donor) =>
    donor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <Header />

      <BackButton to="/admin">⬅ חזרה</BackButton>

      <h1 className="page-title">רשימת תורמים</h1>

      {/* ⭐ שדה חיפוש */}
      <input
        type="text"
        placeholder="חיפוש לפי שם..."
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

      <Link to="/donors/create" className="btn">
        ➕ הוספת תורם
      </Link>

      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <>
          {filteredDonors.length === 0 ? (
            <p className="empty-message">אין תורמים להצגה</p>
          ) : (
            <DonorsTable donors={filteredDonors} />
          )}
        </>
      )}
    </div>
  );
}

export default ShowDonor;

