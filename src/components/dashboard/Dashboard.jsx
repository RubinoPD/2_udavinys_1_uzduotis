import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h2>Valdymo skydelis</h2>
      <div className="dashboard-card">
        <h3>Sveiki, {user.username}!</h3>
        <p>Jūsų el. paštas: {user.email}</p>
        <p>Vartotojo ID: {user.id}</p>
        <p>
          Čia galite patalpinti bet kokį apsaugotą turinį, kuris matomas tik
          prisijungusiam vartotojui.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
