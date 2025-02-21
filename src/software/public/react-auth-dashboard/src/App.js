import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Importe o componente de Login
import Home from './components/Home'; // Importe o componente da página inicial (exemplo)
import Cadastro from './components/Cadastro'; 
import './App.css'; // Estilos globais (opcional)
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './routes/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rota para a tela de login */}
            <Route path="/login" element={<Login />} />

            {/* Rota protegida para a página inicial (após login) */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Rota para a tela de cadastro */}
            <Route path="/cadastro" element={<Cadastro />} />

            {/* Rota padrão (redireciona para o login) */}
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;