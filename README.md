
# Payment Management System (MERN Stack)

This is a full-stack web application built using the **MERN** (MongoDB, Express, React, Node.js) stack.  
The application consists of four main pages:

1. **Customer Page** – Manage customer details (Create, Read, Update, Delete)  
2. **Product Page** – Manage product/device details  
3. **Stock Page** – Manage and track product stock  
4. **Payment Page** – Manage payments linked with customers and products  

Each page supports **CRUD operations** to create, view, update, and delete entries.

---

## ✨ Features

- Create, view, edit, and delete **customers**, **products**, **stocks**, and **payments**
- Link **payments** with respective **customers** and **products**
- Easy navigation between the four sections
- Responsive and user-friendly UI built with **React**
- Backend server using **Node.js** and **Express**
- Data stored and managed in **MongoDB**
- **API integration** using Axios

---

## 🛠 Tech Stack

| Frontend | Backend | Database | Tools |
|:--------:|:-------:|:--------:|:-----:|
| React.js | Node.js | MongoDB  | Postman |
| Axios    | Express.js | Mongoose ODM | Git, GitHub |
| CSS      |          |          |         |

---



## 📁 Folder Structure

```
root
│
├── backend
│   ├── models
│   ├── routes
│   ├── controllers
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── CustomerPage.jsx
│   │   │   ├── ProductPage.jsx
│   │   │   ├── StockPage.jsx
│   │   │   └── PaymentPage.jsx
│   │   ├── App.jsx
│   │   ├── api
│   │   └── ...
│   └── public
│
└── README.md
```

---

## 📡 API Endpoints

| Method | Endpoint               | Description |
|:------:|:----------------------- |:----------- |
| GET    | /api/customers           | Get all customers |
| POST   | /api/customers           | Add new customer |
| PUT    | /api/customers/:id       | Update customer |
| DELETE | /api/customers/:id       | Delete customer |
| GET    | /api/products            | Get all products |
| POST   | /api/products            | Add new product |
| PUT    | /api/products/:id        | Update product |
| DELETE | /api/products/:id        | Delete product |
| GET    | /api/stocks              | Get stock entries |
| POST   | /api/stocks              | Add stock details |
| PUT    | /api/stocks/:id          | Update stock |
| DELETE | /api/stocks/:id          | Delete stock |
| GET    | /api/payments            | Get all payments |
| PUT    | /api/payments/:id        | Update payment |
| DELETE | /api/payments/:id        | Delete payment |

---

## 🎯 Future Improvements

- Add authentication (JWT) for secure routes
- Search, filter, and pagination for data tables
- Dashboard with analytics
- Admin user roles and permissions

---



