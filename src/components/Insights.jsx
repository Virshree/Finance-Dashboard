import React from "react";

function Insights({ transactions, dark }) {
  if (!transactions.length) return <p>No data</p>;

  let totalIncome = 0;
  let totalExpense = 0;

  const categoryCount = {};
  let maxExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;

      // category total
      categoryCount[t.category] = (categoryCount[t.category] || 0) + t.amount;

      // highest expense
      if (t.amount > maxExpense) {
        maxExpense = t.amount;
      }
    }
  });

  const balance = totalIncome - totalExpense;

  const topCategory = Object.keys(categoryCount).reduce((a, b) =>
    categoryCount[a] > categoryCount[b] ? a : b
  );

  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
      : 0;

  return (
    <div
      className={` mt-5 p-4 rounded-2xl shadow ${
        dark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="font-semibold mb-3 text-xl">Insights</h2>

      <div className="space-y-2 ">
        <p>💰 Total Income: ₹{totalIncome}</p>
        <p>💸 Total Expense: ₹{totalExpense}</p>
        <p>📊 Balance: ₹{balance}</p>

        <p>🏆 Top Category: {topCategory}</p>
        <p>🔥 Highest Expense: ₹{maxExpense}</p>

        <p>📈 Savings Rate: {savingsRate}%</p>
      </div>
    </div>
  );
}

export default Insights;
