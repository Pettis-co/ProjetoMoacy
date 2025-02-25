import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import "../styles/Home.css";
import MeuGrafico from './Graficos';
import MeuGraficoBarras from './GraficoBarras';
import MeuGraficoPizza from './GraficoPizza';

const fetchFeedingTime = async () => {
  try {
    const response = await fetch('http://150.165.85.30:24300/pet/time');
    if (!response.ok) throw new Error(`Erro ao buscar dados: ${response.statusText}`);
    const data = await response.json();
    console.error('horário:', data.feeding_time);
    return data.feeding_time || 'Not Set';
  } catch (error) {
    console.error('Erro ao buscar horário:', error);
    return 'Not Set';
  }
};

const sendFeedingTime = async (time) => {
  try {
    const response = await fetch('http://150.165.85.30:24300/pet/time', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feeding_time: time }),
    });

    if (!response.ok) throw new Error(`Erro ao enviar horário: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar horário:', error);
    throw error;
  }
};

const feedNow = async () => {
  try {
    const response = await fetch('http://150.165.85.30:24300/pet/feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feed_now: true }),
    });

    if (!response.ok) throw new Error(`Erro ao enviar comando: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar "Comer Agora":', error);
    throw error;
  }
};

function Home() {
  const { user, logout } = useAuth();
  const [currentFeedingTime, setCurrentFeedingTime] = useState('Not Set');
  const [newFeedingTime, setNewFeedingTime] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState(2);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const time = await fetchFeedingTime();
      setCurrentFeedingTime(time);
    };
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendFeedingTime(newFeedingTime);
      const updatedTime = await fetchFeedingTime();
      setCurrentFeedingTime(updatedTime);
      setNewFeedingTime('');
    } catch (error) {
      console.error('Falha ao atualizar horário:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-teal-600 text-white p-4 flex justify-between items-center px-6">
        <div className="flex items-center space-x-4">
          <button className="text-2xl hover:bg-teal-700 rounded-full p-2 transition-colors">
            ☰
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Pettis.co</h1>
        </div>
        <div className="flex items-center gap-4">
        <button className="group relative p-2 bg-white hover:bg-teal-100 rounded-full transition-all duration-200 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-teal-600 group-hover:text-teal-800 transition-colors" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-80"></span>
        </button>

        <button className="group relative p-2 bg-white hover:bg-teal-100 rounded-full transition-all duration-200 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-teal-600 group-hover:text-teal-800 transition-colors" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse opacity-80"></span>
        </button>

          <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-all"
            onClick={() => setShowLogout(!showLogout)}
          >
          {/* Avatar do usuário */}
          {user?.photo ? (
            <img 
              src={user.photo}
              alt="Foto do usuário"
              className="w-10 h-10 rounded-full object-cover border-2 border-teal-500"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
              {user?.firstName?.[0] || 'C'}
            </div>
          )}

    {/* Ícone de dropdown */}
    <span className={`transform transition-transform duration-200 text-gray-600 ${showLogout ? 'rotate-180' : ''}`}>
      ▼
    </span>
  </div >

  {/* Botão de logout (mantido do código anterior com ajustes) */}
  {showLogout && (
    <button 
      onClick={logout}
      className="absolute top-12 right-0 px-4 py-2 text-white bg-red-500 rounded-lg z-50
               shadow-lg hover:bg-red-600 transition-colors animate-[fade-in-down_0.2s_ease-out]
               flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Sair
    </button>
  )}</div>
        </div>
      </header>
  
      <main className="p-5 max-w-7xl mx-auto flex-1 h-full">
      <div className="flex items-center justify-between w-full max-w-2xl  mb-6">
          <h2 className="text-4xl font-bold text-gray-600 tracking-tight">
            Monitore a saúde do seu pet.
          </h2>
          <button
            onClick={feedNow}
            className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-4 py-4 rounded-2xl shadow-lg
                      hover:from-teal-700 hover:to-teal-600 transition-all duration-300 transform
                      hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 
                      font-semibold tracking-wide border-2 border-teal-700 animate-[pulse-once_1.5s_ease-in-out]"
            >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 animate-[bounce-in_0.5s_ease-out]"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
            <span>Alimentar Agora</span>
          </button>
        </div>

  
        {/* Seção de controles */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md md:col-span-2 lg:col-span-1">
            <p className="text-gray-600 mb-2 font-bold">Horário da primeira alimentação</p>
            <div className="text-3xl text-center font-bold text-teal-600">
              {currentFeedingTime} ▼
            </div>
          </div>
  
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow-md md:col-span-2 lg:col-span-1"
          >
            <input
              type="time"
              value={newFeedingTime}
              onChange={(e) => setNewFeedingTime(e.target.value)}
              className="w-full text-center text-2xl border-b-2 border-gray-200 focus:border-teal-500 outline-none"
            />
            <button
              type="submit"
              className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Atualizar Horário
            </button>
          </form>

          <div className="bg-white p-6 rounded-2xl shadow-md md:col-span-2 lg:col-span-1">
            <p className="text-gray-600 mb-2 font-bold">Porcentagem de Ração no pote</p>
            <div className="text-3xl text-center font-bold text-red-600">
              10 % ▼
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md md:col-span-2 lg:col-span-1 relative">
            <p className="text-gray-600 mb-2 font-bold">Periodicidade da alimentação</p>
            
            <div 
              className="text-3xl text-center font-bold text-teal-600 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors py-2"
              onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
            >
              {selectedFrequency} x ▼
            </div>

            {showFrequencyDropdown && (
              <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-lg shadow-lg border border-gray-100 z-50 animate-scale-in">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setSelectedFrequency(num);
                      setShowFrequencyDropdown(false);
                    }}
                    className={`w-full py-3 px-4 text-lg font-semibold hover:bg-red-50 transition-colors
                      ${num === selectedFrequency ? 'text-red-600 bg-red-100' : 'text-gray-700'}`}
                  >
                    {num} x
                  </button>
                ))}
              </div>
            )}
          </div>

         </div>

        {/* Seção de gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       
          <div className="bg-white p-4 rounded-2xl shadow-md"> 
            <h3 className="text-xl font-semibold mb-4">Consumo Mensal </h3>
            <div className="h-80">
              <MeuGrafico />
            </div>
          </div>
        
              <MeuGraficoBarras />
            
         
              <MeuGraficoPizza />
            
        </div>
      </main>
      <footer className="bg-teal-600 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-sm">
          © {new Date().getFullYear()} Pettis.co - Todos os direitos reservados
        </div>
        <a
          href="https://github.com/Pettis-co"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-teal-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </footer>

    </div>
    
  );
}

export default Home;