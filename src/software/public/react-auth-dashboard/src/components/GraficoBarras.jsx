import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Cell } from 'recharts';

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

// Lista de cores para alternar nas barras
const colors = ["#0d9488", "#e0925c", "#5c92e0", "#92e05c", "#e05c92", "#facc15"];

const MeuGraficoBarras = () => {
  const dadosProcessados = processData(dataJson);

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h3 className="text-xl text-center font-semibold mb-4">Consumo Mensal (Barras)</h3>
      <div className="h-80">
        <ResponsiveContainer>
          <BarChart data={dadosProcessados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="periodo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
              {dadosProcessados.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MeuGraficoBarras;
