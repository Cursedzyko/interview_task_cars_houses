# Admin Panel and Role-Based Access Control (RBAC)

## Overview
This application includes an **Admin Panel** for managing users, roles, and permissions. It implements **Role-Based Access Control (RBAC)** to restrict access to features based on user roles.

---

## Admin Panel Functionality

The Admin Panel is accessible only to users with the **Admin** role. It provides the following functionalities:

### User Management
- **Create Users**: Add new users with assigned roles (Admin or RegularUser) and permissions.
- **Update Users**: Modify existing users' roles and permissions.
- **Delete Users**: Remove users from the system.

### User Overview
- View a list of all users, including their roles and permissions.

---

## Role-Based Access Control (RBAC)

RBAC ensures users can only access features and pages allowed by their roles and permissions.

### RegularUser
- **Permissions**:
  - `view_cars`: Grants access to the cars page.
  - `view_houses`: Grants access to the houses page.
- Users with both permissions can access both pages.

### Admin
- **Full Access**:
  - Access to all pages and features (cars and houses).
  - Access to the Admin Panel for managing users, roles, and permissions.

---

## User Redirection

Upon login, users are redirected based on their roles:
- **Admin Users**: Redirected to the Admin Panel.
- **RegularUser Users**: Redirected to their permitted pages:
  - If `view_cars` permission is assigned: Redirected to the cars page.
  - If `view_houses` permission is assigned: Redirected to the houses page.
  - If no permissions are assigned: Access is denied.

---

## Features Breakdown

| Role         | Feature/Access      | Description                                           |
|--------------|---------------------|-------------------------------------------------------|
| **Admin**    | Admin Panel         | Full access to user, role, and permission management. |
|              | View Cars & Houses  | Access to both cars and houses pages.                |
| **RegularUser** | View Cars          | Access cars page if `view_cars` permission is assigned. |
|              | View Houses         | Access houses page if `view_houses` permission is assigned. |

---

## Additional Notes
- Users without permissions or roles will not have access to any pages or features.
- Admins can manage permissions dynamically via the Admin Panel.

---

## Technologies Used
- **Backend**: FastAPI with MongoDB for data management and API handling.
- **Frontend**: React for creating a user-friendly interface.
- **Authentication & Authorization**: Role and permission-based access control system.

---
