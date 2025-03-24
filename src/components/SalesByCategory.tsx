/** @format */

import React, { useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

// بيانات مختلفة لكل مدة
const salesData = {
  weekly: [
    { name: "Clothing", value: 300, fill: "#15cab8" },
    { name: "Lingerie & Nightwear", value: 150, fill: "#e2362f" },
    { name: "Body Fit", value: 100, fill: "#fec600" },
    { name: "Sportswear", value: 120, fill: "#ff8548" },
    { name: "Accessories", value: 180, fill: "#44a6e9" },
  ],
  monthly: [
    { name: "Clothing", value: 1200, fill: "#15cab8" },
    { name: "Lingerie & Nightwear", value: 800, fill: "#e2362f" },
    { name: "Body Fit", value: 500, fill: "#fec600" },
    { name: "Sportswear", value: 700, fill: "#ff8548" },
    { name: "Accessories", value: 900, fill: "#44a6e9" },
  ],
  yearly: [
    { name: "Clothing", value: 14000, fill: "#15cab8" },
    { name: "Lingerie & Nightwear", value: 9000, fill: "#e2362f" },
    { name: "Body Fit", value: 6000, fill: "#fec600" },
    { name: "Sportswear", value: 8500, fill: "#ff8548" },
    { name: "Accessories", value: 7500, fill: "#44a6e9" },
  ],
};

const SalesByCategory = () => {
  // الحالة الافتراضية للمدة هي "weekly"
  const [timeRange, setTimeRange] = useState("weekly");
  const [chartData, setChartData] = useState(salesData.weekly);

  // تحديث البيانات عند تغيير المدة
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = e.target.value as keyof typeof salesData;
    setTimeRange(selectedRange);
    setChartData(salesData[selectedRange]); // تحديث البيانات بناءً على الاختيار
  };

  return (
    <div>
      {/* العنوان واختيار الفلتر */}
      <div className='mb-4 flex justify-between'>
        <h2 className='text-2xl font-medium dark:text-white'>
          Sales Analytics
        </h2>
        <select
          className='border-none outline-none p-2 rounded-md bg-gray-50 text-gray-400'
          value={timeRange}
          onChange={handleTimeRangeChange}>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
      </div>

      {/* المخطط والقائمة الجانبية */}
      <div className='w-full h-[300px] flex'>
        {/* القسم الأول: المخطط الدائري */}
        <div className='w-1/2 h-full'>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={100}
                label={false}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              {/* المجموع في المنتصف */}
              <text
                className='dark:fill-white'
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                fontSize={20}
                fontWeight='bold'
                fill='#333'>
                ${chartData.reduce((a, b) => a + b.value, 0)}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* القسم الثاني: القائمة الجانبية */}
        <div className='w-1/2 h-full flex flex-col gap-5'>
          {chartData.map((item, i) => (
            <div key={i}>
              <div className='flex justify-between items-center dark:text-white text-lg font-medium'>
                <div className='flex gap-2 items-center'>
                  {/* ✅ تصحيح لون الدائرة */}
                  <span
                    className='w-2 h-2 rounded-full'
                    style={{ backgroundColor: item.fill }}
                  />
                  <h2>{item.name}</h2>
                </div>
                <span>${item.value}</span>
              </div>
              <h3 className='text-[10px] text-gray-400 ml-5'>
                890 Category products
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesByCategory;
