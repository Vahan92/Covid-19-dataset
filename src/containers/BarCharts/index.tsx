import React, { memo } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

import { upperCase } from '../../utils/chartData';

interface IInfo {
  country: string;
  'total deaths': number;
  'total cases': number
}

interface IBarCharts {
  type: string;
  searchValue: string;
  dataForChart: Array<IInfo>;
}

function BarCharts({ type, dataForChart, searchValue }: IBarCharts) {
  return (
    <ResponsiveContainer width="100%" minHeight={600} height="100%">
      <BarChart
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
        <XAxis dataKey='country' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={type}>
          {dataForChart.map((entry: IInfo, index) => {
            return <Cell
              cursor="pointer"
              fill={upperCase(entry.country) === upperCase(searchValue) ? '#82ca9d' : '#8884d8'}
              key={`cell-${index}`}
            />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default memo(BarCharts);
