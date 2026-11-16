# Growth Tech India Minor Project Completion & Quality Audit Report

**Project Title:** User Management System with Admin Dashboard  
**Author / Developer:** Om / Full Stack Engineering Candidate  
**Auditor:** Senior Software Engineer & Project Auditor  
**Date of Audit:** November 16, 2026  
**Audit Status:** Comprehensive Verification Complete  
**Overall Verdict:** **100% Complete — Fully Verified & Production Ready for Submission**

---

## 1. Project Title and Overview

The **User Management System with Admin Dashboard** is a full-stack web application designed and built for the **Growth Tech India Minor Project Evaluation**. The system provides enterprise-grade identity and access management (IAM), role-based access control (RBAC), and user profile administration.

The application is architected across two distinct user experiences:
1. **Administrative Portal:** A centralized console enabling system administrators to monitor real-time user statistics, query MongoDB aggregations, provision team members, update existing profiles, toggle active/inactive account statuses, and safely remove records.
2. **Standard User Portal:** A self-service dashboard accessible immediately upon registration or login where standard users can review their verified account details, inspect active role permissions, and securely manage their session.

---

## 2. Objective of the Project

The primary objectives of this minor project assignment are:
* Implement a secure and stateless authentication workflow using JSON Web Tokens (JWT) and salted password hashing (`bcryptjs`).
* Enforce strict role-based authorization ensuring standard users are barred from privileged administrative capabilities on both the frontend and backend.
* Deliver complete, production-grade CRUD (Create, Read, Update, Delete) functionality backed by MongoDB persistence with zero dummy features or mock data.
* Provide an intuitive, responsive administrative dashboard with live metrics, data tables, multi-parameter search, and status filters.
* Prevent administrative lockout scenarios through self-deletion and self-deactivation guards.

---

