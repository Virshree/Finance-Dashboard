import React from "react";

function Navbar({ activeTab, setActiveTab, dark, setDark, role, setRole }) {
  const tabs = ["dashboard", "analytics", "trends"];

  return (
    <div className="flex flex-col w-full justify-between md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold">Finance Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize px-3 py-1 rounded transition ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-white cursor-pointer"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex gap-7     cursor-pointer ">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`${dark ? "bg-gray-950 text-white":"bg-white  text-black"}  p-2 rounded border cursor-pointer`}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 rounded bg-gray-800 text-white cursor-pointer"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
