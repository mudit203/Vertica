# 🎬 Vertica - Stream Beyond Reality

A modern, responsive streaming platform built with Next.js, featuring movie discovery, search functionality, and an immersive user experience.


## ✨ Features

### 🎯 **Core Features**
- **Movie Discovery**: Browse trending, top-rated movies and popular TV shows
- **Smart Search**: Real-time movie search with typeahead suggestions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with smooth animations
- **Smooth Navigation**: Animated scrolling between sections

### 🎨 **Visual Features**
- **Vanta.js Background**: Interactive 3D fog effect across the entire site
- **Framer Motion**: Smooth page transitions and animations
- **Gradient Text Effects**: Eye-catching typography with animated underlines
- **Theme-Aware UI**: Consistent styling across light and dark modes

### 🔍 **Search Functionality**
- **Typeahead Suggestions**: Ghost text suggestions as you type
- **TMDB Integration**: Real-time movie data from The Movie Database
- **Keyboard Navigation**: Tab to accept suggestions, Escape to clear
- **Debounced Search**: Optimized API calls with 300ms debouncing

### 📱 **User Experience**
- **Smooth Scrolling**: Custom easing animations for navigation
- **Loading States**: Elegant loading indicators
- **Error Handling**: Graceful error messages and fallbacks
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Setup Instructions

### **Prerequisites**
- Node.js 18+ installed
- npm or yarn package manager
- TMDB API key (free from [themoviedb.org](https://www.themoviedb.org/))

### **1. Clone the Repository**
```bash
git clone https://github.com/mudit203/vertica-app.git
cd vertica-app
```

### **2. Install Dependencies**
```bash
npm install
# or
yarn install
```

### **3. Environment Setup**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

> **Get your TMDB API key:**
> 1. Sign up at [themoviedb.org](https://www.themoviedb.org/)
> 2. Go to Settings → API
> 3. Create new API key (v3 auth)
> 4. Copy the API key to your `.env.local` file

### **4. Run Development Server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### **5. Build for Production**
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **React 18** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### **3D & Visual Effects**
- **Vanta.js** - 3D background effects
- **Three.js** - 3D graphics library

### **API & Data**
- **TMDB API** - Movie and TV show data
- **Axios** - HTTP client for API requests

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
vertica-app/
├── public/                 # Static assets
│   ├── hero-bg*.jpg       # Background images
│   └── *.svg              # Icons
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Global styles
│   │   ├── layout.js      # Root layout
│   │   └── page.js        # Home page
│   ├── components/        # React components
│   │   ├── ui/           # UI components
│   │   ├── Hero.jsx      # Main hero section
│   │   ├── Trending.jsx  # Trending movies
│   │   ├── TopRated.jsx  # Top rated movies
│   │   └── ...           # Other components
│   └── lib/              # Utility libraries
├── .env.local            # Environment variables
├── tailwind.config.js    # Tailwind configuration
└── package.json          # Dependencies
```