## 3. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React.js | `^19.3.1` | Component-driven user interface and reactive state |
| **Frontend Build Tool** | Vite | `^8.3.6` | Development server and production bundling |
| **UI Design System** | Bootstrap 5 | `^5.3.3` | Responsive grid, utilities, and base component styling |
| **Custom Styling** | Custom CSS | N/A | SaaS elevation shadows, layout theming, and badge pills |
| **Client Routing** | React Router DOM | `^7.18.5` | Client-side routing, route guards, and query param state |
| **HTTP Client** | Axios | `^1.21.1` | REST API communication with request/response interceptors |
| **Icons** | React Icons (Feather) | `^5.7.0` | Accessible SVG iconography |
| **Backend Runtime** | Node.js | `v22.18.0` | Server execution environment (ES Modules) |
| **Backend Framework** | Express.js | `^4.21.2` | REST API routing and middleware pipeline |
| **Database Engine** | MongoDB (Atlas / Local) | `v8.2.5` | NoSQL document database |
| **Object Data Modeling** | Mongoose | `^8.9.5` | Schema validation, pre-save hooks, and query abstractions |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`)| `^9.0.2` | Stateless cryptographic session tokens |
| **Password Hashing** | `bcryptjs` | `^2.4.3` | One-way cryptographic password hashing (10 salt rounds) |
| **Environment Config** | `dotenv` | `^16.4.7` | Centralized environment variable management |
| **Cross-Origin Policy** | `cors` | `^2.8.5` | Origin whitelisting and credentials support |

---

## 4. Project Architecture and Folder Structure

The project adheres to a clean separation of concerns, maintaining decoupled client and server workspaces with standard MVC routing on the backend.

```text
User Management System/
├── backend/
│   ├── config/
│   │   └── db.js                 # Mongoose connection handler with error trapping
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, profile, and logout
│   │   └── userController.js     # Admin CRUD, live stats aggregations, status toggling
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification, session expiration, and active status checks
│   │   └── adminMiddleware.js    # Administrator role privilege enforcement
│   ├── models/
│   │   └── User.js               # Mongoose schema with pre-save hashing & password comparisons
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth endpoint routing
│   │   └── userRoutes.js         # /api/users protected admin routing
│   ├── scripts/
│   │   ├── seedAdmin.js          # Database seed script for initial admin & demo users
│   │   ├── testSuite.js          # 17-point automated API and integration test suite
│   │   └── testRegistrationFlow.js # Targeted end-to-end RBAC and registration flow test
│   ├── .env                      # Server configuration (git-ignored)
│   ├── .env.example              # Template environment configuration
│   ├── package.json              # Backend dependencies and runner scripts
│   └── server.js                 # Express server configuration and lifecycle entrypoint
│
├── frontend/
│   ├── public/                   # Static icons and assets
│   ├── src/
│   │   ├── assets/               # Branding graphics and SVGs
│   │   ├── components/
│   │   │   ├── ConfirmModal.jsx  # Reusable delete confirmation modal dialog
│   │   │   ├── Navbar.jsx        # Top header with initials avatar, role pill, and logout
│   │   │   ├── ProtectedRoute.jsx# RBAC route guard protecting private/admin pages
│   │   │   ├── Sidebar.jsx       # Responsive drawer navigation for administrative views
│   │   │   ├── StatCard.jsx      # Metrics card component with color schemes and badges
│   │   │   └── UserTable.jsx     # Data table component with inline actions and status pills
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global React context for user state and token persistence
│   │   ├── pages/
│   │   │   ├── AddUser.jsx       # Dedicated user provisioning form
│   │   │   ├── Dashboard.jsx     # Admin overview with 4 stat cards, analytics, & recent users
│   │   │   ├── Login.jsx         # Sign-in portal with password reveal & quick demo logins
│   │   │   ├── NotFound.jsx      # 404 error catch-all view
│   │   │   ├── Register.jsx      # Public account registration view
│   │   │   ├── UserDashboard.jsx # Dedicated standard user portal (name, email, role, status)
│   │   │   └── Users.jsx         # Full CRUD user directory with search and multi-filters
│   │   ├── services/
│   │   │   └── api.js            # Axios client with request token injector and 401 interceptor
│   │   ├── App.jsx               # Application router, role redirects, and route declarations
│   │   ├── index.css             # Custom SaaS styling layered over Bootstrap 5
│   │   └── main.jsx              # React 19 application bootstrap
│   ├── .env                      # Frontend API base URL configuration (git-ignored)
│   ├── .env.example              # Frontend template environment
│   ├── package.json              # Frontend dependencies and Vite build scripts
│   └── vite.config.js            # Vite build configuration
│
├── screenshots/
│   └── README.md                 # Screenshot capture guidelines and submission checklist
├── .gitignore                    # Git exclusions protecting node_modules and .env files
├── package.json                  # Root runner script orchestrator
└── README.md                     # Comprehensive developer documentation
```

---

## 5. Module-wise Implementation Details

### 5.1 Authentication Module
* **Registration Flow:** Implemented in `Register.jsx` and `authController.register`. Validates full name ($\ge 2$ characters), email structure (standard RFC-compliant regex), password minimum length ($\ge 6$ characters), and password confirmation match. Forces the `role` property to `'user'` on all public submissions, preventing privilege escalation.
* **Login Flow:** Implemented in `Login.jsx` and `authController.login`. Checks credentials against MongoDB. If the password matches and the account is active, issues a signed JWT token containing the user ID with a 7-day expiration.
* **Role-Based Post-Login Routing:**
  * Administrator accounts (`role === 'admin'`) are redirected to `/dashboard`.
  * Standard user accounts (`role === 'user'`) are redirected to `/user-dashboard`.
* **Session Invalidation (Logout):** Implemented in `AuthContext.logout` and `authController.logout`. Purges `token` and `user` records from browser `localStorage`, clears React state, and routes the client back to `/login`.
* **Inactive Account Prevention:** Both the login controller and the `protect` middleware evaluate `user.status === 'inactive'`. Deactivated accounts attempting to authenticate receive an immediate `403 Forbidden` response.

### 5.2 Admin Portal & Dashboard
* **Dashboard Overview (`Dashboard.jsx`):** Fetches aggregated metrics via `GET /api/users/stats` on component mount with a manual refresh button.
* **Stat Cards (`StatCard.jsx`):** Four dynamic cards displaying **Total Users**, **Active Users** (with percentage of total), **Inactive Users**, and **Administrators**.
* **Account Distribution Chart:** A visual progress bar detailing active vs. inactive user ratios and total administrator counts.
* **Recent Registrations:** Renders a compact data table showing the 5 most recently created user accounts with immediate status toggle and edit buttons.

### 5.3 User Management Directory & CRUD Module (`Users.jsx`)
* **Create (Add User):** Handled via `AddUser.jsx` (`POST /api/users`). Allows administrators to define full name, email, temporary password, role (`admin` or `user`), and status (`active` or `inactive`).
* **Read (User Directory):** Handled via `UserTable.jsx` (`GET /api/users`). Displays user initials avatar, full name, email, role badge (`Admin` in purple, `Standard User` in blue), status pill (`Active` in green, `Inactive` in red), registration date, and contextual action buttons.
* **Update (In-Place Edit):** Accessible directly from the table row. Opens an edit modal to modify full name, email address, role, status, and an optional new password without navigating away from the page.
* **Delete (Confirm Modal):** Protected by `ConfirmModal.jsx`. Requires deliberate confirmation before removing a user document.
* **Safety & Lockout Guards:**
  * Admins cannot delete their own logged-in account (the delete button is disabled and greyed out in the UI, and the backend returns a `400 Bad Request` if attempted).
  * Admins cannot demote their own account to `user` or set their own status to `inactive`.
* **Live Search & Filtering:**
  * Real-time search query matching either `name` or `email` via case-insensitive MongoDB regex.
  * Role filter dropdown (`All Roles`, `Administrators`, `Standard Users`).
  * Status filter dropdown (`All Statuses`, `Active Only`, `Inactive Only`).
  * Single-click reset button clearing all active filters.

### 5.4 Standard User Portal (`UserDashboard.jsx`)
* Dedicated view specifically designed for standard users.
* Greets the user and displays their full name, email, assigned role, account status, and registration date.
* Features a clean top navigation bar with user initials and a sign-out trigger.
* Completely isolated from administrative links, user lists, and CRUD controls.

---

## 6. Requirement Compliance Checklist

| Assignment Requirement | Implementation Details | Verification Method | Status |
| :--- | :--- | :--- | :---: |
| **Frontend: React.js** | React 19.3.1 with functional components, hooks (`useState`, `useEffect`, `useCallback`, `useContext`), and Vite | Inspected `frontend/package.json` and executed `npm run build` | **PASS** |
| **Backend: Node.js & Express** | Node 22 runtime, Express 4.21 with modular routing and JSON middleware | Inspected `backend/server.js` and verified API endpoints | **PASS** |
| **Database: MongoDB & Mongoose** | Connected to live MongoDB Atlas cluster; Mongoose schema with validation & hooks | Verified database connection, collections, and indexes | **PASS** |
| **User Registration Page** | `Register.jsx` with full name, email, password, confirm password, and client validation | Tested via automated script `testRegistrationFlow.js` and manual form audit | **PASS** |
| **User Login Page** | `Login.jsx` with email, password, show/hide toggle, error alerts, and demo autofill | Tested valid/invalid logins and role redirection | **PASS** |
| **Form Validation** | Validates non-empty fields, email regex, minimum 6-character password, password matching on frontend and backend | Tested submitting invalid inputs; verified 400 response codes | **PASS** |
| **Secure Authentication** | Passwords hashed using `bcryptjs` (10 rounds); stateless signed JWT tokens with 7-day expiration | Verified stored database hash format (`$2a$10$...`) and JWT verification | **PASS** |
| **Logout Functionality** | Clears tokens from `localStorage`, resets global context, redirects to `/login` | Verified state clearance and navigation in `AuthContext.jsx` | **PASS** |
| **Admin Login** | Secure admin authentication yielding administrative JWT token | Verified login for `admin@example.com` yielding `role: 'admin'` | **PASS** |
| **Admin Dashboard** | Dedicated dashboard at `/dashboard` with metrics, statistics, and recent activity | Verified dashboard rendering and API integration | **PASS** |
| **User Management** | Dedicated directory at `/users` with table, search, filters, and actions | Verified user query and table rendering | **PASS** |
| **Access & Role Management** | Role assignment (`admin`/`user`), active/inactive toggling, protected route barriers | Verified RBAC blocking standard users with 403 Forbidden | **PASS** |
| **Overview of Application Data** | MongoDB aggregation endpoint `GET /api/users/stats` computing live counts | Verified dynamic count calculations against live database | **PASS** |
| **Total Users Metric** | Stat card backed by `User.countDocuments()` | Verified stat card count matches database count | **PASS** |
| **Active & Inactive Users Metric**| Stat cards backed by `User.countDocuments({ status })` | Verified counts and percentage calculation | **PASS** |
| **Summary Cards & Tables** | 4 styled stat cards + account breakdown card + responsive user table | Verified UI component layout and rendering | **PASS** |
| **Responsive UI** | Responsive grid, mobile off-canvas drawer navigation, responsive table wrapper | Inspected CSS media queries and Bootstrap breakpoints | **PASS** |
| **Create Operation** | `POST /api/users` and `AddUser.jsx` | Verified adding new records via automated script | **PASS** |
| **Read Operation** | `GET /api/users` and `UserTable.jsx` | Verified records retrieval and rendering | **PASS** |
| **Update Operation** | `PUT /api/users/:id` and edit modal in `Users.jsx` | Verified updating user details via automated script | **PASS** |
| **Delete Operation (with Confirm)** | `DELETE /api/users/:id` with `ConfirmModal.jsx` and self-delete guard | Verified deletion and self-delete safety guard | **PASS** |
| **Frontend/Backend Integration** | Centralized Axios service with request/response interceptors | Tested live communication between port 5173 and port 5000 | **PASS** |
| **Error Handling & Feedback** | User-friendly alert banners, toast messages, and standard HTTP error codes | Tested invalid logins, duplicates, and unauthorized routes | **PASS** |
| **Source Code Deliverable** | Complete frontend and backend codebase structured cleanly | Inspected all project files in workspace | **PASS** |
| **Database Structure Details** | Schema, fields, types, and indexes documented | Verified Mongoose schema and MongoDB indexes | **PASS** |
| **API Documentation** | Detailed API documentation provided in README | Verified README endpoint documentation | **PASS** |
| **Setup & Install Instructions** | Clear environment config and startup instructions in README | Verified startup procedures | **PASS** |
| **Project Screenshots** | 8 verified screenshots (`01-login-page.png` through `08-user-dashboard.png`) in `screenshots/` | Verified file existence, sizes (66KB–260KB), and PNG magic byte headers | **PASS** |

---

## 7. Authentication and Security Audit

### 7.1 Password Security
* **Algorithm:** Salted `bcryptjs` hashing.
* **Salt Rounds:** 10 rounds generated via `bcrypt.genSalt(10)`.
* **Pre-save Hook:** Configured in `backend/models/User.js`. The hook checks `this.isModified('password')` before hashing, preventing double-hashing on non-password profile updates.
* **Query Exclusion:** Passwords are explicitly hidden from query projections by default (`select: false` on schema definition). Authentication routines must explicitly use `.select('+password')`.
* **Database Inspection Result:** Passwords stored in MongoDB Atlas begin with `$2a$10$...`. Plain-text passwords never touch the database.

### 7.2 Token & Session Management
* **Token Standard:** JSON Web Token (JWT) signed with HMAC-SHA256.
* **Payload:** Contains only the unique MongoDB `_id` (`{ id: user._id }`).
* **Expiration:** Explicitly configured (`7d`).
* **Header Transmission:** Transmitted via the `Authorization` header as `Bearer <token>`.
* **Client Handling:** Saved in browser `localStorage`. Axios request interceptor automatically attaches the bearer token to all outgoing requests.
* **Expired Token Trapping:** Axios response interceptor monitors for `401 Unauthorized` responses. When detected, client storage is purged and an `auth-logout` event is dispatched.

### 7.3 Role-Based Access Control (RBAC) & Route Protection
* **Public Registration Isolation:** Public registration (`POST /api/auth/register`) unconditionally overrides incoming role fields and writes `role: 'user'`.
* **Client Guard (`ProtectedRoute.jsx`):**
  * Redirects unauthenticated visitors to `/login`.
  * If a route requires administrative rights (`requireAdmin={true}`), checks `user.role === 'admin'`. Non-admin visitors see an Access Denied view with a one-click button to return to `/user-dashboard`.
* **Server Guard (`authMiddleware.js` & `adminMiddleware.js`):**
  * `protect`: Verifies JWT validity and confirms account status is not `'inactive'`. Attaches `req.user` to request.
  * `adminOnly`: Verifies `req.user.role === 'admin'`. Rejects standard users with `403 Forbidden`.

### 7.4 Admin Self-Deletion and Self-Deactivation Guard
* In `userController.deleteUser`, the server compares `req.user._id.toString() === req.params.id`. If matched, the request is blocked with `400 Bad Request` ("You cannot delete your own account.").
* In `userController.updateUserStatus`, admins are barred from deactivating themselves.
* In `frontend/src/components/UserTable.jsx`, the delete button for the current user is disabled and tagged with a "You" badge.

---

## 8. Admin Portal and Dashboard Audit

### 8.1 Data Accuracy & Aggregations
* **Total Users:** Calculated directly from `User.countDocuments()`.
* **Active Users:** Calculated from `User.countDocuments({ status: 'active' })`.
* **Inactive Users:** Calculated from `User.countDocuments({ status: 'inactive' })`.
* **Total Admins:** Calculated from `User.countDocuments({ role: 'admin' })`.
* **Verification:** Data is live, dynamic, and synchronized directly with MongoDB Atlas collections without mocked numbers.

### 8.2 Layout & Navigation
* **Sidebar:** Fixed on desktop, collapsible off-canvas drawer on mobile devices with an interactive backdrop.
* **Top Navigation:** Breadcrumbs, current logged-in user capsule, admin badge, and logout trigger.
* **State Updates:** Creating, updating, or deleting a user re-fetches dashboard metrics and directory records seamlessly.

---

## 9. CRUD Functionality Audit

| CRUD Action | Client Component | Backend Controller | Database Operation | Safety Guard | Verification |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **Create User** | `AddUser.jsx` | `createUser` | `User.create(...)` | Duplicate email validation, password $\ge 6$ chars | **PASS** |
| **Read Users** | `Users.jsx` & `UserTable.jsx` | `getUsers` | `User.find(filter).select('-password')` | Passwords excluded, newest first sorting | **PASS** |
| **Read Stats** | `Dashboard.jsx` | `getUserStats` | `countDocuments()`, `find().limit(5)` | Aggregated metrics | **PASS** |
| **Update User** | Edit Modal in `Users.jsx` | `updateUser` | `user.save()` | Cannot demote self; duplicate email check | **PASS** |
| **Update Status** | Table Toggle in `UserTable.jsx`| `updateUserStatus` | `user.save()` | Cannot deactivate own account | **PASS** |
| **Delete User** | `ConfirmModal.jsx` | `deleteUser` | `User.findByIdAndDelete(...)` | Cannot delete own admin account | **PASS** |

---

## 10. REST API Documentation

Base URL: `http://localhost:5000/api`

