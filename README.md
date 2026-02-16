# Light Gallery – Frontend

Light Gallery is a **React + Vite based e-commerce frontend** application with secure JWT authentication and core shopping features.  
The project focuses on **clean routing, scalable structure, and real-world auth flow**.  
All UI components are **handcrafted without using any prebuilt UI library**, with fully **responsive layouts** using modular CSS.

🔗 **Live URL:**  
[https://light-gallery-frontend.netlify.app](https://light-gallery-frontend.netlify.app)

---

## What this project does

- Implements **JWT authentication** using **Access Token + Refresh Token**
- Handles **protected and public routes** properly
- Provides core e-commerce features like wishlist, cart, orders, filters, and sorting
- Designed to be easily extendable for online payment integration
- Fully responsive UI using **Modular CSS**
- All components are **custom-built** (no Bootstrap / Tailwind / MUI)

---

## Authentication

- JWT based authentication
- Access token for API authorization
- Refresh token flow for session persistence
- Route protection using custom `ProtectedRoute` and `PublicRoute`
- Auto redirect for authenticated users

---

## Features

- User authentication (login / register / OTP verification)
- Product listing
- Wishlist functionality
- Cart functionality
- Order placement & order history
- Filter & sorting support
- Cash on Delivery option
- Online payment flow **structure prepared** (integration pending)
- Toast based notifications
- Fully responsive UI

---

## Tech Stack

**Frontend**
- React
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- React Toastify

**Styling**
- Modular CSS
- Custom reusable styles (no prebuilt UI libraries)

---

## Project Structure

