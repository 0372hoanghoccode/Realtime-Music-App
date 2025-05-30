# 🎵 Realtime Music App - Spotify Clone

A full-stack, real-time music streaming application built with React, TypeScript, Node.js, and Socket.io. Features include music playback, playlists, real-time chat, admin dashboard, and more.

![Realtime Music App](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-ISC-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## ✨ Features

### 🎶 Music Features

- **Music Streaming**: Play songs with advanced audio controls
- **Playlists**: Create, edit, and manage personal playlists
- **Albums**: Browse and play album collections
- **Search & Discovery**: Find songs, artists, and albums
- **Like System**: Like/unlike favorite songs
- **Music History**: Track listening history
- **Trending & Featured**: Discover popular and recommended music

### 💬 Social Features

- **Real-time Chat**: Live messaging between users
- **User Activity**: See what other users are listening to
- **Online Status**: Real-time user presence indicators

### 👑 Admin Features

- **Dashboard**: Comprehensive statistics and analytics
- **Music Management**: Upload, edit, and delete songs/albums
- **User Management**: Monitor user activities and stats
- **File Upload**: Support for audio and image file uploads

### 🔐 Authentication & Security

- **Clerk Authentication**: Secure user authentication
- **OAuth Integration**: Google and GitHub login support
- **Role-based Access**: Admin and user role management
- **Protected Routes**: Secure API endpoints

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Client-side routing
- **Radix UI** - Accessible UI components
- **Clerk** - Authentication system
- **Socket.io Client** - Real-time communication

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io** - Real-time communication
- **Cloudinary** - File storage and management
- **Clerk** - Authentication middleware

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PNPM** - Package manager
- **Nodemon** - Development server

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PNPM package manager
- MongoDB database
- Cloudinary account
- Clerk account

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Realtime-Music-App
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Environment Setup**

Create `.env` files in both `backend` and `frontend` directories:

**Backend (.env)**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NODE_ENV=development
```

**Frontend (.env)**

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:5000
```

4. **Seed Database (Optional)**

```bash
cd backend
pnpm run seed:songs
pnpm run seed:albums
```

5. **Start Development Servers**

Backend:

```bash
cd backend
pnpm dev
```

Frontend:

```bash
cd frontend
pnpm dev
```

The app will be available at `http://localhost:3000`

## 🔧 Available Scripts

### Root Level

- `pnpm build` - Build the entire application
- `pnpm start` - Start production server

### Backend

- `pnpm dev` - Start development server with hot reload
- `pnpm start` - Start production server
- `pnpm seed:songs` - Seed database with sample songs
- `pnpm seed:albums` - Seed database with sample albums

### Frontend

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🚀 Deployment

### Production Build

```bash
pnpm build
```

### Deploy to Platform

The app is configured for deployment on platforms like Render, Vercel, or Railway. Make sure to:

1. Set environment variables
2. Configure build scripts
3. Set up MongoDB database
4. Configure Cloudinary
5. Set up Clerk authentication

## 📸 Screenshots

### Home Page

![Home Page](docs/screenshots/home.png)

### Music Player

![Music Player](docs/screenshots/player.png)

### Admin Dashboard

![Admin Dashboard](docs/screenshots/admin.png)

### Real-time Chat

![Chat](docs/screenshots/chat.png)



