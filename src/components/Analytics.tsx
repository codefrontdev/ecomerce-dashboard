/** @format */

import { FC, useEffect, useState } from "react";
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
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getSales } from "../features/analyticsSlice";
import { AnalyticsSales } from "../types/analytics";

// ✅ دالة لإنشاء بيانات الأسبوع بشكل ديناميكي
export const generateWeeklyData = () => {
  const weekData = [];
  for (let i = 6; i >= 0; i--) {
    const date = moment().subtract(i, "days").format("DD MMM"); // "13 Mar"
    weekData.push({ date, sales: Math.floor(Math.random() * 10000) + 2000 });
  }

  return weekData;
};


interface AnalyticsProps {
  title: string;
  options: string[]
}

const Analytics: FC<AnalyticsProps> = ({ title, options }) => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.analytics.sales);
  const [timeRange, setTimeRange] = useState(AnalyticsSales.weekly);


  
  const formatSales = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`; 
    }
    return value;
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value as AnalyticsSales);
    
  };

  useEffect(() => {
    if (timeRange) {
      dispatch(getSales(timeRange));
      
    }
  }, [dispatch,timeRange]);

  return (
    <div className="">
      {/* قائمة اختيار المدة الزمنية */}

      <SelectOptions
        handleRange={handleTimeRangeChange}
        range={timeRange}
        title={title}
        options={options}
      />
      

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height={"100%"}>
          <AreaChart data={data.data.sales} className="">
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#ff9662" stopOpacity={0.8} />
                <stop offset="97%" stopColor="#ff9662" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey={data.data.period === "weekly" ? "date" : "month"}
              className="text-gray-500 !w-full mx-5"
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
              strokeDasharray="3 3"
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
                    <div className="px-4 rounded-md bg-orange-400">
                      <p className="text-gray-700">
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
              className="text-gray-500 !w-full mx-5"
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
              type="monotone"
              dataKey={"sales"}
              stroke="#ff7a37"
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
