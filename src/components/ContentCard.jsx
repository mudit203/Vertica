"use client"

import { useState } from "react";
import MovieEpisodeViewer from "./MovieEpisodeViewer";

const ContentCard = ({ title, image, year, rating, genre, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showViewer, setShowViewer] = useState(false);

  const movieData = {
    title,
    image,
    year,
    rating,
    genre,
    description
  };

  const handlePlayClick = () => {
    console.log("Play button clicked!", title);
    setShowViewer(true);
    setIsHovered(false);
  };

  return (
    <div 
      className="group relative transform transition-all duration-300 hover:scale-110 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-800 shadow-lg">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handlePlayClick}
            className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Info Card (appears below on hover) */}
      {isHovered && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-2 p-4 shadow-lg z-20 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900">{title}</h3>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
            <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-xs font-semibold">
              {rating}
            </span>
            <span>{year}</span>
            <span>•</span>
            <span>{genre}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePlayClick}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play
            </button>
            <button className="w-8 h-8 border border-gray-300 hover:bg-gray-100 rounded-md flex items-center justify-center">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Debug State */}
      {showViewer && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded z-50">
          Viewer should be open: {showViewer.toString()}
        </div>
      )}
      
      {/* Movie Episode Viewer */}
      <MovieEpisodeViewer 
        movie={movieData}
        isOpen={showViewer}
        onClose={() => setShowViewer(false)}
      />
    </div>
  );
};

export default ContentCard;
