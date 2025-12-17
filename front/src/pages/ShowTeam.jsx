
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import TeamTable from "../components/TeamTable.jsx";
import Loader from "../components/Loader.jsx";
import BackButton from "../components/BackButton.jsx";

function ShowTeam() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // ⭐ חיפוש
  const location = useLocation();

  useEffect(() => {
    async function loadTeams() {
      setLoading(true);
      setError("");

      try {
        // ⭐ הנתיב הנכון הוא /team (לא /teams)
        const { data } = await api.get("/team");
        console.log("Teams data received:", data);
        setTeams(data || []);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError(err.response?.data?.message || "❗ שגיאה בטעינת קבוצות חלוקה");
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, [location.key]);

  // ⭐ סינון לפי שם קבוצה
  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <Header />
      <BackButton to="/admin" />

      <h1 className="page-title">קבוצות חלוקה</h1>

      {/* ⭐ שדה חיפוש עדין */}
      <div className="search-box">
        <input
          type="text"
          placeholder="חיפוש לפי שם קבוצה..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Link to="/teams/create" className="btn">
        ➕ הוספת קבוצה
      </Link>

      {loading && <Loader />}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <>
          {filteredTeams.length === 0 ? (
            <p className="empty-message">❗ אין קבוצות תואמות לחיפוש</p>
          ) : (
            <TeamTable teams={filteredTeams} />
          )}
        </>
      )}
    </div>
  );
}

export default ShowTeam;
