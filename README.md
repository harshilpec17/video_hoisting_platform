# YouTube Backend & Frontend Clone

A full-stack YouTube-inspired platform built with a modern React frontend and a robust Node.js/Express backend. This project demonstrates advanced skills in scalable architecture, authentication, video streaming, social features, and RESTful API design.

---

## 🚀 Features

- **User Authentication**: Secure registration, login, and protected routes.
- **Video Management**: Upload, edit, like, and watch videos with history tracking.
- **Channel System**: Create, manage, and subscribe to channels.
- **Playlists**: Curate and manage video playlists.
- **Social Interactions**: Tweet-like posts, comments, and likes.
- **Responsive UI**: Modern, mobile-friendly React interface.
- **Cloud Storage**: Video and image uploads via Cloudinary.
- **Error Handling**: Robust error middleware and user feedback.
- **Admin Dashboard**: Channel and user management.
- **Performance**: Optimized API and frontend for fast load times.

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Redux Toolkit, CSS Modules
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Cloud & Media**: Cloudinary, Multer
- **Authentication**: JWT, Secure password hashing
- **Deployment**: Vercel (Frontend), Customizable for cloud platforms (Backend)

---

## 📁 Project Structure

### Frontend (`/frontend`)

- `src/components/`
  - `authentication/`: Login & Register forms
  - `channel/`: Channel dashboard, pages, subscribers, videos
  - `layout/`: Header, Footer, Sidebar, Home
  - `playlist/`: Playlist management
  - `protectedRoutes/`: Auth guards and route protection
  - `static/`: Contact, Terms pages
  - `tweet/`: Tweet-like social features
  - `userAccount/`: Profile, avatar, password management
  - `video/`: Video upload, edit, detail, listing, history
- `src/lib/store/`: Redux slices for state management
- `src/utils/`: Utilities (time formatting, modals, error handling)

### Backend (`/backend`)

- `src/controllers/`: Business logic for users, videos, tweets, playlists, comments, subscriptions, likes, dashboard, health checks
- `src/models/`: Mongoose schemas for all entities
- `src/middlewares/`: Auth, error, and file upload handling
- `src/router/`: RESTful API routes for all resources
- `src/utils/`: API response helpers, async handlers, cloud storage utilities
- `public/`: Static and temporary file storage

---

## 📚 Key Modules & Highlights

- **Authentication**: JWT-based, with middleware for route protection.
- **Video Streaming**: Efficient upload and streaming via Multer and Cloudinary.
- **Redux State Management**: Slices for channels, videos, playlists, tweets, likes, and more.
- **Error Handling**: Centralized error middleware and user-friendly modals.
- **Social Features**: Tweet system, comments, likes, and subscriptions.
- **Responsive Design**: Clean, accessible UI for all devices.

---

## 📝 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Cloudinary account (for media storage)

### Setup

#### Backend

```bash
cd backend
npm install
# Configure .env with MongoDB, JWT, Cloudinary credentials
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌟 Why This Project Stands Out

- **Scalable, modular codebase** with clear separation of concerns.
- **Production-ready patterns**: Error handling, async/await, secure authentication.
- **Modern UI/UX**: Built with React and Vite for fast, interactive experiences.
- **Cloud-native**: Ready for deployment on Vercel, AWS, or similar platforms.
- **Extensible**: Easily add new features (e.g., live chat, analytics).

---

## 👤 Author

- Harshil
- [Github](https://github.com/harshilpec17)

---

## 📄 License

This project is for demonstration and educational purposes.

---

> **Note:** For detailed API documentation and component breakdown, see the `/docs` folder or inline code comments.