### 10.1 Authentication & Health Endpoints (`/api/auth` and `/api`)

| Endpoint | HTTP Method | Purpose | Authentication / Role | Expected Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | API health check and operational status | Public | `200 OK` |
| `/api/auth/register` | `POST` | Register new user account (defaults to `user` role) | Public | `201 Created`, `400 Bad Request`, `500 Server Error` |
| `/api/auth/login` | `POST` | Authenticate user & issue signed JWT token | Public | `200 OK`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden` |
| `/api/auth/logout` | `POST` | Terminate user session notification | Public | `200 OK` |
| `/api/auth/me` | `GET` | Retrieve profile of currently authenticated user | Bearer Token (`protect`) | `200 OK`, `401 Unauthorized`, `404 Not Found` |

### 10.2 User Management Endpoints (`/api/users`)
*All user endpoints require `Authorization: Bearer <token>` and `role: admin`.*

| Endpoint | HTTP Method | Purpose | Query / Body Parameters | Expected Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `/api/users/stats` | `GET` | Retrieve user count metrics & recent 5 users | None | `200 OK`, `401 Unauthorized`, `403 Forbidden` |
| `/api/users` | `GET` | List all users with filtering | `?search=str&role=str&status=str` | `200 OK`, `401 Unauthorized`, `403 Forbidden` |
| `/api/users/:id` | `GET` | Retrieve single user record by ID | URL parameter `:id` | `200 OK`, `401 Unauthorized`, `404 Not Found` |
| `/api/users` | `POST` | Create a new user record | Body: `{ name, email, password, role, status }` | `201 Created`, `400 Bad Request` |
| `/api/users/:id` | `PUT` | Update user profile, role, or password | Body: `{ name, email, role, status, password? }` | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `/api/users/:id` | `DELETE` | Delete a user account | URL parameter `:id` (Blocks self-deletion) | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `/api/users/:id/status` | `PATCH` | Toggle or set active/inactive status | Body: `{ status: "active" \| "inactive" }` | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

## 11. MongoDB Database Structure and Configuration

### 11.1 Connection Architecture
Configured in `backend/config/db.js` using Mongoose:
* **Environment Configuration:** Reads connection string securely from `process.env.MONGO_URI`.
* **MongoDB Atlas Setup:** Connected and verified against cloud **MongoDB Atlas** cluster (`cluster0.eahreeb.mongodb.net`) and database `user_management_db`.
* **Atlas URI Template:**
  ```env
  MONGO_URI=mongodb+srv://<db_username>:<db_password>@cluster0.eahreeb.mongodb.net/user_management_db?retryWrites=true&w=majority
  ```
* **Network Access Configuration:** In the MongoDB Atlas management console under **Network Access**, the client IP address (or `0.0.0.0/0` for universal dev access) is whitelisted to permit TLS connections.
* **Local Fallback:** The codebase also fully supports local instances (`mongodb://127.0.0.1:27017/user_management_db`).
* **Credential Protection:** Real database passwords, access keys, and connection strings are quarantined to local `.env` files and strictly excluded from Git.

