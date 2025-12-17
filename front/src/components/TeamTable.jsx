// src/components/TeamTable.jsx
import { Link } from "react-router-dom";

function TeamTable({ teams }) {
  if (!teams || teams.length === 0) {
    return <p className="empty-message">אין קבוצות להצגה</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>שם</th>
          <th>טלפון</th>
          <th>אזור</th>
          <th>תפקיד</th>
          <th>פעולות</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <tr key={team._id}>
            <td>{team.name}</td>
            <td>{team.phone}</td>
            <td>{team.area}</td>
            <td>{team.role}</td>
            <td>
              <Link
                to={`/teams/edit/${team._id}`}
                className="btn btn--secondary"
              >
                עריכה
              </Link>
              <Link
                to={`/teams/delete/${team._id}`}
                className="btn btn--danger"
              >
                מחיקה
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamTable;
