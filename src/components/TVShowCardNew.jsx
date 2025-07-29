"use client"

import { useState, useEffect } from "react";
import { Play, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieEpisodeViewer from "./MovieEpisodeViewer";

const TVShowCard = ({ onEpisodeViewerOpen, ...show }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handlePlayClick = (e) => {
    e.stopPropagation();
    console.log("TVShowCard play clicked for:", show.title);
    setShowViewer(true);
    setIsHovered(false);
  };

  // Convert show data to movie format
  const movieData = {
    title: show.title,
    image: show.poster,
    year: show.year,
    rating: show.rating,
    genre: show.genre,
    description: show.overview || `${show.title} is an amazing ${show.genre} series with ${show.seasons} seasons.`
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

  return (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayClick}
    >
      {/* Main Poster */}
      <div className={`relative overflow-hidden rounded-lg aspect-[2/3] w-full transition-colors duration-1000 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
      }`}>
        <img 
          src={show.poster} 
          alt={show.title}
          className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button 
            size="icon" 
            variant="secondary" 
            className="w-12 h-12 rounded-full"
            onClick={handlePlayClick}
          >
            <Play className="w-6 h-6 fill-current" />
          </Button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${
            show.status === "ongoing" 
              ? "bg-green-500/20 text-green-400 border border-green-500/30" 
              : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
          }`}>
            {show.status === "ongoing" ? "ONGOING" : "COMPLETED"}
          </span>
        </div>
      </div>

      {/* Show Info */}
      <div className="mt-3 space-y-1">
        <h3 className={`font-semibold text-sm leading-tight line-clamp-2 transition-colors duration-1000 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {show.title}
          
        </h3>
        
        <div className={`flex items-center justify-between text-xs transition-colors duration-1000 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{show.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-current text-yellow-500" />
            <span>{show.rating}</span>
          </div>
        </div>

        <div className={`flex items-center justify-between text-xs transition-colors duration-1000 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <span>{show.genre}</span>
          <span>
            {show.seasons} Season{show.seasons > 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      {/* Movie Episode Viewer */}
      <MovieEpisodeViewer 
        movie={movieData}
        isOpen={showViewer}
        onClose={() => setShowViewer(false)}
      />
    </div>
  );
};

export default TVShowCard;