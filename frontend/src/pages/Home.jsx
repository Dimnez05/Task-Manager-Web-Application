import "../styles/Home.css";
import { useNavigate } from "react-router-dom"
function Home() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1>Task Manager</h1>
      <p>Manage your daily tasks easily</p>
      <div className="button-container">

        <button onClick={() => navigate("/login")}>
          Login
        </button>

        <button on onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Home;