import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import '../styles/Login.css'; 
import logo from "../img/cute-fat-cat-png-_1_.png"
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; // Componente de loading opcional

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Pettis.co | Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      // Validação básica de email
      if (!validateEmail(email)) {
        throw new Error('Por favor, insira um email válido');
      }
  
      // Simulação de chamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
  
      // Mock de credenciais válidas
      if (email === "oi@gmail.com" && password === "123456") {
        // Simula resposta da API
        const mockUser = {
          token: "mock-token-abc123",
          user: {
            id: 1,
            name: "Usuário Mock",
            email: "oi@gmail.com"
          }
        };
  
        // Chama a função de login do contexto
        login(mockUser.token);
        
        // Redireciona após login bem-sucedido
        navigate('/home');
      } else {
        throw new Error('Credenciais inválidas');
      }
      
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Pega a parte do payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      
      <div className="min-h-screen bg-orange-100 flex flex-col items-center justify-center p-4">
        <div className="mb-8 flex flex-col items-center">
          <img 
            src={logo} 
            alt="Logo Pettis.co" 
            className="w-24 h-24 mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-5xl font-bold text-yellow-800 mb-2">Pettis.co</h1>
          
        </div>

        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h2>
            <p className="ttext-yellow-800">Faça login para continuar</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                  minLength="6"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="text-right mt-2">
                <a href="/recuperar-senha" className="text-sm text-blue-600 hover:text-blue-800">
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all 
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center h-11"
            >
              {isLoading ? <LoadingSpinner /> : 'ENTRAR'}
            </button>
          </form>

          <div className="my-6">
            <div className="flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">Ou continue com</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              theme="filled_blue"
              shape="pill"
              onSuccess={(response) => {
                try {
                  const userData = decodeJWT(response?.credential);
                  login(response?.credential);
                  navigate('/home');
                } catch (err) {
                  setError('Erro ao autenticar com Google');
                }
              }}
              onError={() => setError('Falha ao autenticar com Google')}
            />
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Novo por aqui?{' '}
            <a href="/cadastro" className="text-blue-600 hover:text-blue-800 font-medium">
              Crie uma conta
            </a>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;