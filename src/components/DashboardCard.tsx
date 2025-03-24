/** @format */

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 0,
  },
  {
    name: "Page B",
    uv: 900,
  },
  {
    name: "Page C",
    uv: 500,
  },
  {
    name: "Page D",
    uv: 1080,
  },
  {
    name: "Page E",
    uv: 1000,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

interface DashboardCardProps {
  title: string;
  value: number;
  percentage: number;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  percentage,
  icon,
}) => {
  return (
    <div className='bg-white dark:bg-gray-700 shadow-md rounded-lg p-5 flex flex-col w-full'>
      <div className='flex gap-2 items-center'>
        <span className='bg-[#0066ff] p-1 rounded-md'>{icon}</span>
        <h3 className='text-gray-500 text-sm uppercase font-bold'>{title}</h3>
      </div>

      <div className='flex w-full '>
        <div className='w-1/2 py-4'>
          <h2 className='text-3xl font-bold mt-1 dark:text-white'>${value}</h2>
        </div>
        <div className='w-1/2'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={data}>
              <defs>
                <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='10%' stopColor='#99e7e0' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#99e7e0' stopOpacity={0} />
                </linearGradient>
              </defs>

              <Area
                type='monotone'
                dataKey='uv'
                stroke='#27cebe'
                fillOpacity={2}
                fill='url(#colorUv)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p className='text-[#27cebe] text-sm mt-1'>+{percentage}% vs yesterday</p>
    </div>
  );
};

export default DashboardCard;
