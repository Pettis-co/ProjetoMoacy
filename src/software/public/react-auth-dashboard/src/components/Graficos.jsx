import React from 'react';
import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';

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

const MeuGrafico = () => {
  const dadosProcessados = processData(dataJson);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={dadosProcessados}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periodo" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="valor"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};



export default MeuGrafico;
