// src/components/FamiliesTable.jsx
import { Link } from "react-router-dom";

function FamiliesTable({ families }) {
  if (!families || families.length === 0) {
    return <p className="empty-message">אין משפחות להצגה</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>שם פרטי</th>
          <th>שם משפחה</th>
          <th>טלפון</th>
          <th>מספר נפשות</th>
          <th>ילדים עד 18</th>
          <th>קבוצה</th>
          <th>פעולות</th>
        </tr>
      </thead>
      <tbody>
        {families.map((family) => (
          <tr key={family._id}>
            <td>{family.name}</td>
            <td>{family.lastName}</td>
            <td>{family.phone}</td>
            <td>{family.people}</td>
            <td>{family.kids}</td>
            <td>{family.team}</td>
            <td>
              <Link
                to={`/families/edit/${family._id}`}
                className="btn btn--secondary"
              >
                עריכה
              </Link>
              <Link
                to={`/families/delete/${family._id}`}
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

export default FamiliesTable;
