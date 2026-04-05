import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { FaDownload, FaEdit, FaTrash } from "react-icons/fa";

function TransactionTable({ transactions, role, onEdit, onDelete, dark }) {
  const [searchText, setSearchText] = useState("");

  // 🔍 Filter logic
  const filteredRows = transactions.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => `₹${params.value}`,
    },
    { field: "type", headerName: "Type", flex: 1 },

    ...(role === "admin"
      ? [
          {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (params) => (
              <div className="flex gap-3">
                <FaEdit
                  onClick={() => onEdit(params.row)}
                  className="cursor-pointer text-blue-500 m-3"
                />
                <FaTrash
                  onClick={() => onDelete(params.row.id)}
                  className="cursor-pointer text-red-500 m-3"
                />
              </div>
            ),
          },
        ]
      : []),
  ];

  function exportJSON() {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.json";
    link.click();
  }

  function exportCSV() {
    const headers = ["Date", "Category", "Amount", "Type"];

    const rows = transactions.map((t) =>
      [t.date, t.category, t.amount, t.type].join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  }
  return (
    <div className="h-[400px] w-full">
      <div
        className={`mt-6 p-4 rounded shadow ${
          dark ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="mb-3 font-semibold">Transactions</h2>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search transactions..."
          className="mb-4 p-2 border rounded w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div style={{ height: 400, width: "100%" }}>
          <div className="flex justify-end m-3 ">
            <FaDownload className="cursor-pointer text-blue-500 m-2 "/>
            <button
              onClick={exportCSV}
              className={`  dark ? "bg-gray-800 text-white" : "bg-white text-black" cursor-pointer`}
            >
              Export CSV
            </button>
            <FaDownload className="cursor-pointer text-blue-500 m-2 "/>
            <button
              onClick={exportJSON}
              className={`dark ? "bg-gray-800 text-white" : "bg-white text-black" cursor-pointer`}
            >
              Export JSON
            </button>
          </div>

          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              border: "none",

              // 🔥 Background + Text
              backgroundColor: dark ? "#1f2937" : "#ffffff",
              color: dark ? "#ffffff" : "#000000",

              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: dark ? "#111827" : "#f3f4f6",
              },

              "& .MuiDataGrid-columnHeaderTitle": {
                color: dark ? "black " : "#000000 ",
                fontWeight: "600",
              },

              "& .MuiDataGrid-iconButtonContainer": {
                color: dark ? "#ffffff" : "#000000",
              },
              // 🔥 Rows
              "& .MuiDataGrid-row": {
                backgroundColor: dark ? "#1f2937" : "#ffffff",
              },

              // 🔥 Hover effect
              "& .MuiDataGrid-row:hover": {
                backgroundColor: dark ? "#374151" : "#f9fafb",
              },

              // 🔥 Cells border
              "& .MuiDataGrid-cell": {
                borderBottom: dark ? "1px solid #374151" : "1px solid #e5e7eb",
              },

              // 🔥 Footer (pagination)
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: dark ? "#111827" : "#f3f4f6",
              },

              "& .MuiTablePagination-root": {
                color: dark ? "#ffffff !important" : "#000000 !important",
              },

              "& .MuiSelect-select": {
                color: dark ? "#ffffff" : "#000000",
              },

              "& .MuiSvgIcon-root": {
                color: dark ? "#ffffff" : "#000000",
              },
              "& .MuiCheckbox-root": {
                color: dark ? "#9ca3af" : "#6b7280", // default
              },
              "& .MuiCheckbox-root.Mui-checked": {
                color: dark ? "#60a5fa" : "#2563eb", // checked color
              },

              // 🔥 Selected row
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor: dark
                  ? "#374151 !important"
                  : "#e0f2fe !important",
              },

              // 🔥 Hover on selected row
              "& .MuiDataGrid-row.Mui-selected:hover": {
                backgroundColor: dark
                  ? "#4b5563 !important"
                  : "#bae6fd !important",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
