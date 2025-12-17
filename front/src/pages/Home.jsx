
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // תוודאי שהשם קיים בתיקיית assets

function Home() {
  return (
    <div className="home-container">

      <img src={logo} alt="logo" className="home-logo" />

      <h2 className="home-title">&quot;ברוכים הבאים לגמ"ח  "נחלת דוד"</h2>

      <p className="home-text">
        מה שהתחיל כיוזמה קטנה של כמה חברים טובים — הפך למסע של חסד, נתינה ואהבת חינם.
        הגמ"ח הוקם כדי לתת מענה שקט ומכובד למשפחות שזקוקות לחיזוק,
        ובזכות קהילה מופלאה של תורמים ומתנדבים — הדרך מההתרומה ועד הדלת של כל משפחה
        נעשית בענווה, ברגישות ובאהבה.
        <br /><br />
        :אנחנו מזמינים אתכם
        <br />✔ להיות חלק ממעגל התורמים  
        <br />✔ לקחת חלק בעשייה חברתית אמיתית  
        <br />✔ ולהפוך למשמעותיות של מעגל נתינה שנשאר חיים של רבים  
      </p>

      <p className="donation-quote">
        .כל תרומה היא אור קטן שמאיר לב גדול — בואו להיות חלק מהנתינה שמחזקת משפחות שלמות
      </p>

      <a
        href="https://meshulam.co.il/s/a3697b59-307a-9a7e-0a6f-1badb85a1993"
        target="_blank"
        rel="noopener noreferrer"
        className="main-btn"
      >
      ❤️  לתרומה ❤️
      </a>

      <Link to="/login" className="main-btn">
         🔐 אזור מנהל 🔐
      </Link>

      <Link to="/team-login" className="main-btn">
        👥 התחברות חבר צוות 👥
      </Link>
      
    </div>
  );
}

export default Home;
