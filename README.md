# Online Bookstore

An online bookstore web application built using React, TypeScript, Bootstrap, Node.js, TypeORM, MySQL, and JWT Authentication.

Users can browse books freely, sign up to leave reviews or purchase books, while Admins and Authors have role-based dashboards with specific capabilities.

---

## Features Completed So Far

### Frontend (React + TypeScript + Bootstrap)

#### Home Page
- Book carousel that auto-slides
- Manual carousel for featured books
- Genre buttons to filter books by genre

#### Navbar
- Dynamic login/signup button based on authentication status
- Shows user profile or logout option when logged in

#### Login/Signup Modal
- Reusable modal component triggered by any protected action (like "Add to Cart")
- Includes a “Maybe Later” option to dismiss the modal
- Controlled via React Context to access it globally

#### Authentication Flow
- Login and Signup using `/auth/login` and `/auth/register` routes
- JWT stored in localStorage and tracked using AuthContext
- Conditional rendering based on login state

#### Reviews System
- Users can:
  - Add their own reviews
  - View others’ reviews
- Star-based rating display
- Shows user name beside each review

#### Author Dashboard
- Authors can:
  - Publish books via a form
  - View a list of their published books
- Published books are instantly displayed on the frontend for users to browse

#### Frontend Unit Testing
- Done using React Testing Library and vitest
- Covers UI components, forms, and user interactions

---

### Backend (Node.js + TypeScript + Express + MySQL + TypeORM)

#### Authentication
- JWT-based login and registration
- Role-based logic (User, Admin, Author) established

#### Books and Genre
- Books fetched from Google Books API
- Stored in local database
- Genres stored as strings in the Book table

#### Admin Role
- Admins can:
  - View and manage all users and books
  - Assign authors to books

#### Author Role
- Authors can:
  - Publish new books

#### Backend Unit Testing (in progress)
- Testing Auth, Book APIs, role checks using jest

---

## Technologies Used

### Frontend
- React
- TypeScript
- Bootstrap
- React Testing Library
- vitest

### Backend
- Node.js
- TypeScript
- Express.js
- MySQL
- TypeORM
- JWT
- jest

---

## To-Do (Coming Soon)
- Edit and Delete review functionality
- Cart and purchase flow
- Author notifications
- Book analytics for Admins
- Finalize backend test coverage

---

Built with care by Karthisri
