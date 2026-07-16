# 💰 Finance Dashboard (React + Supabase)

A responsive Finance Dashboard built using React, Tailwind CSS, and Supabase, featuring transaction management, analytics, charts, role-based UI, and dark/light mode.

---

## 🚀 Features

* 📊 Dashboard Overview
* 📈 Analytics & Monthly Trends
* ➕ Add Transactions
* ✏️ Edit Transactions
* 🗑️ Delete Transactions
* ☁️ Supabase Database Integration
* 🌙 Dark / Light Mode
* 👥 Role-based UI (Admin / Viewer)
* 📱 Fully Responsive Design
* 📊 Interactive Charts using Recharts
* 🔄 Real-time CRUD Operations

---

# 🚀 Tech Stack

# Frontend
* React.js
* Tailwind CSS
* Material UI
* React Icons
* Recharts

# Backend / Database
* Supabase
* Supabase JavaScript Client

# Deployment
* Vercel
* Supabase Cloud Database
---

# 🧠 Key Concepts Used

* React Hooks (useState, useEffect)
* Component-based architecture
* CRUD Operations with Supabase
* Responsive UI
* Conditional Rendering
* Form Handling
* Chart Visualization
* Dark / Light Mode

---


# 📊 Database Schema

- The project stores transaction data inside a Supabase table.

| Column      | Type |
| ----------- | ---- |
| id          | int8 |
| transaction | text |
| category    | text |
| amount      | int8 |
| type        | text |
| date        | date |

--- 

# 📊 Dashboard Features
# Dashboard Overview
* Total Income
* Total Expenses
* Balance
* Recent Transactions

# Analytics
* Income vs Expense
* Category Distribution
* Financial Summary

# Trends
* Monthly Income
* Monthly Expenses
* Line Chart Visualization

---
# 📈 Charts

* Built using Recharts.

* Pie Chart
- Income vs Expense
* Line Chart
- Monthly Financial Trends

Charts automatically update whenever transactions are added, edited, or deleted.


--- 
# ⚠️ Challenges & Solutions
# Problem

* Local json-server was not suitable for production deployment.

# Solution

Migrated the project to Supabase, providing:

* Persistent cloud database
* Full CRUD operations
* Easy deployment with Vercel
* No need to run a local backend

# Problem

Responsive layout issues on mobile.

Solution
* Horizontal scrolling
* Responsive grids
* Optimized spacing

Problem

Inconsistent transaction keys (Type vs type).

Solution

Standardized all transaction objects.

---

# 🚀 Future Enhancements
* 🔐 User Authentication
* 📊 Category-wise Charts
* 📅 Weekly Reports
* 📤 CSV Export
* 📥 PDF Reports
* 🔍 Advanced Filters & Search
* 💳 Budget Tracking

---

🛠 Installation

git clone https://github.com/Virshree/Finance-Dashboard.git

cd Finance-Dashboard

npm install

npm run dev
# 📸 Screenshots


### Dashboard
![Dashboard](./screenshots/dark.png)

![Dashboard](./screenshots/light.png)

![Dashboard](./screenshots/add.png)

![Dashboard](./screenshots/adddetail.png)

![Dashboard](./screenshots/edit.png)

### Analytics Page
![Analytics](./screenshots/darkanalytics.png)

![Analytics](./screenshots/darkanalytics1.png)

![Analytics](./screenshots/analyticslight.png)

### Charts View
![Charts](./screenshots/trendsdark.png)

![Charts](./screenshots/trendslight.png)

![Charts](./screenshots/trendsdark1.png)

### Role - Viewer

![Dashboard](./screenshots/viewerdark.png)

![Dashboard](./screenshots/viewerlight.png)

### Mobile View

![Dashboard](./screenshots/mobile1.png)

![Dashboard](./screenshots/mobile2.png)

![Dashboard](./screenshots/mobile3.png)

## 💡 Author

Virshree Desai
Frontend Developer (React)

---
