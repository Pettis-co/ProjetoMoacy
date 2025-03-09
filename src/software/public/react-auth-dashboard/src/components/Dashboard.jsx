const Dashboard = () => {
    const logout = () => {
      localStorage.removeItem('accessToken');
      window.location.href = '/';
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bem-vindo ao Dashboard!</h1>
        <button onClick={logout} className="px-4 py-2 mt-4 text-white bg-red-500 rounded">
          Sair
        </button>
      </div>
    );
  };
  
  export default Dashboard;
  