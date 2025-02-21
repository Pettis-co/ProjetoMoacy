import React, { useState } from 'react';
import '../styles/Login.css'; 
import logo from "../img/cute-fat-cat-png-_1_.png"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica para autenticação com email e senha
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
      <div className='parent-container'>
      <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="company-name">Pettis.co</h1>
        </div>
        <div className="login-container">
        
        <h2>Cadastro</h2>
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
            <label htmlFor="email">Senha</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Repita sua senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Cadastre-se</button>
        </form>
        <div className="signup-link">
          <p>Já tem uma conta? <a href="/">Login</a></p>
        </div>
      </div></div>
  );
}

export default Login;