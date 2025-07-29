"use client"

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TVShowCard from "./TVShowCardNew";

const TVShowCarousel = ({ title, shows, onShowClick }) => {
  const scrollRef = useRef(null);
  const [theme, setTheme] = useState('dark');

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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group mb-12">
      <h2 className={`text-2xl font-bold mb-6 px-8 transition-colors duration-1000 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h2>
      
      <div className="relative">
        {/* Left Scroll Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800/80 hover:bg-gray-800/90 text-white' 
              : 'bg-white/80 hover:bg-white/90 text-gray-900'
          }`}
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>

        {/* Shows Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto hide-scrollbar px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {shows.map((show) => (
            <div key={show.id} className="flex-none w-44">
              <TVShowCard {...show} onEpisodeViewerOpen={onShowClick} />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800/80 hover:bg-gray-800/90 text-white' 
              : 'bg-white/80 hover:bg-white/90 text-gray-900'
          }`}
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
};

export default TVShowCarousel;