import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function TransactionTable({ transactions, onEdit, onDelete, dark }) {
  return (
    <div className="w-full px-3 sm:px-6">
      <div
        className={`mt-6 rounded-2xl p-4 sm:p-6 shadow-xl ${
          dark
            ? "bg-gray-900 text-white border border-gray-800"
            : "bg-white text-black border border-gray-200"
        }`}
      >
        {/* 🔹 Header */}
        <h2
          className={`text-xl font-semibold mb-4 ${
            dark ? "text-white" : "text-black"
          }`}
        >
          Transactions
        </h2>

        {/* 🔹 Table */}
        <div className="overflow-x-auto">
          <table
            className={`w-full min-w-[700px] text-sm ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {/* 🔹 Table Head */}
            <thead>
              <tr
                className={`border-b ${
                  dark
                    ? "border-gray-700 text-gray-400"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                <th className="text-left py-3">Type</th>
                <th className="text-left py-3">Transaction</th>
                <th className="text-left py-3">Category</th>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>

            {/* 🔹 Table Body */}
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className={`border-b transition ${
                    dark
                      ? "border-gray-800 hover:bg-gray-800"
                      : "border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {/* 🔹 Type */}
                  <td className="py-3">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                        t.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {t.type === "income" ? "↗" : "↘"}
                    </div>
                  </td>

                  {/* 🔹 Transaction Name */}
                  <td
                    className={`py-3 font-medium ${
                      dark ? "text-white" : "text-black"
                    }`}
                  >
                    {t.transaction}
                  </td>

                  {/* 🔹 Category */}
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        dark
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {t.category}
                    </span>
                  </td>

                  {/* 🔹 Date */}
                  <td className="py-3">{t.date}</td>

                  {/* 🔹 Amount */}
                  <td
                    className={`py-3 font-semibold ${
                      t.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}₹{t.amount}
                  </td>

                  {/* 🔹 Status */}
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        dark
                          ? "bg-green-900 text-green-400"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      Successful
                    </span>
                  </td>

                  {/* 🔹 Actions */}
                  <td className="py-3 flex gap-3">
                    <FaEdit
                      onClick={() => onEdit(t)}
                      className="cursor-pointer hover:text-blue-500"
                    />
                    <FaTrash
                      onClick={() => onDelete(t.id)}
                      className="cursor-pointer hover:text-red-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔹 Empty State */}
        {transactions.length === 0 && (
          <p className="text-center mt-4 text-gray-400">
            No transactions found
          </p>
        )}
      </div>
    </div>
  );
}

export default TransactionTable;