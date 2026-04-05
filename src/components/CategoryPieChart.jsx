import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 🎯 Percentage label
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
    >
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

function CategoryPieChart({ transactions, dark }) {
  const [filter, setFilter] = useState("expense"); // expense | income | all

  // 🔥 Filter + Group Data
  const data = Object.values(
    transactions
      .filter((t) => filter === "all" || t.type === filter)
      .reduce((acc, t) => {
        const key = t.category;

        if (!acc[key]) {
          acc[key] = { name: key, value: 0 };
        }

        acc[key].value += t.amount;
        return acc;
      }, {})
  );

  const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6"];

  return (
    <div
      className={`p-4 rounded-2xl shadow ${
        dark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* 🔥 Title */}
      <h2 className="mb-3 font-semibold text-lg">Spending Breakdown</h2>

      {/* 🔥 Filter Buttons */}
      <div className="flex gap-2 mb-3 ">
        {["expense", "income", "all"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 rounded text-sm capitalize cursor-pointer ${
              filter === type
                ? "bg-blue-500 text-white"
                : dark
                ? "bg-gray-700"
                : "bg-gray-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 🔥 Chart */}
      {data.length === 0 ? (
        <p className="text-gray-400">No data</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategoryPieChart;
