/** @format */

import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getSalesByCategory } from "../features/analyticsSlice";
import { AnalyticsSales } from "../types/analytics";
import SelectOptions from "./SelectOptions";

const COLORS = [
  "#15cab8",
  "#e2362f",
  "#fec600",
  "#ff8548",
  "#44a6e9",
  "#8e44ad",
  "#1abc9c",
  "#3498db",
];

const SalesByCategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const { salesByCategory, loading } = useSelector(
    (state: RootState) => state.analytics
  );
  const [timeRange, setTimeRange] = useState<AnalyticsSales>(AnalyticsSales.weekly);

  // جلب البيانات عند تغيير المدة
  useEffect(() => {
    dispatch(getSalesByCategory(timeRange));
  }, [dispatch, timeRange]);

  const chartData = salesByCategory?.data.sales || [];

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value as AnalyticsSales);
  };

  return (
    <div>
      <SelectOptions
        handleRange={handleTimeRangeChange}
        range={timeRange}
        title={"Sales By Category"}
        options={["weekly", "monthly", "yearly"]}
      />

      {chartData.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <p className="dark:text-white">No data available</p>
        </div>
      )}
      {chartData.length > 0 && (
        <div className="w-full h-[300px] flex">
          {/* الرسم البياني */}
          <div className="w-1/2 h-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  label={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={20}
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  ${chartData.reduce((acc, item) => acc + item.value, 0)}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* القائمة الجانبية */}
          <div className="w-1/2 h-full flex flex-col gap-5">
            {chartData.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center dark:text-white text-lg font-medium">
                  <div className="flex gap-2 items-center">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <h2>{item.name}</h2>
                  </div>
                  <span>${item.value}</span>
                </div>
                <h3 className="text-[10px] text-gray-400 ml-5">
                  ${item.productsCount} Category products
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && <p className="text-center text-gray-400 mt-4">Loading...</p>}
    </div>
  );
};

export default SalesByCategory;
