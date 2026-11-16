# User Management System with Admin Dashboard

A full-stack MERN user management application with role-based access control (RBAC), JWT authentication with bcrypt password hashing, MongoDB database integration, and an administrative dashboard alongside a dedicated standard user portal.

Developed for the **Growth Tech India Minor Project Assignment**.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture & Directory Structure](#project-architecture--directory-structure)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Installation & Setup](#installation--setup)
- [Database Seeding & Default Demo Accounts](#database-seeding--default-demo-accounts)
- [Running the Application](#running-the-application)
- [Automated Testing](#automated-testing)
- [REST API Documentation](#rest-api-documentation)
- [Security Implementation](#security-implementation)
- [Screenshots & Visual Tour](#screenshots--visual-tour)
- [Troubleshooting & FAQ](#troubleshooting--faq)

---

## Project Overview

A complete User Management System designed with clean separation of concerns, robust API security, and an intuitive UI. Built using React, Vite, Bootstrap 5, Node.js, Express, and MongoDB.

### Core Highlights
* **Complete CRUD Operations:** Create, Read, Update, and Delete user accounts backed by MongoDB persistence.
* **Role-Based Portals & Route Protection:**
  * **Administrators** access the Admin Dashboard (`/dashboard`) and User Management directory (`/users`).
  * **Standard Users** are routed to their personal User Dashboard (`/user-dashboard` or `/profile`).
* **Live MongoDB Statistics:** Real-time metrics for total users, active accounts, inactive accounts, and administrators.
* **Administrative Safeguards:** Built-in safeguards preventing administrators from deleting their own account or deactivating themselves.
* **Responsive SaaS UI:** Mobile-friendly drawer navigation, data tables, and modal dialogs.

---

## Key Features

### 1. Authentication & Security
* **Public Registration (`/register`):** Creates accounts with full name, email, password, and password confirmation validation. All public signups are automatically provisioned with standard `user` permissions.
* **Secure Login (`/login`):** Validates email and password against salted `bcryptjs` hashes. Issues a signed JSON Web Token (JWT) on success.
* **Smart Role-Based Redirection:**
  * Administrator accounts &rarr; `/dashboard`
  * Standard user accounts &rarr; `/user-dashboard`
* **Session Verification & Logout:** Tokens are stored in browser storage and injected on requests via Axios interceptors. The logout function purges authentication tokens and resets client state.
* **Account Status Enforcement:** Deactivated (`inactive`) users are barred from logging in or querying protected endpoints.

### 2. Standard User Dashboard (`/user-dashboard`)
* Displays personal profile information: full name, email, assigned role, account status, and registration date.
* Clarifies permission boundaries (standard members cannot access administrative controls).
* Features user initials avatar and a sign-out button.

### 3. Administrator Dashboard (`/dashboard`)
* **Real-time Stat Cards:** Total Users, Active Users (with percentage ratio), Inactive Users, and Administrators.
* **System Breakdown:** Visual health ratio detailing active vs. inactive accounts.
* **Recent Registrations:** Quick table showing the 5 most recently created users with direct status toggle and edit buttons.
* **Quick Navigation:** One-click shortcuts to add new users or open the full user directory.

### 4. User Directory & CRUD Operations (`/users`)
* **Create (`/users/add`):** Provision a new user or administrator with custom temporary credentials and status.
* **Read Table:** Clean data table displaying user initials avatar, name, email, role badge (`Admin` in purple, `User` in blue), status pill (`Active` in green, `Inactive` in red), registration date, and actions.
* **Update (In-Place Modal):** Edit name, email, role, status, and optional new password without leaving the page.
* **Delete (Confirmation Modal):** Safe confirmation modal preventing accidental deletions. The delete button is disabled on the administrator's own account.
* **Status Toggle:** Single-click activation / deactivation toggle on each table row.
* **Live Search & Multi-Filters:** Instant search by name or email, filter by role (`All`, `Admin`, `User`), and filter by status (`All`, `Active`, `Inactive`).

---

## Technology Stack

### Frontend
* **Framework:** React.js (`^19.3.1`)
* **Build Tool:** Vite (`^8.3.6`)
* **Styling:** Bootstrap 5 (`^5.3.3`) + Custom CSS
* **Routing:** React Router DOM (`^7.18.5`)
* **HTTP Client:** Axios (`^1.21.1`)
* **Icons:** React Icons (`^5.7.0`)

### Backend
* **Runtime:** Node.js (`v22.x` ES Modules)
* **Framework:** Express.js (`^4.21.2`)
* **Authentication:** JSON Web Tokens (`jsonwebtoken ^9.0.2`)
* **Password Hashing:** `bcryptjs` (`^2.4.3`, 10 salt rounds)
* **Cross-Origin Handling:** `cors` (`^2.8.5`)
* **Environment Config:** `dotenv` (`^16.4.7`)

### Database
* **Database Engine:** MongoDB (MongoDB Atlas Cloud / Local MongoDB)
* **ODM:** Mongoose (`^8.9.5`)

---

## Project Architecture & Directory Structure

```text
User Management System/
├── backend/
│   ├── config/
│   │   └── db.js                 # Mongoose connection handler
│   ├── controllers/
│   │   ├── authController.js     # Register, login, me, and logout logic
│   │   └── userController.js     # User CRUD, stats aggregation, status toggle
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & active status validation
│   │   └── adminMiddleware.js    # Administrator role check
│   ├── models/
│   │   └── User.js               # Mongoose schema with pre-save hashing & methods
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   └── userRoutes.js         # /api/users protected admin routes
│   ├── scripts/
│   │   ├── seedAdmin.js          # Database seeder for demo accounts
│   │   ├── testSuite.js          # 17-point integration test suite
│   │   └── testRegistrationFlow.js # Registration & role-based routing tests
│   ├── .env                      # Backend environment variables (git-ignored)
│   ├── .env.example              # Sample environment template
│   ├── package.json              # Backend dependencies & scripts
│   └── server.js                 # Express application entrypoint
│
├── frontend/
│   ├── public/                   # Static icons & assets
│   ├── src/
│   │   ├── assets/               # Image assets and SVG logos
│   │   ├── components/
│   │   │   ├── ConfirmModal.jsx  # Reusable confirmation dialog for delete
│   │   │   ├── Navbar.jsx        # Admin topbar with user pill & logout
│   │   │   ├── ProtectedRoute.jsx# Role-aware route guard
│   │   │   ├── Sidebar.jsx       # Responsive navigation drawer
│   │   │   ├── StatCard.jsx      # Metrics card with custom scheme & icons
│   │   │   └── UserTable.jsx     # User data table with inline actions
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state and session provider
│   │   ├── pages/
│   │   │   ├── AddUser.jsx       # Dedicated user provisioning form
│   │   │   ├── Dashboard.jsx     # Admin overview with stats & recent activity
│   │   │   ├── Login.jsx         # Sign-in portal with demo credentials
│   │   │   ├── NotFound.jsx      # 404 error handler
│   │   │   ├── Register.jsx      # Public account registration
│   │   │   ├── UserDashboard.jsx # Dedicated Standard User Dashboard
│   │   │   └── Users.jsx         # Full CRUD user directory with search/filters
│   │   ├── services/
│   │   │   └── api.js            # Axios client with request/response interceptors
│   │   ├── App.jsx               # Router configuration & route declarations
│   │   ├── index.css             # Custom styling & Bootstrap overrides
│   │   └── main.jsx              # React DOM initialization
│   ├── .env                      # Frontend environment variables (git-ignored)
│   ├── .env.example              # Frontend sample env template
│   ├── package.json              # Frontend dependencies & scripts
│   └── vite.config.js            # Vite configuration
│
├── screenshots/
│   └── README.md                 # Screenshot checklist and capture instructions
├── .gitignore                    # Git exclusions protecting node_modules and .env
├── package.json                  # Root orchestrator scripts
└── README.md                     # Comprehensive documentation
```

---

## Environment Configuration

### Backend Environment (`backend/.env`)

Configure environment variables in `backend/.env`. A template is provided in `backend/.env.example`:

```env
PORT=5000

# MongoDB Atlas (Cloud) connection string:
MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.eahreeb.mongodb.net/user_management_db?retryWrites=true&w=majority

# Or local MongoDB instance:
# MONGO_URI=mongodb://127.0.0.1:27017/user_management_db

JWT_SECRET=<your_strong_jwt_secret_key>
JWT_EXPIRES_IN=7d

# Initial Admin Credentials (used by seed script)
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123

# Frontend origin for CORS
CLIENT_URL=http://localhost:5173
```

> **Security Note:** Real production secrets, database passwords, and private API keys are kept in local `.env` files and strictly excluded from version control via `.gitignore`.

### Frontend Environment (`frontend/.env`)

Configure the backend API URL in `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Installation & Setup

### 1. Clone or Open the Project
Ensure you are located in the project root:
```bash
cd "User Management System"
```

### 2. Install Dependencies

You can install dependencies for both projects:
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

---

## Database Seeding & Default Demo Accounts

Ensure your MongoDB Atlas cluster or local MongoDB instance is reachable. Then run the seed script:

```bash
# From project root:
npm run seed

# Or from backend folder:
cd backend && npm run seed
```

This ensures the following default demo accounts exist for evaluation:

| Account Type | Full Name | Email Address | Password | Role | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Administrator** | Admin User | `admin@example.com` | `Admin@123` | `admin` | `active` |
| **Administrator** | Tony Stark | `tony.stark@starkindustries.com` | `Password@123` | `admin` | `active` |
| **Standard User** | Sarah Connor | `sarah.connor@cyberdyne.io` | `Password@123` | `user` | `active` |
| **Standard User** | Michael Scott | `michael.scott@dundermifflin.com` | `Password@123` | `user` | `active` |
| **Standard User** | Dwight Schrute | `dwight.schrute@dundermifflin.com` | `Password@123` | `user` | `active` |
| **Standard User** | Pam Beesly | `pam.beesly@dundermifflin.com` | `Password@123` | `user` | `inactive` |
| **Standard User** | Jim Halpert | `jim.halpert@athlead.com` | `Password@123` | `user` | `active` |

---

## Running the Application

You can start the backend and frontend using either the root convenience scripts or by running them inside their respective directories:

### Option A: Using Root Convenience Commands (from project root)

**Terminal 1 (Backend API):**
```bash
npm run backend
# Server starts on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
npm run frontend
# Frontend runs on http://localhost:5173
```

---

### Option B: Using Directory Commands

**Terminal 1 (Backend API):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
```

Open your browser and navigate to: **`http://localhost:5173`**

---

## Automated Testing

The project includes automated integration test suites:

```bash
# Run complete test suite (from project root):
npm test

# Run registration & role-based routing tests:
node backend/scripts/testRegistrationFlow.js
```

Both test suites verify:
1. API Health Check
2. Admin authentication & JWT generation
3. Live MongoDB statistics aggregations
4. Public user registration and role enforcement
5. Role-based access control (blocking standard users with 403 Forbidden)
6. User search and multi-parameter filtering
7. User updates, status toggling, and inactive login rejection
8. Admin self-deletion safety guard
9. Standard user deletion

---

## REST API Documentation

### Base URL: `http://localhost:5000/api`

### 1. General & Authentication Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Public | Server health check and status verification |
| `POST` | `/api/auth/register` | Public | Register a new standard user (`role: user`) |
| `POST` | `/api/auth/login` | Public | Authenticate user and receive JWT token |
| `POST` | `/api/auth/logout` | Public | End user session notification |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current logged-in user profile |

### 2. User Management Endpoints (`/api/users`)
*All user endpoints require `Authorization: Bearer <token>` and `role: admin`.*

| Method | Endpoint | Access | Query / Body Params | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/users/stats` | Admin | None | Aggregated user metrics and recent 5 users |
| `GET` | `/api/users` | Admin | `?search=...&role=...&status=...` | List users with live search and filters |
| `GET` | `/api/users/:id` | Admin | URL parameter `:id` | Retrieve single user details by ID |
| `POST` | `/api/users` | Admin | `{ name, email, password, role, status }` | Provision a new user account |
| `PUT` | `/api/users/:id` | Admin | `{ name, email, role, status, password? }` | Update user profile, role, or password |
| `DELETE` | `/api/users/:id` | Admin | URL parameter `:id` | Delete user (prevents self-deletion) |
| `PATCH` | `/api/users/:id/status`| Admin | `{ status: "active" \| "inactive" }` | Toggle or set active status |

---

## Security Implementation

1. **Password Hashing:** Passwords are encrypted using `bcryptjs` with 10 salt rounds prior to saving to MongoDB.
2. **Stateless JWT Authentication:** Cryptographically signed tokens transmitted via `Bearer` authorization headers.
3. **Role Escalation Protection:** Public registrations force `role: 'user'`, barring unauthorized admin creation.
4. **Lockout Protection:**
   * Admins cannot delete their own account (enforced on both client and server).
   * Admins cannot deactivate their own account or remove their own admin privileges.
5. **Token Expiration Handling:** Axios client intercepts HTTP 401 responses, clears client storage, and prompts re-authentication.

---

## Screenshots & Visual Tour

Screenshots of all application interfaces are maintained in the [`screenshots/`](screenshots/) directory and have been verified:

| # | Screen Name | Description | Status |
| :-: | :--- | :--- | :---: |
| 1 | `01-login-page.png` | Centered authentication card with show/hide password and demo accounts | ✅ Verified (259 KB) |
| 2 | `02-dashboard-overview.png` | Admin Dashboard Overview with 4 MongoDB stat cards and recent users | ✅ Verified (81 KB) |
| 3 | `03-user-directory.png` | Full user directory with initials avatars, role pills, and status badges | ✅ Verified (78 KB) |
| 4 | `04-edit-user-modal.png` | In-place modal to modify user name, email, role, and status | ✅ Verified (98 KB) |
| 5 | `05-delete-confirmation.png` | Safety confirmation dialog before user deletion | ✅ Verified (91 KB) |
| 6 | `06-add-user.png` | Admin user creation form with role and status selection | ✅ Verified (73 KB) |
| 7 | `07-registration-page.png` | Public account registration with live validation | ✅ Verified (260 KB) |
| 8 | `08-user-dashboard.png` | Standard User Dashboard with welcome banner and profile details | ✅ Verified (66 KB) |

*Detailed screen descriptions and verification logs are available in [`screenshots/README.md`](screenshots/README.md).*

---

## Troubleshooting & FAQ

#### Q: How do I configure MongoDB Atlas?
1. In your MongoDB Atlas dashboard under **Network Access**, ensure your IP address is whitelisted (or choose **Allow Access From Anywhere (`0.0.0.0/0`)**).
2. Set your `MONGO_URI` in `backend/.env`.
3. Run `npm run seed` to initialize demo accounts.

#### Q: How do I test the Standard User vs. Administrator view?
* **For Admin View:** Log in with `admin@example.com` / `Admin@123` &rarr; You will land on `/dashboard`.
* **For Standard User View:** Register a new user at `/register` or log in with `sarah.connor@cyberdyne.io` / `Password@123` &rarr; You will land on `/user-dashboard`.

#### Q: Why can't I delete the Admin User?
This is an intentional security safeguard. You cannot delete the account you are currently logged in with. To delete an administrator account, log in with a different administrator (e.g. `tony.stark@starkindustries.com`).
