import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { AiOutlineLineChart } from "react-icons/ai";

function Navbar({ activeTab, setActiveTab, dark, setDark, role, setRole }) {
  const tabs = [
    { name: "dashboard", icon: <MdDashboard size={12} /> },
    { name: "analytics", icon: <FaChartBar size={12} /> },
    { name: "trends", icon: <AiOutlineLineChart size={12} /> },
  ];

  return (
    <div className="flex flex-col w-full justify-between md:flex-row md:items-center md:justify-between gap-4 mb-6">
      
      {/* Title */}
      <h1 className="text-2xl font-bold">Finance Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2  whitespace-nowrap capitalize px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 ${
              activeTab === tab.name
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white text-black hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          > 
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex gap-5 items-center cursor-pointer">
        
        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`cursor-pointer ${
            dark ? "bg-gray-900 text-white" : "bg-white text-black"
          } p-2 rounded border`}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Dark Mode */}
        <button
          onClick={() => setDark(!dark)}
          className=" cursor-pointer px-3 py-1 rounded bg-gray-800 text-white"
        >
          {dark ? "☀️" : "🌙"}
        </button>

      </div>
    </div>
  );
}

export default Navbar;