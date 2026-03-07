# Divyanshi Digital Solution

A modern, mobile-friendly web app for **Divyanshi Digital Solution** — a CSC (Common Service Centre) / Cyber Café.

## Tech Stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Frontend | React 18 + Tailwind CSS    |
| Backend  | Node.js + Express          |
| Database | MongoDB (Mongoose ODM)     |
| Build    | Vite                       |

## Features

- **Home Page** — Hero section + 10 service cards (PAN, Aadhaar, AEPS, Insurance, Courier, etc.)
- **Book Service** — Public form → stores request in MongoDB
- **Admin Panel** — JWT-authenticated dashboard with search, status toggle, delete & CSV export
- **Contact Page** — Phone, Email, WhatsApp quick-link
- **Toast Notifications** on form submission
- **Mobile responsive** with blue + white CSC theme

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB running locally on `mongodb://127.0.0.1:27017`

### Install

```bash
npm run install:all
```

### Run in development

```bash
npm run dev
```

This starts the backend on **port 5000** and the React dev server on **port 3000** (proxied to backend).

### Admin Credentials

| Field    | Value      |
| -------- | ---------- |
| Username | `admin`    |
| Password | `admin123` |

> Change these in `server/.env` for production.

## Project Structure

```
CSC/
├── client/            # React + Tailwind frontend
│   ├── src/
│   │   ├── components/   # Navbar, Footer, ServiceCard
│   │   ├── context/      # AuthContext
│   │   ├── pages/        # Home, BookService, Contact, AdminLogin, AdminDashboard
│   │   ├── api.js        # Axios instance
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/            # Express backend
│   ├── models/           # ServiceRequest model
│   ├── routes/           # auth, requests
│   ├── middleware/        # JWT auth middleware
│   ├── index.js
│   └── .env
└── package.json       # Root scripts (concurrently)
```

## API Endpoints

| Method | Endpoint                      | Auth  | Description           |
| ------ | ----------------------------- | ----- | --------------------- |
| POST   | `/api/auth/login`             | No    | Admin login           |
| POST   | `/api/requests`               | No    | Create service request|
| GET    | `/api/requests`               | Admin | List all (with search)|
| PATCH  | `/api/requests/:id/status`    | Admin | Toggle status         |
| DELETE | `/api/requests/:id`           | Admin | Delete request        |
| GET    | `/api/requests/export/csv`    | Admin | Export CSV            |
