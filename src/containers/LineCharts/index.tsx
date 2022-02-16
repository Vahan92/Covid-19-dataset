import React, { memo } from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ILineCharts {
  type: string;
  dataForChart: Array<{ date: string; new_deaths: number; new_cases: number }>;
}

function LineCharts({ type, dataForChart }: ILineCharts) {
  return (
    <ResponsiveContainer width="100%" minHeight={600} height="100%">
      <LineChart
        width={500}
        height={300}
        data={dataForChart}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={type}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default memo(LineCharts);
