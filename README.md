# 📚 Book Store – Full Stack Web Application

![React](https://img.shields.io/badge/React-18-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![Node](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![Tailwind](https://img.shields.io/badge/UI-TailwindCSS-cyan)
![Status](https://img.shields.io/badge/Status-Active-success)

A **modern, scalable, full-stack Book Store application** built using **React, Redux Toolkit, Node.js, Express.js, MongoDB, and Tailwind CSS**.  
This project demonstrates **real-world full-stack architecture**, authentication, role-based access, and clean UI design.

---

## 🚀 Features

### 👤 User Features
- User authentication (Login / Register)
- Browse books with detailed view
- Add books to cart
- Wishlist (favorites)
- Responsive UI (mobile & desktop)

### 🛠️ Admin Features
- Admin role management
- Add / update / delete books
- Manage users
- Secure admin routes

### ⚙️ Technical Highlights
- Redux Toolkit for global state
- JWT-based authentication
- RESTful API architecture
- MongoDB with Mongoose
- Tailwind CSS for fast styling
- Clean folder structure

---

## 🧑‍💻 Tech Stack

### Frontend
- **React**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Tailwind CSS**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT Authentication**
- **Bcrypt**

---

## 📂 Project Structure

```text
Book-Store/
│
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & role middleware
│   ├── config/          # DB & environment config
│   └── server.js        # Entry point
│
├── frontend/
│   ├── components/      # Reusable components
│   ├── pages/           # App pages
│   ├── store/           # Redux store & slices
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
