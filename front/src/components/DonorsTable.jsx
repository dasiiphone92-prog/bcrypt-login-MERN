// src/components/DonorsTable.jsx
import { Link } from "react-router-dom";

function DonorsTable({ donors }) {
  if (!donors || donors.length === 0) {
    return <p className="empty-message">אין תורמים להצגה</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>שם</th>
          <th>עיר</th>
          <th>טלפון</th>
          <th>סכום קבוע</th>
          <th>פעולות</th>
        </tr>
      </thead>
      <tbody>
        {donors.map((donor) => (
          <tr key={donor._id}>
            <td>{donor.name}</td>
            <td>{donor.city}</td>
            <td>{donor.phone}</td>
            <td>{donor.amount}</td>
            <td>
              <Link
                to={`/donors/edit/${donor._id}`}
                className="btn btn--secondary"
              >
                עריכה
              </Link>
              <Link
                to={`/donors/delete/${donor._id}`}
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

export default DonorsTable;
