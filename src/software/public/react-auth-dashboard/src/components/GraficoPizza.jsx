import React from 'react';
import { PieChart,  Tooltip, ResponsiveContainer, Pie, Cell, Legend,  } from 'recharts';

// Supondo que seus dados estão num formato como:
const dataJson = [
  { periodo: 'Jan', valor: '12g' },
  { periodo: 'Fev', valor: '13g' },
  { periodo: 'Mar', valor: '12g' },
  { periodo: 'Abr', valor: '15g' },
  { periodo: 'Mai', valor: '10g' },
  { periodo: 'Jun', valor: '18g' },
];
// Função para converter os valores (remover o 'g' e converter para número)
const processData = (data) => {
  return data.map(item => ({
    ...item,
    valor: Number(item.valor.replace('g', ''))
  }));
};

const MeuGraficoPizza = () => {
    const dadosProcessados = processData(dataJson);
    const cores = ["#0d9488", "#e0925c", "#5c92e0", "#92e05c", "#e05c92", "#facc15"];
  
    return (
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h3 className="text-xl text-center font-semibold mb-4">Distribuição (Pizza)</h3>
        <div className="h-80">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={dadosProcessados}
                dataKey="valor"
                nameKey="periodo"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {dadosProcessados.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={cores[index % cores.length]} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout="vertical" 
                align="right" 
                verticalAlign="middle"
                wrapperStyle={{ paddingLeft: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  

export default MeuGraficoPizza;
