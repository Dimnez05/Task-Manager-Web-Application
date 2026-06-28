import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useState } from "react";
import axios from "axios";



function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(){
    try{
      const response = await axios.post(
        "http://localhost:8080/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "userId",
        response.data.id
      );
      localStorage.setItem(
        "userName",
        response.data.name
      );

      navigate("/dashboard");
    }
    catch(error){
      alert("Invalid Email or Password");
    }
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>

        <label>Email</label>
        <input type="email" placeholder="Enter a Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="Enter a Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <button onClick={handleLogin}>Login</button>
        <p>Don't have an account? <span onClick={() => navigate("/register")}>Register</span></p>
      </div>
    </div>
  );
}

export default Login;