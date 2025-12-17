
// front/src/pages/ShowShop.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import Loader from "../components/Loader.jsx";
import BackButton from "../components/BackButton.jsx";

function ShowShop() {
  const [lists, setLists] = useState([]);
  const [weekFilter, setWeekFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const location = useLocation();

  // טעינת הרשימות
  useEffect(() => {
    async function fetchLists() {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get("/api/shop", {
          params: weekFilter ? { week: weekFilter } : {},
        });
        setLists(data);
      } catch (err) {
        console.error("Error fetching shop lists:", err);
        setError("שגיאה בטעינת הנתונים");
      } finally {
        setLoading(false);
      }
    }

    fetchLists();
  }, [weekFilter, location.key]);

  // יצוא ל־PDF - מסתיר כפתורים לפני הדפסה
  function handleExportPdf() {
    // הסתרת כל הכפתורים והאלמנטים לפני הדפסה
    setIsPrinting(true);
    
    // המתנה קצרה כדי שהדף יתעדכן, ואז הדפסה
    setTimeout(() => {
      window.print();
      // החזרת הכפתורים אחרי שהדפסה מסתיימת
      setTimeout(() => {
        setIsPrinting(false);
      }, 500);
    }, 100);
  }

  // טעינת קובץ PDF
  function handlePdfUpload(e) {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const pdfUrl = event.target.result;
        setUploadedPdfUrl(pdfUrl);
        setPdfUploaded(true);
      };
      reader.readAsDataURL(file);
    } else {
      setError("אנא בחרי קובץ PDF בלבד");
    }
  }

  return (
    <div className="page-container">
      {/* Header and title - מוסתרים אחרי טעינת PDF או לפני הדפסה */}
      {!pdfUploaded && !isPrinting && <Header />}
      {!pdfUploaded && !isPrinting && <h1 className="page-title">רשימות קניות</h1>}

      {/* כפתור חזרה - מוסתר אחרי טעינת PDF או לפני הדפסה */}
      {!pdfUploaded && !isPrinting && <BackButton to="/admin" />}

      {/* הודעת שגיאה כללית - מוסתרת אחרי טעינת PDF או לפני הדפסה */}
      {!pdfUploaded && !isPrinting && error && <div className="error-message">{error}</div>}

      {/* שורת פילטר וכפתורים - מוסתרים אחרי טעינת PDF או לפני הדפסה */}
      {!pdfUploaded && !isPrinting && (
        <div className="table-toolbar">
          <div className="filter-row">
            <label htmlFor="weekFilter">חפש לפי שבוע:</label>
            <input
              id="weekFilter"
              type="week"
              value={weekFilter}
              onChange={(e) => setWeekFilter(e.target.value)}
            />
          </div>

          <div className="toolbar-buttons">
            <Link to="/shop/create" className="btn">
              יצירת רשימה חדשה +
            </Link>
            <button className="btn" onClick={handleExportPdf}>
              יצוא ל-PDF
            </button>
            <label htmlFor="pdfUpload" className="btn" style={{ cursor: "pointer" }}>
              טעינת PDF
            </label>
            <input
              id="pdfUpload"
              type="file"
              accept="application/pdf"
              onChange={handlePdfUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
      )}

      {/* הצגת PDF אחרי טעינה - רק PDF מוצג, כל השאר מוסתר */}
      {pdfUploaded && uploadedPdfUrl ? (
        <div style={{ width: "100%", height: "100vh", marginTop: "0", padding: "0" }}>
          <iframe
            src={uploadedPdfUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Uploaded PDF"
          />
        </div>
      ) : (
        <>
          {/* ספינר טעינה */}
          {loading && <Loader />}

          {/* כשאין רשימות בכלל */}
          {!loading && !error && lists.length === 0 && (
            <p className="empty-message">
              אין עדיין רשימות קניות לשבוע שבחרת.
            </p>
          )}

          {/* טבלה של רשימות – רק אם יש נתונים */}
          {!loading && !error && lists.length > 0 && (
            <div className="table-wrapper print-area">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>משפחה</th>
                    <th>שבוע</th>
                    <th>פריטים</th>
                    <th className="no-print">פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {lists.map((list) => (
                    <tr key={list._id}>
                      <td>{list.familyId?.name || list.familyId?.lastName ? `${list.familyId.name || ""} ${list.familyId.lastName || ""}`.trim() : "—"}</td>
                      <td>{list.week}</td>
                      <td>
                        <ul className="items-list">
                          {list.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="no-print">
                        <Link to={`/shop/edit/${list._id}`} className="btn btn-small">
                          עריכה
                        </Link>
                        <Link
                          to={`/shop/delete/${list._id}`}
                          className="btn btn-small btn-danger"
                        >
                          מחיקה
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShowShop;
