# 🍽 DineTime

A full-stack restaurant table booking mobile app. Browse restaurants, view menus, and reserve dining time slots with OTP-based authentication.

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Language** | JavaScript (JSX) |
| **Mobile** | React Native 0.81, Expo ~54 |
| **Routing** | Expo Router (file-based) |
| **Styling** | NativeWind (TailwindCSS for RN) |
| **Backend** | Node.js, Express 4.21 |
| **Database** | MongoDB (Mongoose 9.9) |
| **Auth** | JWT, bcrypt, OTP via Email |
| **State** | React Context (3 contexts) |
| **HTTP** | Axios with interceptors |
| **Storage** | expo-secure-store |
| **Email** | Nodemailer (Gmail SMTP) |

## Features

### 📱 Client (Mobile App)
- Browse 18+ restaurants across multiple cuisines
- Hero banner carousel with auto-play
- Restaurant detail with 6-image carousel
- Tabbed menu (Starters / Main Course / Desserts) with prices
- Table booking with date & time slot selection
- Booking confirmation with expiry timer
- Booking history with pull-to-refresh
- OTP-based registration via email
- Guest mode for browsing (login required to book)
- Custom theme with warm olive & amber palette

### 🖥 Backend API
- JWT auth with token blacklisting (1-day TTL)
- OTP auto-expiry (5 min via MongoDB TTL)
- Unique booking constraint (restaurant + date + time)
- 14 hourly time slots (09:00 - 22:00)
- Nodemailer OTP email service

## 📁 Project Structure

```
dine-time/
├── client/                     # React Native (Expo) mobile app
│   ├── app/                    # Expo Router (file-based routing)
│   │   ├── _layout.jsx         # Root layout (providers)
│   │   ├── index.jsx           # Landing/splash screen
│   │   ├── (auth)/             # Auth group
│   │   │   ├── sign-in.jsx     # Sign In
│   │   │   ├── sign-up.jsx     # Sign Up
│   │   │   └── verify-otp.jsx  # OTP verification
│   │   ├── (tabs)/             # Tab navigator
│   │   │   ├── home.jsx        # Home feed
│   │   │   ├── history.jsx     # Booking history
│   │   │   └── profile.jsx     # User profile
│   │   └── restaurants/        # Restaurant group
│   │       ├── index.jsx       # Restaurant listing
│   │       └── [id].jsx        # Restaurant detail
│   ├── components/             # Reusable UI components
│   ├── context/                # React Context providers
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API client functions
│   ├── utils/                  # Utilities (menu state pub-sub)
│   └── assets/                 # Images, constants
├── server/                     # Node.js + Express API
│   ├── src/
│   │   ├── config/             # DB & env config
│   │   ├── controllers/        # Route handlers
│   │   ├── middlewares/        # Auth middleware
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # Express routers
│   │   └── services/           # Email service
│   └── server.js               # Entry point
└── cinevaultreeadmne.md
```

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Gmail account with app password (for OTP emails)


### 📦 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/dine-time.git
cd dine-time

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### 🔑 Environment Variables

Create `.env` files in the respective directories:

**server/.env**
```
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SMTP_USER=your_gmail@example.com
SMTP_PASS=your_gmail_app_password
CURRENCY=₹
```

**client/.env**
```
EXPO_PUBLIC_API_URL=http://192.168.1.100:4000/api
```

### ▶️ Running

```bash
# Start server (from server/)
npm run dev

# Start client (from client/)
npm start
```

## 🌐 API Endpoints

All routes are prefixed with `/api`.

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| **🔐 Auth** | | | |
| POST | `/auth/send-otp` | No | Send OTP for registration |
| POST | `/auth/register` | No | Verify OTP & complete registration |
| POST | `/auth/login` | No | Login with email/password |
| GET | `/auth/logout` | Yes | Logout (blacklist token) |
| GET | `/auth/get-me` | Yes | Get current user |
| **👤 User** | | | |
| PUT | `/user/updateUserInfo` | Yes | Update username/email |
| **🍽 Restaurants** | | | |
| GET | `/restaurant/` | No | Get all restaurants |
| GET | `/restaurant/:id` | No | Get restaurant with details & menu |
| **📅 Bookings** | | | |
| POST | `/booking/create` | Yes | Create a table booking |
| GET | `/booking/slots/:restaurantId/:date` | No | Get available time slots |
| GET | `/booking/my-bookings` | Yes | Get user's bookings |

## 🔄 Booking Flow

1. 🍽 **Select Restaurant** - User browses restaurants and views menu
2. 📅 **Pick Date** - Bottom modal shows today + 14 future days
3. ⏰ **Choose Time** - 14 hourly slots (09:00 - 22:00) with availability
4. ✅ **Confirm** - Booking created with unique constraint (restaurant + date + time)
5. ⏰ **Expiry** - Bookings expire 5 minutes after the booked time slot

## 🚀 Deployment

### OTA Updates (Push to main)
Every push to `main` publishes an OTA update instantly:
```bash
git push origin main
```

### Preview Build (Manual APK)
When you need a new APK (native changes, splash screen, etc.):
```bash
eas workflow:run client/.eas/workflows/create-preview-build.yml
```

## 📄 License

MIT License
