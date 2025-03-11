import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h2>Valdymo skydelis</h2>
      <div className="dashboard-card">
        <h3>Sveiki, {user.username}!</h3>
        <p>Jūsų el. paštas: {user.email}</p>
        <p>Vartotojo ID: {user.id}</p>
      </div>

      <h3 className="section-title">Receptų aplikacija</h3>
      <div className="dashboard-actions">
        <Link to="/recipes" className="dashboard-action-card">
          <h4>Naršyti receptus</h4>
          <p>Peržiūrėkite mūsų receptų kolekciją</p>
          <span className="action-icon">🍳</span>
        </Link>

        <Link t="/favorites" className="dashboard-action-card">
          <h4>Mėgstamiausi Receptai</h4>
          <p>Peržiūrėkite savo išsaugotus receptus</p>
          <span className="action-icon">❤️</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