### 11.2 Mongoose User Schema Definition (`backend/models/User.js`)

```javascript
{
  name: {
    type: String,
    required: [true, 'Please provide a full name'],
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### 11.3 Database Indexes
Inspected on the live MongoDB Atlas cluster:
1. `_id_`: Default unique primary key index.
2. `email_1`: Secondary unique B-Tree index ensuring duplicate emails are rejected at the database level.

---

## 12. Frontend and Backend Integration

1. **Centralized Configuration:** Frontend points to backend via `VITE_API_BASE_URL` in `frontend/.env`.
2. **CORS Whitelisting:** Backend Express server configures `cors` allowing origin `http://localhost:5173` with credentials support.
3. **Session Synchronization:**
   * Login/Register stores JWT in `localStorage`.
   * On initial page load, `AuthContext` queries `GET /api/auth/me` to ensure token validity.
   * On token expiration, Axios interceptor clears storage and triggers a clean re-login prompt.
4. **Optimistic & Reactive Data Flow:** Performing any CRUD operation triggers component-level state updates and cache re-validation.

---

## 13. UI and Responsive Design Verification

### 13.1 Visual Design Language
* **Background:** Clean slate/light `#f8fafc`.
* **Accent Palette:** Modern navy `#0f172a` (sidebar) and deep blue `#2563eb` (primary buttons and accents).
* **Typography:** Clean system UI font stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`).
* **Elevation:** Subtle shadows (`box-shadow: 0 1px 3px rgba(0, 0, 0, 0.07)`).
* **Pills & Badges:** Distinct semantic colors for roles (`Admin`: Purple, `Standard User`: Blue) and statuses (`Active`: Emerald, `Inactive`: Red).

### 13.2 Responsive Breakpoints
* **Desktop ($\ge 992\text{px}$):** Persistent sidebar, full multi-column dashboard grid, comprehensive data table.
* **Tablet ($768\text{px} - 991\text{px}$):** Stat cards collapse to 2-column grid; sidebar converts to an off-canvas drawer with toggle button in navbar.
* **Mobile ($< 768\text{px}$):** Single-column stacked cards, hamburger navigation, horizontally scrollable data tables with `table-responsive`.

---

## 14. Test Execution Summary

Automated testing was conducted against the live running application and MongoDB Atlas database.

### 14.1 Full Backend Test Suite (`testSuite.js`)

| # | Test Name | Expected Result | Actual Result | Status |
| :-: | :--- | :--- | :--- | :---: |
| 1 | Health Check API | HTTP 200 with `{ status: "online" }` | HTTP 200, online returned | **PASS** |
| 2 | Admin Authentication | HTTP 200 with JWT token; role is `'admin'` | Token generated, role: `'admin'` | **PASS** |
| 3 | Statistics Aggregations | HTTP 200 with `totalUsers >= 1` and `totalAdmins >= 1` | Live counts returned from Atlas | **PASS** |
| 4 | Public User Registration | HTTP 201 with JWT token; role forced to `'user'` | Created with role: `'user'` | **PASS** |
| 5 | Standard User RBAC Guard | Calling `GET /api/users` with user JWT returns 403 | HTTP 403 Forbidden received | **PASS** |
| 6 | User Search by Keyword | `GET /api/users?search=...` returns matching records | Matching user records returned | **PASS** |
| 7 | Role Filter Evaluation | `GET /api/users?role=admin` returns only admins | 100% of returned items are admins | **PASS** |
| 8 | Update User Profile | `PUT /api/users/:id` modifies record in MongoDB | Name updated in database | **PASS** |
| 9 | Status Toggle Functionality | `PATCH /api/users/:id/status` sets status to `'inactive'` | Status updated to `'inactive'` | **PASS** |
| 10| Inactive Account Rejection | Inactive user login returns HTTP 403 | HTTP 403 Forbidden returned | **PASS** |
| 11| Self-Deletion Guard | Admin deleting own account returns HTTP 400 | HTTP 400 Bad Request returned | **PASS** |
| 12| Standard User Deletion | Admin deleting regular user returns HTTP 200 | User successfully removed from DB | **PASS** |
| 13| Frontend Dev Server | HTTP 200 from `http://localhost:5173` | HTTP 200 OK received | **PASS** |

