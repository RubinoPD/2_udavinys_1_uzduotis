import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <h1>Sveiki atvykę į Autentifikacijos Sistemą</h1>
      <p>Ši sistema demonstruoja apsaugotų maršrutų naudojimą su React.</p>

      {isAuthenticated ? (
        <div className="cta-buttons">
          <Link to="/dashboard" className="cta-button primary">
            Eiti į valdymo skydelį
          </Link>
        </div>
      ) : (
        <div className="cta-buttons">
          <Link to="/login" className="cta-button primary">
            Prisijungti
          </Link>
          <Link to="/register" className="cta-button secondary">
            Registruotis
          </Link>
        </div>
      )}

      <div className="features">
        <div className="feature-card">
          <h3>Saugi Prieiga</h3>
          <p>
            Tik autentifikuoti vartotojai gali pasiekti apsaugotus puslapius.
          </p>
        </div>
        <div className="feature-card">
          <h3>Vartotojo Valdymas</h3>
          <p>Lengva registracija ir prisijungimas, su būsenos išsaugojimu.</p>
        </div>
        <div className="feature-card">
          <h3>React Router</h3>
          <p>Moderni navigacija su apsaugotais maršrutais.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
