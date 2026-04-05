import React, { useState, useEffect } from "react";

function AddTransactionModal({ isOpen, onClose, onSave, editData }) {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  // 🔥 Validation function
  function validate() {
    let newErrors = {};

    if (!form.date) newErrors.date = "Date is required";
    if (!form.amount) newErrors.amount = "Amount is required";
    else if (Number(form.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!form.category.trim())
      newErrors.category = "Category is required";

    return newErrors;
  }

  function handleSave() {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // ❌ stop save
    }

    onSave({
      ...form,
      amount: Number(form.amount),
      type: form.type.toLowerCase(),
    });

    setErrors({});
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-5 rounded-xl w-[320px] flex flex-col">
        
        <h2 className="font-bold mb-3">
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Date */}
        <input
          type="date"
          value={form.date}
          className="border m-2 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />
        {errors.date && (
          <span className="text-red-500 text-sm ml-2">{errors.date}</span>
        )}

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          className="border m-2 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />
        {errors.amount && (
          <span className="text-red-500 text-sm ml-2">{errors.amount}</span>
        )}

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          className="border m-2 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />
        {errors.category && (
          <span className="text-red-500 text-sm ml-2">{errors.category}</span>
        )}

        {/* Type */}
        <select
          value={form.type}
          className="border m-2 p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
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