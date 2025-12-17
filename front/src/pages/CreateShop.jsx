
// front/src/pages/CreateShop.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header.jsx";
import Loader from "../components/Loader.jsx";
import BackButton from "../components/BackButton.jsx";

function CreateShop() {
  const navigate = useNavigate();

  const [families, setFamilies] = useState([]);
  const [form, setForm] = useState({
    familyId: "",
    week: "",
    itemsText: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // טעינת משפחות לבחירה
  useEffect(() => {
    async function loadFamilies() {
      setLoading(true);
      setError("");

      try {
        const { data } = await api.get("/families"); // זה נשאר כמו בשאר הפרויקט
        setFamilies(data);
      } catch (err) {
        console.error(err);
        setError("שגיאה בטעינת רשימת המשפחות");
      } finally {
        setLoading(false);
      }
    }

    loadFamilies();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.familyId || !form.week || !form.itemsText.trim()) {
      setError("חובה לבחור משפחה, שבוע ולהכניס לפחות פריט אחד");
      return;
    }

    const items = form.itemsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length === 0) {
      setError("חובה להכניס לפחות פריט אחד");
      return;
    }

    try {
      setSaving(true);

      await api.post("/api/shop", {
        familyId: form.familyId,
        week: form.week,
        items,
      });

      navigate("/shop", { replace: true });
    } catch (err) {
      console.error("Error creating shop list:", err);
      setError(err.response?.data?.message || "שגיאה ביצירת רשימת הקניות");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">יצירת רשימת קניות</h1>

      <BackButton to="/shop" />

      {loading && <Loader />}

      {error && <div className="error-message">{error}</div>}

      {!loading && (
        <div className="form-card">
          <form className="form" onSubmit={handleSubmit}>
            {/* משפחה */}
            <div className="form-group">
              <label htmlFor="familyId">משפחה</label>
              <select
                id="familyId"
                name="familyId"
                value={form.familyId}
                onChange={handleChange}
              >
                <option value="">בחרי משפחה</option>
                {families.map((family) => (
                  <option key={family._id} value={family._id}>
                    {family.name} {family.lastName || ""}
                  </option>
                ))}
              </select>
            </div>

            {/* שבוע */}
            <div className="form-group">
              <label htmlFor="week">שבוע</label>
              <input
                id="week"
                type="week"
                name="week"
                value={form.week}
                onChange={handleChange}
              />
            </div>

            {/* פריטים */}
            <div className="form-group">
              <label htmlFor="itemsText">
                פריטים (כל פריט בשורה נפרדת)
              </label>
              <textarea
                id="itemsText"
                name="itemsText"
                rows="6"
                value={form.itemsText}
                onChange={handleChange}
              />
            </div>

            <button className="btn" type="submit" disabled={saving}>
              {saving ? "...שומרת רשימת קניות" : "שמרי רשימת קניות"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateShop;
