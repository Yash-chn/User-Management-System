# Application Screenshots & Submission Gallery

This directory contains visual demonstration screenshots of the **User Management System with Admin Dashboard** for the **Growth Tech India Minor Project Submission**.

---

## 📸 Verified Screenshots Checklist

> **Audit Status:** **VERIFIED (8/8 Files Present & Validated)**  
> All required screenshots have been captured from the live application and verified for image integrity.

| # | File Name | Screen Description | Route / Trigger | File Size | Verification Status |
| :-: | :--- | :--- | :--- | :---: | :---: |
| 1 | **`01-login-page.png`** | Authentication portal with email, password reveal toggle, and demo accounts | `/login` | 259 KB | ✅ **VERIFIED (Valid PNG)** |
| 2 | **`02-dashboard-overview.png`** | Admin Dashboard Overview with 4 live MongoDB stat cards, metrics, and recent users | `/dashboard` | 81 KB | ✅ **VERIFIED (Valid PNG)** |
| 3 | **`03-user-directory.png`** | Full User Directory table with initials avatars, role pills (`Admin`/`User`), and status pills | `/users` | 78 KB | ✅ **VERIFIED (Valid PNG)** |
| 4 | **`04-edit-user-modal.png`** | In-place modal dialog to edit user name, email, role, status, and password | In `/users` (Edit) | 98 KB | ✅ **VERIFIED (Valid PNG)** |
| 5 | **`05-delete-confirmation.png`** | Safety confirmation dialog before removing a user document | In `/users` (Delete) | 91 KB | ✅ **VERIFIED (Valid PNG)** |
| 6 | **`06-add-user.png`** | Administrator user provisioning form with role and status selection | `/users/add` | 73 KB | ✅ **VERIFIED (Valid PNG)** |
| 7 | **`07-registration-page.png`** | Public user registration form with validation and standard user role enforcement | `/register` | 260 KB | ✅ **VERIFIED (Valid PNG)** |
| 8 | **`08-user-dashboard.png`** | Dedicated Standard User Dashboard displaying welcome banner, profile info, and active status | `/user-dashboard` | 66 KB | ✅ **VERIFIED (Valid PNG)** |

---

## 🖼️ Gallery & Interface Overview

### 1. Login Page (`01-login-page.png`)
* Centered SaaS authentication card with email and password fields.
* Password visibility toggle (eye icon).
* One-click demo credentials (`Admin` and `User`).
* Navigation link to registration page.

### 2. Administrator Dashboard Overview (`02-dashboard-overview.png`)
* Welcome greeting for the logged-in administrator.
* 4 live MongoDB statistics cards: **Total Users**, **Active Users**, **Inactive Users**, **Administrators**.
* Visual account health distribution progress bar.
* Top 5 recent user registrations with inline actions.

### 3. User Management Directory (`03-user-directory.png`)
* Complete user table rendering all accounts from MongoDB.
* Initials avatar circles with distinctive role badges: `Admin` (purple) and `Standard User` (blue).
* Real-time status indicator dots: `Active` (green) and `Inactive` (red).
* Search bar (by name or email) and dropdown filters (by role and status).
* Row-level action buttons: status toggle, in-place edit, and delete.

### 4. Edit User Modal (`04-edit-user-modal.png`)
* In-place popup modal enabling administrators to modify full name, email, role, and status.
* Optional password change input without navigating away from the table.

### 5. Delete Confirmation Modal (`05-delete-confirmation.png`)
* Danger-accented modal dialog confirming target user's name and email address.
* Prevents accidental deletions.
* Safety guard: Admins cannot delete their own logged-in account.

### 6. Add User Form (`06-add-user.png`)
* Dedicated administrative form to provision new team members or administrators.
* Input validation for name, email uniqueness, temporary password, role, and status.

### 7. Public Registration Page (`07-registration-page.png`)
* Clean public onboarding form with full name, email, password, and confirm password.
* Client-side validation ensuring matching passwords and valid email format.
* Security enforcement: all public registrations default to standard `user` role.

### 8. Standard User Dashboard (`08-user-dashboard.png`)
* Dedicated portal for non-administrative members (`/user-dashboard`).
* Displays personal welcome banner, full name, email address, role, and active account status.
* Top navigation bar with initials avatar and sign-out button.
* Strict isolation: standard users are prevented from accessing administrative routes.

---

## 🧪 Image Integrity Verification

All 8 screenshot files have been audited and verified for valid binary PNG headers (`89 50 4E 47 0D 0A 1A 0A`):

```powershell
01-login-page.png          : 259380 bytes | Header: 89 50 4E 47 0D 0A 1A 0A | Valid PNG: True
02-dashboard-overview.png  : 80759 bytes  | Header: 89 50 4E 47 0D 0A 1A 0A | Valid PNG: True
03-user-directory.png      : 78310 bytes  | Header: 89 50 4E 47 0D 0A 1A 0A | Valid PNG: True
04-edit-user-modal.png     : 97772 bytes  | Header: 89 50 4E 47 0D 0A 1A 0A | Valid PNG: True
05-delete-confirmation.png : 90996 bytes  | Header: 89 50 4E 47 0D 0A 1A 0A | Valid PNG: True
06-add-user.png            : 72876 bytes  | Header: 89 50 4E 47 0D 0A 1A 0A | Valid PNG: True
07-registration-page.png   : 259671 bytes | Header: 89 50 4E 47 0D 0A 1A 0A | Valid PNG: True
08-user-dashboard.png      : 66338 bytes  | Header: 89 50 4E 47 0D 0A 1A 0A | Valid PNG: True
```