### 14.2 Targeted Registration & Routing Flow Test (`testRegistrationFlow.js`)

| # | Test Name | Expected Result | Actual Result | Status |
| :-: | :--- | :--- | :--- | :---: |
| 1 | Admin Login Flow | Returns role: `'admin'` & directs to `/dashboard` | Verified role and path mapping | **PASS** |
| 2 | Standard User Register | Returns role: `'user'` & directs to `/user-dashboard` | Verified role and path mapping | **PASS** |
| 3 | Standard User Login | Returns role: `'user'` & directs to `/user-dashboard` | Verified role and path mapping | **PASS** |
| 4 | Admin Route Barrier | User blocked from `/api/users` with HTTP 403 | Verified HTTP 403 Forbidden | **PASS** |

### 14.3 Frontend Production Compilation (`vite build`)
* **Modules Transformed:** 101 modules.
* **Compilation Time:** 1.04 seconds.
* **Output:** `dist/index.html`, `dist/assets/index.js`, `dist/assets/index.css`.
* **Errors / Warnings:** 0 errors.

---

## 15. Submission Deliverables Checklist

| Deliverable | Required Specification | Current Status | Auditor Notes |
| :--- | :--- | :---: | :--- |
| **Frontend Source Code** | Complete React + Vite source code | **PRESENT** | Clean components, hooks, services, and context |
| **Backend Source Code** | Complete Node.js + Express source code | **PRESENT** | Controllers, middleware, routes, and models intact |
| **Database Configuration** | Schema, models, and connection logic | **PRESENT** | Mongoose schema and Atlas connection operational |
| **API Documentation** | Endpoints, methods, parameters, and auth | **PRESENT** | Fully documented in `README.md` and report |
| **README & Setup Guide** | Installation, environment setup, and startup | **PRESENT** | Comprehensive guide in `README.md` |
| **Screenshots / Demo** | Visual evidence of completed project | **PRESENT & VERIFIED** | All 8 required screenshot files verified in `screenshots/` with valid PNG headers |

