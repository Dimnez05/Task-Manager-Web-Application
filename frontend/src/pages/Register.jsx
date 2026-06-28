import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { useState } from "react";
import axios from "axios";



function Register() {
  const navigate=useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleRegister(){
    if (password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }

    const newUser = {
      name,
      email,
      password
    };

    try {
      await axios.post(
        "http://localhost:8080/register",
        newUser
      );
    
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  }
  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Register</h1>

        <label>Name</label>
        <input type="text" placeholder="Enter a Name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <label>Confirm Password</label>
        <input type="Password" placeholder="Confirm your Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>

        <button onClick={handleRegister}>Register</button>
        <p>Already have an account? <span onClick={() => navigate("/login")}>Login</span></p>
      </div>
    </div>
  );
}

export default Register;