
// front/src/pages/DeleteShop.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import Loader from "../components/Loader.jsx";
import BackButton from "../components/BackButton.jsx";

function DeleteShop() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadList() {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get(`/api/shop/list/${id}`);
        setList(data);
      } catch (err) {
        console.error(err);
        setError("שגיאה בטעינת רשימת הקניות למחיקה");
      } finally {
        setLoading(false);
      }
    }

    loadList();
  }, [id]);

  async function handleDelete() {
    setError("");

    try {
      setDeleting(true);
      await api.delete(`/api/shop/${id}`);
      navigate("/shop", { replace: true });
    } catch (err) {
      console.error("Error deleting shop list:", err);
      setError(err.response?.data?.message || "שגיאה במחיקת רשימת הקניות");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">מחיקת רשימת קניות</h1>

      <BackButton to="/shop" />

      {loading && <Loader />}

      {error && <div className="error-message">{error}</div>}

      {!loading && list && (
        <div className="form-card">
          <p>
            האם את בטוחה שברצונך למחוק את הרשימה של{" "}
            <strong>{list.familyId?.name}</strong> לשבוע{" "}
            <strong>{list.week}</strong>?
          </p>

          <ul className="items-list">
            {list.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "...מוחקת" : "מחקי רשימה"}
          </button>
        </div>
      )}
    </div>
  );
}

export default DeleteShop;
