"use client"

import { Play, Info, Plus, Search, Bell, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import axios from "axios";





const Hero = () => {
  
  const [theme, setTheme] = useState('dark');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      const startingY = window.pageYOffset;
      const diff = offsetTop - startingY;
      const duration = 1000; // 1 second duration
      let start;

    
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      // Animation function
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        const easedPercent = easeInOutCubic(percent);
        
        window.scrollTo(0, startingY + diff * easedPercent);
        
        if (time < duration) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }
  };

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event) => {
      setTheme(event.detail);
    };

    // Get initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Listen for theme changes
    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);



  // Get text colors based on theme
  const getTextColor = (isIcon = false) => {
    if (isIcon) {
      return theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700';
    }
    return theme === 'dark' ? 'text-white' : 'text-black';
  };

  // Search functionality
  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setSuggestion('');
  };

  const searchMovies = async (query) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language&query=${encodeURIComponent(query)}`
      );
      const results = response.data.results || [];
      setSearchResults(results);
      
   
      if (results.length > 0 && query.length > 0) {
        const firstResult = results[0].title;
        const queryLower = query.toLowerCase();
        const titleLower = firstResult.toLowerCase();
        
        if (titleLower.startsWith(queryLower)) {
          setSuggestion(firstResult);
        } else {
          setSuggestion('');
        }
      } else {
        setSuggestion('');
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setSuggestion('');
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce functionality
  const debounceTimeoutRef = useRef(null);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear suggestion if query is cleared
    if (!value.trim()) {
      setSuggestion('');
    }
    
    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    // Set new timeout for debounced search
    debounceTimeoutRef.current = setTimeout(() => {
      if (value.trim()) {
        searchMovies(value);
      } else {
        setSearchResults([]);
        setSuggestion('');
      }
    }, 300); // Reduced to 300ms for better responsiveness
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && suggestion && suggestion.toLowerCase().startsWith(searchQuery.toLowerCase())) {
      e.preventDefault();
      setSearchQuery(suggestion);
      setSuggestion('');
      searchMovies(suggestion);
    } else if (e.key === 'Escape') {
      setSuggestion('');
    }
  };


  return (
    <section className="relative h-screen flex flex-col overflow-hidden bg-transparent">
      
      {/* Navigation Bar */}
      <motion.nav 
        className="relative z-30 flex items-center justify-between p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left side - Brand */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-red-500">
            VERTICA
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          <button 
            onClick={() => {
              const startingY = window.pageYOffset;
              const duration = 1000;
              let start;

              const easeInOutCubic = (t) => {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
              };

              const step = (timestamp) => {
                if (!start) start = timestamp;
                const time = timestamp - start;
                const percent = Math.min(time / duration, 1);
                const easedPercent = easeInOutCubic(percent);
                
                window.scrollTo(0, startingY * (1 - easedPercent));
                
                if (time < duration) {
                  window.requestAnimationFrame(step);
                }
              };

              window.requestAnimationFrame(step);
            }}
            className={`${getTextColor(true)} transition-colors font-medium hover:text-red-500`}
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('series')}
            className={`${getTextColor(true)} transition-colors font-medium hover:text-red-500`}
          >
            Series
          </button>
          <button 
            onClick={() => scrollToSection('movies')}
            className={`${getTextColor(true)} transition-colors font-medium hover:text-red-500`}
          >
            Movies
          </button>
          <Link href="" className={`${getTextColor(true)} transition-colors font-medium hover:text-red-500`}>
            Originals
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggleButton variant="circle" showLabel={false} />
          <Search 
            className={`w-6 h-6 ${getTextColor(true)} cursor-pointer transition-colors`} 
            onClick={handleSearchClick}
          />
          <Bell className={`w-6 h-6 ${getTextColor(true)} cursor-pointer transition-colors`} />
          <User className={`w-6 h-6 ${getTextColor(true)} cursor-pointer transition-colors`} />
        </div>
      </motion.nav>


      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <motion.div 
          className="max-w-4xl px-6 md:px-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          
          <motion.h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${getTextColor()} leading-tight text-center`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.2 
            }}
          >
            <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              VERTICA
            </span>
          </motion.h1>
          
          <motion.p 
            className={`text-lg md:text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8 leading-relaxed max-w-lg text-center mx-auto font-bold`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 0.6 
            }}
          >
            "Stream Beyond Reality"
             
          </motion.p>
              <motion.p 
            className={`text-lg md:text-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-black'} mb-8 leading-relaxed max-w-lg text-center mx-auto font-bold font-extralight`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: 0.6 
            }}
          >
           Your next favorite movie is just a swipe away.
             
          </motion.p>

        </motion.div>
      </div>

      {/* Search Dialog */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSearchClose}
          >
            <motion.div
              className={`w-full max-w-4xl h-[600px] ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-2xl overflow-hidden flex flex-col`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dialog Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <h2 className={`text-xl font-semibold ${getTextColor()}`}>Search Movies</h2>
                <button
                  onClick={handleSearchClose}
                  className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${getTextColor()}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Input */}
              <div className="p-4 flex-shrink-0">
                <div className="relative">
                  {/* Ghost text suggestion - appears as placeholder */}
                  {suggestion && searchQuery && suggestion.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                    <div
                      className="absolute inset-0 flex items-center px-4 pointer-events-none"
                      style={{ 
                        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                        zIndex: 15,
                        fontSize: '16px',
                        lineHeight: '1.5rem'
                      }}
                    >
                      <span style={{ 
                        visibility: 'hidden', 
                        fontSize: 'inherit', 
                        fontFamily: 'inherit',
                        fontWeight: 'inherit'
                      }}>
                        {searchQuery}
                      </span>
                      <span style={{ 
                        fontSize: 'inherit', 
                        fontFamily: 'inherit',
                        fontWeight: 'inherit',
                        opacity: 0.7,
                        fontStyle: 'italic'
                      }}>
                        {suggestion.slice(searchQuery.length)}
                      </span>
                    </div>
                  )}
                  
                  {/* Actual input */}
                  <input
                    type="text"
                    placeholder={suggestion && searchQuery ? "" : "Search for movies..."}
                    value={searchQuery}
                    onChange={handleSearchInput}
                    onKeyDown={handleKeyDown}
                    className={`relative z-10 w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-gray-50 border-gray-300 text-black placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                    autoFocus
                  />
                </div>
                
                {/* Helper text */}
                {suggestion && searchQuery && suggestion.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                  <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    Press Tab to accept suggestion
                  </p>
                )}
                
                {/* Temporary debug - remove this after testing */}
                {suggestion && (
                  <div className="text-xs mt-1 text-blue-400">
                    Current suggestion: "{suggestion}"
                  </div>
                )}
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto">
                {!searchQuery ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Search className={`w-16 h-16 mx-auto mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                      <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Search for movies and series
                      </p>
                      <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Start typing to find your favorite content
                      </p>
                    </div>
                  </div>
                ) : isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    <span className={`ml-3 ${getTextColor()}`}>Searching...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {searchResults.slice(0, 10).map((movie) => (
                      <div
                        key={movie.id}
                        className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => {
                          // Handle movie selection here
                          console.log('Selected movie:', movie);
                          handleSearchClose();
                        }}
                      >
                        <div className="flex-shrink-0 w-16 h-24 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                          {movie.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className={`font-semibold ${getTextColor()}`}>{movie.title}</h3>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}
                          </p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
                            {movie.overview || 'No description available'}
                          </p>
                        </div>
                        <div className="flex items-center ml-4">
                          <span className={`text-sm font-medium ${getTextColor()}`}>
                            ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <span className={`${getTextColor()}`}>No movies found for "{searchQuery}"</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
