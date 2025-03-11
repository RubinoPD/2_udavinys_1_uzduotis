import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Autentikacijos sistema</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Pradžia</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/dashboard">Valdymo Skydelis</Link>
            </li>
            <li>
              <Link to="/recipes">Receptai</Link>
            </li>
            <li>
              <Link to="/favorites">Mėgstamiausi</Link>
            </li>
            <li>
              <span className="user-greeting">Sveiki, {user.username}!</span>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Atsijungti
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Prisijungti</Link>
            </li>
            <li>
              <Link to="/register">Registruotis</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
