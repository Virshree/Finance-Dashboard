import React, { useState, useEffect } from "react";
import { addTransaction } from "../api/transactionApi";

function AddTransactionModal({ isOpen, onClose, onSave, editData }) {
  const initialForm = {
    date: "",
    amount: "",
    category: "",
    transaction: "",
    type: "expense",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm(initialForm);
    }
  }, [editData]);

  function validate() {
    let newErrors = {};

    if (!form.date) newErrors.date = "Date is required";

    if (!form.transaction.trim())
      newErrors.transaction = "Transaction is required";

    if (!form.amount) newErrors.amount = "Amount is required";
    else if (Number(form.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!form.category.trim()) newErrors.category = "Category is required";

    return newErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const transactionData = {
      transaction: form.transaction,
      category: form.category,
      amount: Number(form.amount),
      date: form.date,
      type: form.type,
 
    };

    try {
      // POST JSON SERVER
      const response = await addTransaction(transactionData);

      console.log("Added:", response);

      // update parent state
      onSave(response);

      setErrors({});
      setForm(initialForm);

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-5 rounded-xl w-[320px]">
        <h2 className="font-bold mb-3">
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <input
          type="date"
          value={form.date}
          className="border m-2 p-2 rounded w-full"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}

        <input
          type="text"
          placeholder="Transaction name"
          value={form.transaction}
          className="border m-2 p-2 rounded w-full"
          onChange={(e) => setForm({ ...form, transaction: e.target.value })}
        />

        {errors.transaction && (
          <p className="text-red-500 text-sm">{errors.transaction}</p>
        )}

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          className="border m-2 p-2 rounded w-full"
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount}</p>
        )}

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          className="border m-2 p-2 rounded w-full"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}

        <select
          value={form.type}
          className="border m-2 p-2 rounded w-full"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>

          <option value="income">Income</option>
        </select>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white rounded-xl p-2 flex-1"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 rounded-xl p-2 flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;