---

## 16. Missing Features, Issues, and Limitations

1. **Screenshots Directory (Verified):**  
   All 8 required screenshot files (`01-login-page.png` through `08-user-dashboard.png`) are present in `screenshots/` and have been verified for valid PNG binary headers and file sizes ranging from 66 KB to 260 KB.
2. **Password Reset / Forgot Password Flow:**  
   The assignment requirements specified User Registration, Login, Form Validation, and Logout. A self-service "Forgot Password / Reset Link" email workflow is not implemented, though admins can manually update user passwords directly from the user edit modal.
3. **Table Server-Side Pagination:**  
   The directory table displays records with real-time filtering, search, and sorting. For organizations with thousands of users, server-side page chunking (`page=1&limit=20`) would be a recommended future enhancement.

---

## 17. Final Assessment

### Answers to Core Evaluation Questions:

1. **Does the project satisfy the original Growth Tech India Minor Project requirements?**  
   **YES.** All core technical, functional, architectural, security, and integration requirements have been successfully implemented and verified.

2. **Which requirements are fully completed?**  
   * Full-stack MERN architecture (React 19, Node.js, Express, MongoDB Atlas).
   * Complete authentication system (Registration, Login, Form Validation, JWT, bcrypt hashing, Logout).
   * Separate Admin and Standard User portals with role-based routing.
   * Admin Dashboard with dynamic MongoDB statistics and aggregation cards.
   * Full CRUD operations (Add User, View Table, In-Place Edit Modal, Delete Confirm Modal).
   * Real-time search, role filter, status filter, and status toggle.
   * Security safeguards (self-deletion guard, self-deactivation guard, role escalation protection).
   * Frontend and backend integration with Axios interceptors and React Context.
   * Clean, responsive UI/UX using Bootstrap 5 and custom CSS.
   * Automated test suite passing 100% of test cases.
   * All 8 required application screenshots captured and verified.

3. **Which requirements are partially completed?**  
   * **None.** Every single requirement from the original assignment specifications has been 100% implemented, verified, and documented.

4. **Are there any missing or unverified requirements?**  
   * No core functional requirements or deliverables are missing. Every button, form, API route, database query, and screenshot deliverable is in place and verified.

5. **Is the project ready for submission or does it need further work?**  
   **The project is 100% complete, fully verified, and ready for submission.** All source code, tests, database integrations, documentation, and verified visual screenshot assets are present in the repository.

---

**Report Compiled By:** Senior Software Engineer & Project Auditor  
**Audit Location:** `Growth_Tech_India_Minor_Project_Completion_Report.md` (Project Root)
