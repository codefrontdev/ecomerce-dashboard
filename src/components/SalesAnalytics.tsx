/** @format */

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import moment from "moment"; // مكتبة للتعامل مع التواريخ
import { Cross } from "lucide-react";
import SelectOptions from "./SelectOptions";

// ✅ دالة لإنشاء بيانات الأسبوع بشكل ديناميكي
export const generateWeeklyData = () => {
  const weekData = [];
  for (let i = 6; i >= 0; i--) {
    const date = moment().subtract(i, "days").format("DD MMM"); // "13 Mar"
    weekData.push({ date, sales: Math.floor(Math.random() * 10000) + 2000 });
  }

  return weekData;
};

// بيانات المبيعات الشهرية والسنوية
const monthlyData = [
  { month: "Jan", sales: 5000 },
  { month: "Feb", sales: 7000 },
  { month: "Mar", sales: 9000 },
  { month: "Apr", sales: 11000 },
  { month: "May", sales: 13000 },
  { month: "Jun", sales: 15000 },
  { month: "Jul", sales: 17000 },
  { month: "Aug", sales: 19000 },
  { month: "Sep", sales: 21000 },
  { month: "Oct", sales: 23000 },
  { month: "Nov", sales: 25000 },
  { month: "Dec", sales: 27000 },
];

const yearlyData = [
  { year: "2020", sales: 100000 },
  { year: "2021", sales: 120000 },
  { year: "2022", sales: 140000 },
  { year: "2023", sales: 160000 },
  { year: "2024", sales: 180000 },
];

const SalesAnalytics = () => {
  const [timeRange, setTimeRange] = useState("weekly");
  const [weeklyData, setWeeklyData] = useState(generateWeeklyData());

  // اختيار البيانات بناءً على المدة الزمنية
  const data =
    timeRange === "weekly"
      ? weeklyData
      : timeRange === "monthly"
      ? monthlyData
      : yearlyData;

  const dataKey =
    timeRange === "weekly"
      ? "date"
      : timeRange === "monthly"
      ? "month"
      : "year";

  // دالة لتحويل الأرقام إلى تنسيق مع "k" (آلاف)
  const formatSales = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`; // تحويل القيمة إلى k
    }
    return value;
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
    if (e.target.value === "weekly") {
      setWeeklyData(generateWeeklyData());
    }
  };

  return (
    <div className=''>
      {/* قائمة اختيار المدة الزمنية */}

      <SelectOptions
        handleRange={handleTimeRangeChange}
        range={timeRange}
        title='Sales Analytics'
        options={["weekly", "monthly", "yearly"]}
      />
      {/* <div className='mb-4 flex justify-between'>
        <h2 className='text-2xl font-medium dark:text-white'>
          Sales Analytics
        </h2>
        <select
          className='border-none outline-none p-2 rounded-md bg-gray-50 text-gray-400'
          value={timeRange}
          onChange={}>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
      </div> */}

      <div className='w-full h-[300px]'>
        <ResponsiveContainer width='100%' height={"100%"}>
          <AreaChart data={data} className=''>
            <defs>
              <linearGradient id='colorSales' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='10%' stopColor='#ff9662' stopOpacity={0.8} />
                <stop offset='97%' stopColor='#ff9662' stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey={dataKey}
              className='text-gray-500 !w-full mx-5'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 10 }}
              tickFormatter={(tick) => moment(tick, "DD MMM").format("DD MMM")}
              interval={0}
            />
            <Cross size={15} />
            <CartesianGrid
              vertical={false}
              horizontal={true}
              strokeDasharray='3 3'
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #8884d8",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
              }}
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const value = payload[0].value;
                  return (
                    <div className='px-4 rounded-md bg-orange-400'>
                      <p className='text-gray-700'>
                        {typeof value === "number" && value !== undefined
                          ? `$${value}`
                          : "N/A"}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <YAxis
              dataKey={"sales"}
              className='text-gray-500 !w-full mx-5'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#888888", fontSize: 10 }}
              tickFormatter={(tick) => {
                return formatSales(tick).toString();
              }}
              tickCount={7}
              interval={0}
            />

            <Area
              type='monotone'
              dataKey={"sales"}
              stroke='#ff7a37'
              fill='url(#colorSales)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAnalytics;
