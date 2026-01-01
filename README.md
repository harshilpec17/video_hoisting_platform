# YouTube Backend & Frontend

A full-stack video streaming application built with **Node.js**, **Express**, **MongoDB**, and **React**. This project demonstrates advanced backend architecture, real-time features, and modern frontend practices.

## 🚀 Key Features

### Backend (Node.js + Express)

- **User Authentication** - JWT-based secure auth with password hashing
- **Video Management** - Upload, stream, and manage videos with Cloudinary integration
- **Social Features** - Comments, likes, subscriptions, and tweets
- **Playlists** - Create and manage custom playlists
- **Dashboard Analytics** - Channel statistics and metrics
- **Middleware Stack** - Custom error handling, authentication, file uploads (Multer)
- **API Error Handling** - Structured error responses and async error management

### Frontend (React + Vite)

- **Protected Routes** - Role-based access controlContext: In a sidebard component at watchHistory button. it dispatch the action to go the watchHistorySlice and get the watchHistory for the user from the backend function name as the getWatchHistory from the controller named user.controller.js.

Problem: when user click the button it gives the HTML document instead of the actual data. How can I fix this problem to have the watchHistory

- **State Management** - Redux for global state (videos, playlists, tweets, etc.)
- **Channel System** - Dashboard, subscriber/subscription management
- **Video Features** - Upload, edit, watch history, liked videos
- **User Accounts** - Profile management, avatar/password changes
- **Responsive UI** - Modern component-based architecture

## 📊 Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, Multer  
**Frontend:** React, Vite, Redux, Axios, tailwind  
**Tools:** ESLint, Prettier, Vercel deployment

## 🏗️ Architecture Highlights

- Modular controller-route-model pattern
- Separation of concerns (utilities, middlewares, services)
- Async error handling wrapper
- Custom API response and error classes
- File upload and cloud storage management

## 📦 Project Structure

Organized with clear separation: controllers, models, routes, middlewares, and utilities for maintainability at scale.
