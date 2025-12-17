// src/components/BackButton.jsx
import { useNavigate } from "react-router-dom";

function BackButton({ to, children }) {
  const navigate = useNavigate();

  function handleClick() {
    if (to) navigate(to);
    else navigate(-1);
  }

  return (
    <button className="btn btn--secondary" onClick={handleClick}>
      {children || "⬅ חזרה"}
    </button>
    
    
  );
}

export default BackButton;
