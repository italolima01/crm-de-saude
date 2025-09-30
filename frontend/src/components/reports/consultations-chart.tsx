'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Seg', consultas: 12 },
  { name: 'Ter', consultas: 19 },
  { name: 'Qua', consultas: 3 },
  { name: 'Qui', consultas: 5 },
  { name: 'Sex', consultas: 2 },
  { name: 'Sáb', consultas: 3 },
  { name: 'Dom', consultas: 0 },
];

export function ConsultationsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="consultas" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
