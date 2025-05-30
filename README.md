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

## 📁 Project Structure

```
Realtime-Music-App/
├── backend/
│   ├── src/
│   │   ├── controller/     # API controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── lib/           # Utilities (db, socket, cloudinary)
│   │   └── seeds/         # Database seeding scripts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── stores/       # Zustand state management
│   │   ├── lib/          # Utilities and configs
│   │   ├── types/        # TypeScript type definitions
│   │   └── layout/       # Layout components
│   └── package.json
└── package.json
```

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

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/callback` - Handle auth callback

### Songs

- `GET /api/songs` - Get all songs
- `GET /api/songs/featured` - Get featured songs
- `GET /api/songs/trending` - Get trending songs
- `GET /api/songs/made-for-you` - Get personalized songs

### Albums

- `GET /api/albums` - Get all albums
- `GET /api/albums/:id` - Get album by ID

### Playlists

- `GET /api/playlists/me` - Get user playlists
- `POST /api/playlists` - Create playlist
- `GET /api/playlists/:id` - Get playlist details

### Admin (Protected)

- `POST /api/admin/songs` - Upload new song
- `DELETE /api/admin/songs/:id` - Delete song
- `POST /api/admin/albums` - Create album
- `GET /api/stats` - Get application statistics

## 🔒 Environment Variables

| Variable                | Description                          | Required           |
| ----------------------- | ------------------------------------ | ------------------ |
| `MONGODB_URI`           | MongoDB connection string            | Yes                |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                | Yes                |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                   | Yes                |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                | Yes                |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key                | Yes                |
| `CLERK_SECRET_KEY`      | Clerk secret key                     | Yes                |
| `NODE_ENV`              | Environment (development/production) | Yes                |
| `PORT`                  | Server port                          | No (default: 5000) |

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

## 🔧 Configuration

### Clerk Setup

1. Create a Clerk application
2. Add environment variables
3. Configure OAuth providers (Google, GitHub)
4. Set up webhooks for user management

### Cloudinary Setup

1. Create a Cloudinary account
2. Get API credentials
3. Configure upload presets
4. Set up folder structure

### MongoDB Setup

1. Create MongoDB Atlas cluster
2. Get connection string
3. Configure network access
4. Set up database indexes

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
pnpm test

# Run backend tests
cd backend
pnpm test
```

## 🔧 Development

### Adding New Features

1. Create feature branch
2. Implement frontend components
3. Add backend endpoints
4. Update types and stores
5. Test functionality
6. Submit pull request

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**

- Check connection string
- Verify network access
- Ensure database is running

**Clerk Authentication Issues**

- Verify API keys
- Check domain configuration
- Review webhook settings

**File Upload Problems**

- Check Cloudinary credentials
- Verify file size limits
- Ensure proper file formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation
- Keep commits atomic and descriptive

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Clerk** - Authentication system
- **Cloudinary** - File storage and management
- **MongoDB** - Database solution
- **Socket.io** - Real-time communication
- **Tailwind CSS** - Styling framework
- **Radix UI** - Component library

