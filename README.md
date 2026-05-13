# Hintro Dashboard

A clean, responsive React-based dashboard application built as part of the Hintro Frontend Developer Internship assignment. The dashboard features user authentication, real-time call statistics, feedback collection with star ratings, and comprehensive handling of both empty and populated user states.

## 📋 Project Overview

This application demonstrates:
- **Design adherence**: Pixel-perfect implementation following Figma designs
- **API integration**: Proper usage of mock APIs without hardcoding data
- **User state handling**: Complete support for both u1 (empty user) and u2 (active user) states
- **Responsive design**: Mobile-first approach working seamlessly on all devices
- **Production-ready code**: Clean architecture, proper error handling, and smooth UX

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.6
- **Build Tool**: Vite 8.0.12 (for fast HMR and optimized builds)
- **Routing**: React Router 7.15.0
- **Styling**: Pure CSS with CSS variables (no dependencies for minimal footprint)
- **State Management**: React Context API + localStorage
- **Environment**: Node.js 22.12+

### Why These Choices?
- **Vite** provides instant server startup and lightning-fast HMR
- **React Router** handles client-side routing for single-page navigation
- **Pure CSS** keeps the bundle lightweight and avoids styling library overhead
- **Context API** simplifies global state without external libraries
- **localStorage** persists user sessions between browser sessions

## 🚀 Setup Instructions

### Prerequisites
- Node.js v22.12+ (required for Vite)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sohamroy06/Hintro_Dashboard.git
   cd Hintro_Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (optional, defaults to mock backend)
   ```bash
   cp .env.example .env.local
   # Edit .env.local if using a custom backend URL
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   - Opens at `http://localhost:5173`
   - Hot module reload enabled

5. **Build for production**
   ```bash
   npm run build
   ```
   - Output in `/dist` directory
   - Optimized and minified

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Top navigation with avatar
│   ├── Sidebar/        # Navigation sidebar with user switching
│   ├── FormInput/      # Reusable form input with validation
│   ├── FeedbackModal/  # Feedback form with 1-5 star rating
│   ├── CallHistoryTable/ # Call sessions display
│   ├── StatsCard/      # Statistics card component
│   ├── EmptyState/     # Empty state UI
│   └── SkeletonLoader/ # Loading skeleton
├── pages/              # Page components
│   ├── Login.jsx       # Mock login with u1/u2 switching
│   └── Dashboard.jsx   # Main dashboard view
├── context/            # State management
│   └── UserContext.jsx # Global user state
├── hooks/              # Custom React hooks
│   ├── useApi.js       # API data fetching
│   └── useFeedback.js  # Feedback management
├── utils/              # Utility functions
│   ├── api.js          # API service with environment variables
│   ├── toast.js        # Toast notifications
│   └── time.js         # Time formatting helpers
└── styles/             # Global styles
    └── global.css      # Theme variables and base styles
