// Home.js
import React from 'react';
import { useAuth } from '../AuthContext';

function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="home">
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}

export default Home;