import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import '../styles/Login.css'; 
import logo from "../img/cute-fat-cat-png-_1_.png"
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica para autenticação com email e senha
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <GoogleOAuthProvider clientId="721610298440-ni8ecb4m9ba910642270uvi59ldqbs9i.apps.googleusercontent.com">
      <div className='parent-container'>
      <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="company-name">Pettis.co</h1>
        </div>
        <div className="login-container">
        
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">ENTRAR</button>
        </form>
        <div className="social-login">
          <p>Ou continuar com</p>
          <GoogleLogin
            onSuccess={(response) => {
              const userData = jwtDecode(response.credential);
              login(userData); // Atualiza o estado de autenticação
              navigate('/home');
            }}
            onError={() => {
              console.log("Login com Google falhou");
            }}
          />
        </div>
        <div className="signup-link">
          <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
        </div>
      </div></div>
    </GoogleOAuthProvider>
  );
}

export default Login;