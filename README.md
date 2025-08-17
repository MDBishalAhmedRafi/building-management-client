# Building Management System - Client

Live Link: [Building Management System](https://building-management-project.web.app/)

This is the **client-side** of the Building Management System (BMS).  
It is a responsive React web application that provides different role-based dashboards for **Users, Members, and Admins**.  

---

## 🚀 Features
- 🔑 **Authentication & Authorization** using Firebase (Email/Password, Google Login).
- 🏢 **Apartment Listings** with filtering & request functionality.
- 💳 **Payment Integration** with Stripe.
- 🎟️ **Coupon Management** (active/inactive status applied during payment).
- 📢 **Announcements** for members.
- 👨‍💻 **Role-based Dashboards**:
  - **User Dashboard:** Profile, apartment agreement request, announcements.
  - **Member Dashboard:** Profile, payment processing, payment history, announcements.
  - **Admin Dashboard:** Manage members, agreements, coupons, announcements.
- 🌗 **Dark/Light Mode** support.
- 🎨 **Modern UI/UX** with TailwindCSS + DaisyUI + Framer Motion + AOS.

---

## 🛠️ Technologies Used
- **React** (Vite)
- **Tailwind CSS** + **DaisyUI**
- **Firebase Authentication**
- **TanStack Query** for API data fetching
- **Axios** for HTTP requests
- **Stripe** for payments
- **React Hook Form** + **SweetAlert2**
- **Swiper.js** for carousel
- **Lottie Animations** for UI

---

## 📦 Installation & Setup
1. Clone the repository:
   ```bash
   git clone <your-client-repo-url>
   cd client
