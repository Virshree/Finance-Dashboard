import React from "react";
import { FaWallet } from "react-icons/fa";
import { IoArrowUpCircle, IoArrowDownCircle } from "react-icons/io5";

function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type.toLowerCase() === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = transactions
    .filter((t) => t.type.toLowerCase() === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const balance = income - expense;

  const format = (num) => new Intl.NumberFormat("en-IN").format(num);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* BALANCE */}
      <div className=" cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <p className=" text-xl opacity-80">Total Balance</p>
          <FaWallet size={28} />
        </div>
        <h2 className="text-3xl font-bold mt-4">₹{format(balance)}</h2>
      </div>

      {/* INCOME */}
      <div className="cursor-pointer bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <p className="text-xl opacity-80">Income</p>
          <IoArrowUpCircle size={30} />
        </div>
        <h2 className="text-3xl font-bold mt-4">₹{format(income)}</h2>
      </div>

      {/* EXPENSE */}
      <div className=" cursor-pointer bg-gradient-to-br from-red-400 to-red-600 text-white p-6 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <p className="text-xl opacity-80">Expenses</p>
          <IoArrowDownCircle size={30} />
        </div>
        <h2 className="text-3xl font-bold mt-4">₹{format(expense)}</h2>
      </div>
    </div>
  );
}

export default SummaryCards;
