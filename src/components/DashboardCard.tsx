/** @format */

import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";


interface DashboardCardProps {
  title: string;
  value: string;
  data: { name: string; uv: number }[];
  percentage: number;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  percentage,
  data,
  icon,
}) => {
  const gradientId = `colorUv-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-5 flex flex-col w-full">
      <div className="flex gap-2 items-center">
        <span className="bg-[#0066ff] p-1 rounded-md">{icon}</span>
        <h3 className="text-gray-500 text-sm uppercase font-bold">{title}</h3>
      </div>

      <div className="flex w-full ">
        <div className="w-1/2 py-4">
          <h2 className="text-3xl font-bold mt-1 dark:text-white">{value}</h2>
        </div>
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="10%"
                    stopColor={percentage > 0 ? "#27cebe" : "#ff0000"}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={percentage > 0 ? "#27cebe" : "#ff0000"}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Area
                type="monotone"
                dataKey="uv"
                stroke={percentage > 0 ? "#27cebe" : "#ff0000"}
                fillOpacity={2}
                fill={`url(#${gradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <p
        className={`${
          percentage > 0 ? "text-[#27cebe]" : "text-red-300"
        } text-sm mt-1`}
      >
        {percentage.toFixed(2)}% vs yesterday
      </p>
    </div>
  );
};

export default DashboardCard;