```

## ✨ Features Implemented

### 1. **Authentication & User Management**
- Mock login system supporting both u1 and u2 users
- localStorage-based session persistence
- Automatic redirect for unauthenticated users
- User switching from sidebar
- Logout functionality

### 2. **Dashboard**
- Welcome message personalized by user
- Real-time stats loading with skeleton loaders
- Call history with grouped dates
- Empty state handling for new users
- Responsive grid layout

### 3. **Feedback System**
- Multi-step feedback form
- 1-5 star rating system with hover preview
- Golden star fill on selection
- Optional comment section
- Feedback history with timestamps
- Clear all feedback action

### 4. **Navigation & Routing**
- React Router with protected routes
- Sidebar navigation with active state
- Feature placeholder buttons with toast notifications
- Mobile-responsive navigation

### 5. **Styling & UX**
- Minimal, clean design language
- Smooth transitions and hover effects
- Responsive typography and spacing
- Proper focus states for accessibility
- Loading and empty states

## 🔐 User States

### **u1 - Empty User (New User)**
- **Email**: `user.u1@example.com`
- **Password**: `password`
- **State**: No call history, empty stats
- **UI**: Shows empty state message

### **u2 - Active User (Existing User)**
- **Email**: `user.u2@example.com`
- **Password**: `password`
- **State**: Full call history and statistics
- **UI**: Displays populated dashboard

## 🔗 API Integration

All data is fetched from the mock API without hardcoding:

```
Base URL: https://mock-backend-hintro.vercel.app
```

### Endpoints Used:
- `GET /api/auth/profile` - User profile data
- `GET /api/auth/dashboard` - Dashboard info
- `GET /api/call-sessions/stats` - User statistics
- `GET /api/call-sessions?limit=20` - Call history

### Environment Variables:
```
VITE_API_URL=https://mock-backend-hintro.vercel.app
```

Change this in Netlify environment settings to use a different backend.

## 📱 Responsive Design

- **Desktop** (1024px+): Full layout with sidebar
- **Tablet** (768px-1023px): Optimized for medium screens
- **Mobile** (< 768px): Stack layout, hamburger menu, touch-friendly

All components use relative sizing and CSS Grid/Flexbox for flexible layouts.

## 🎨 Design Implementation

- Followed Figma design specifications precisely
- Color palette: Minimalist with accent purple (#6c47ff)
- Typography: DM Sans with proper hierarchy
- Spacing: 4px-based unit system for consistency
- Border radius: Subtle rounded corners (6-20px range)
- Shadows: Soft shadows for depth

## 🚢 Deployment

### Netlify Deployment
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 22.x
- **Redirects**: All routes redirect to `/index.html` for React Router

### Environment Variables on Netlify:
```
VITE_API_URL = https://mock-backend-hintro.vercel.app
```

## 📝 Key Implementation Details

### Mock Authentication
The login system is purely client-side:
- Email containing "u1" → logs in as u1 (empty user)
- Any other email → logs in as u2 (active user)
- No real authentication, credentials are hardcoded for demo

### State Persistence
- `userId` stored in localStorage
- Persists across browser refresh
- Clears on logout

### Loading States
- Skeleton loaders while fetching API data
- Graceful fallbacks for errors
- Proper loading indicators

### Form Validation
- Email format validation
- Required field checks
- Inline error messages
- Submit button disabled until valid

## 🧪 Testing the Application

1. **Test u1 (Empty User)**:
   - Email: `user.u1@example.com`
   - See empty call history
   - Check empty state messaging

2. **Test u2 (Active User)**:
   - Email: `user.u2@example.com`
   - View populated dashboard
   - Check call statistics

3. **Test Features**:
   - Submit feedback with ratings
   - View feedback history
   - Switch between users
   - Try responsive design on mobile

## 📋 Assumptions & Notes

1. **Mock Backend Only**: This is a demo using mock APIs. Real authentication is not implemented.

2. **localStorage Limitation**: User session persists only on the same browser. Clearing browser data logs out the user.

3. **No Real Authentication**: Login is purely client-side. Security should be added when integrating with a real backend.

4. **API Environment**: The mock API URL is configured via `VITE_API_URL` environment variable, making it easy to switch backends.

5. **Feedback Storage**: Feedback is stored in localStorage and lost when cleared.

6. **Browser Compatibility**: Modern browsers only (ES6+, CSS Grid/Flexbox support).

## 📚 Code Quality

- Clean, readable code with proper naming conventions
- Component-based architecture for reusability
- Custom hooks for logic separation
- Proper error handling and fallbacks
- Accessible HTML structure and ARIA labels
- Responsive CSS with mobile-first approach

## 🔄 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint checks
```

## 📄 License

This project is part of the Hintro Frontend Developer Internship assignment.

---

## Submission Details

**GitHub Repository**: [sohamroy06/Hintro_Dashboard](https://github.com/sohamroy06/Hintro_Dashboard)

**Deployed Link**: https://hintro-dashboard.netlify.app

**Key Features**:
- ✅ Design adheres closely to Figma mockups
- ✅ Proper API integration without hardcoded data
- ✅ Both user states (u1: empty, u2: active) fully implemented
- ✅ Fully responsive design
- ✅ Clean, production-ready code
- ✅ Deployed on Netlify
- ✅ localStorage-based session management
- ✅ Smooth loading states and error handling

---

**Built with ❤️ for the Hintro Internship Program**
