import { useState, useEffect } from "react";

import SummaryCards from "./components/SummaryCards";
import TransactionTable from "./components/TransactionTable";
import CategoryPieChart from "./components/CategoryPieChart";
import AddTransactionModal from "./components/AddTransactionModal";
import Insights from "./components/Insights";
import Navbar from "./components/Navbar";
import MonthlyTrends from "./components/MonthlyTrends";
import { motion } from "framer-motion";
import { getTransactions } from "./api/transactionApi";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("admin");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();

      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }
  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  return (
    <div
      className={`p-6 min-h-screen ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* 🔥 NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dark={dark}
        setDark={setDark}
        role={role}
        setRole={setRole}
      />

      {/* ================= DASHBOARD ================= */}
      {activeTab === "dashboard" && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SummaryCards transactions={transactions} />
          </motion.div>

          <div className="grid md:grid-cols-3 md:flex justify-end   gap-4 mt-6">
            {role === "admin" && (
              <button
                onClick={() => {
                  setEditItem(null);
                  setModalOpen(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded shadow cursor-pointer"
              >
                + Add Transaction
              </button>
            )}
          </div>

          <div className="mt-6">
            <TransactionTable
              transactions={transactions}
              role={role}
              onEdit={(t) => {
                setEditItem(t);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              dark={dark}
            />
          </div>
        </>
      )}

      {/* ================= ANALYTICS ================= */}
      {activeTab === "analytics" && (
        <div className="mt-6">
          <h2 className="text-xl  font-semibold mb-4">Analytics</h2>
          <CategoryPieChart transactions={transactions} dark={dark} />
          <Insights transactions={transactions} dark={dark} />
        </div>
      )}

      {/* ================= TRENDS ================= */}
      {activeTab === "trends" && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Trends</h2>
          <MonthlyTrends transactions={transactions} dark={dark} />
        </div>
      )}

      {/* 🔥 MODAL (VERY IMPORTANT) */}
      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
        }}
        onSave={handleAddTransaction}
        editData={editItem}
      />
    </div>
  );
}

export default App;
