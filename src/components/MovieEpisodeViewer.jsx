"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Play, Download, Clock, Star, Heart, Share, Bookmark, ChevronUp, ChevronDown } from "lucide-react";

// Simple Badge component inline
const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

// Mock movie episodes/scenes generator
const generateMovieScenes = (movie) => {
  const scenes = [
    {
      id: 1,
      title: "Opening Scene",
      description: "The movie begins with an establishing shot that sets the tone and introduces our protagonist in their ordinary world. This scene establishes the visual style and mood.",
      thumbnail: movie.image,
      duration: "8:30",
      timestamp: "00:00",
      rating: "8.9",
      type: "Opening"
    },
    {
      id: 2,
      title: "Character Introduction", 
      description: "Meet the main characters and understand their motivations, relationships, and the world they inhabit. Character development and backstory revealed.",
      thumbnail: movie.image,
      duration: "12:45",
      timestamp: "08:30",
      rating: "8.7",
      type: "Character"
    },
    {
      id: 3,
      title: "Rising Action",
      description: "The plot thickens as conflicts arise and tensions build between characters, setting up the main story arc. Stakes are raised significantly.",
      thumbnail: movie.image,
      duration: "15:20",
      timestamp: "21:15",
      rating: "9.1",
      type: "Action"
    },
    {
      id: 4,
      title: "Plot Twist",
      description: "A major revelation changes everything we thought we knew about the story and characters. The audience's expectations are completely subverted.",
      thumbnail: movie.image,
      duration: "10:30",
      timestamp: "36:35",
      rating: "9.4",
      type: "Twist"
    },
    {
      id: 5,
      title: "Climax",
      description: "The most intense and dramatic moment of the film where all conflicts come to a head. This is the emotional peak of the entire story.",
      thumbnail: movie.image,
      duration: "18:45",
      timestamp: "47:05",
      rating: "9.6",
      type: "Climax"
    },
    {
      id: 6,
      title: "Resolution",
      description: "The aftermath of the climax and how the characters deal with the consequences of their actions. Loose ends are tied up and closure is provided.",
      thumbnail: movie.image,
      duration: "14:20",
      timestamp: "65:50",
      rating: "8.8",
      type: "Resolution"
    }
  ];

  return scenes;
};

const MovieEpisodeViewer = ({ movie, isOpen, onClose }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Prevent body scroll when viewer is open
  useEffect(() => {
    if (isOpen) {
      // Store original overflow and set to hidden
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore original overflow
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);
  
  if (!movie || !isOpen) return null;

  const scenes = generateMovieScenes(movie);
  const currentScene = scenes[currentSceneIndex];

  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const itemHeight = container.scrollHeight / scenes.length;
    const newIndex = Math.round(scrollTop / itemHeight);
    
    if (newIndex !== currentSceneIndex && newIndex >= 0 && newIndex < scenes.length) {
      setCurrentSceneIndex(newIndex);
    }
  };

  const navigateScene = (direction) => {
    if (direction === 'up' && currentSceneIndex > 0) {
      setCurrentSceneIndex(currentSceneIndex - 1);
    } else if (direction === 'down' && currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Static Background */}
      <div className="absolute inset-0 bg-black">
        <img 
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90" />
      </div>
      
      {/* Floating Header */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/95 via-black/70 to-transparent p-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <img 
              src={movie.image} 
              alt={movie.title}
              className="w-12 h-16 object-cover rounded-lg shadow-lg border border-red-500/30 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-white truncate">{movie.title}</h2>
              <div className="flex items-center gap-1 text-xs text-white/80 flex-wrap">
                <span className="truncate">{movie.year}</span>
                <span>•</span>
                <span className="truncate">{movie.genre}</span>
                <span>•</span>
                <span className="text-yellow-400 flex-shrink-0">⭐ {movie.rating}</span>
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="text-white hover:bg-red-500/20 rounded-full border border-white/20 flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scene Progress Indicator */}
      <div className="absolute top-20 left-0 right-0 z-30 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex gap-1">
            {scenes.map((_, index) => (
              <div 
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  index === currentSceneIndex 
                    ? 'bg-red-500' 
                    : index < currentSceneIndex 
                      ? 'bg-red-500/50'
                      : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateScene('up')}
            disabled={currentSceneIndex === 0}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-red-500/20 border border-white/20 disabled:opacity-30"
          >
            <ChevronUp className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateScene('down')}
            disabled={currentSceneIndex === scenes.length - 1}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-red-500/20 border border-white/20 disabled:opacity-30"
          >
            <ChevronDown className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* TikTok-style Vertical Feed */}
      <div 
        className="h-screen overflow-y-auto snap-y snap-mandatory pt-24 pb-4 scrollbar-hide relative z-20"
        onScroll={handleScroll}
        style={{ scrollBehavior: 'smooth' }}
      >
        {scenes.map((scene, index) => (
          <div 
            key={scene.id}
            className="h-screen snap-start flex items-center justify-center p-4 relative"
          >

            {/* Scene Content */}
            <div className="relative z-10 w-full max-w-sm mx-auto">
              {/* Scene Type Badge */}
              <div className="absolute -top-6 left-0">
                <Badge className="bg-red-500/90 text-white border-red-500/50 backdrop-blur-sm font-semibold">
                  {scene.type}
                </Badge>
              </div>

              {/* Main Content Card */}
              <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20 shadow-2xl">
                <div className="space-y-4">
                  {/* Scene Poster */}
                  <div className="relative mx-auto w-48 h-72 rounded-xl overflow-hidden shadow-2xl border-2 border-red-500/30">
                    <img 
                      src={scene.thumbnail}
                      alt={scene.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    
                    {/* Overlay Info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between text-xs text-white/90 mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>{scene.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-3 h-3 fill-current text-yellow-400" />
                          <span>{scene.rating}</span>
                        </div>
                      </div>
                      
                      {/* Timestamp */}
                      <div className="text-xs text-red-400 font-mono bg-black/50 px-2 py-1 rounded">
                        {scene.timestamp}
                      </div>
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <div className="w-16 h-16 bg-red-500/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Scene Info */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {scene.title}
                    </h3>
                    
                    <p className="text-sm text-white/80 leading-relaxed text-left">
                      {scene.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all"
                    >
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      Play Scene
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-black/50 border-white/30 text-white hover:bg-white/20 rounded-full"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Social Actions */}
                  <div className="flex justify-center gap-4 pt-2 border-t border-white/10">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`${isLiked ? 'text-red-400 hover:text-red-300' : 'text-white/70 hover:text-red-400'} hover:bg-red-500/10`}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                      <span className="text-xs">{isLiked ? 'Liked' : 'Like'}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-blue-400 hover:bg-blue-500/10">
                      <Share className="w-4 h-4 mr-1" />
                      <span className="text-xs">Share</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`${isBookmarked ? 'text-yellow-400 hover:text-yellow-300' : 'text-white/70 hover:text-yellow-400'} hover:bg-yellow-500/10`}
                    >
                      <Bookmark className={`w-4 h-4 mr-1 ${isBookmarked ? 'fill-current' : ''}`} />
                      <span className="text-xs">{isBookmarked ? 'Saved' : 'Save'}</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Hint */}
              {index === 0 && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
                  <div className="text-white/60 text-xs mb-2">Swipe up for next scene</div>
                  <div className="w-1 h-6 bg-gradient-to-t from-red-500/70 to-transparent rounded-full mx-auto"></div>
                </div>
              )}
            </div>

            {/* Side Actions (TikTok style) */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsLiked(!isLiked)}
                className={`w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 transition-all ${
                  isLiked 
                    ? 'text-red-400 hover:bg-red-500/20 border-red-500/40' 
                    : 'text-white hover:bg-red-500/20'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-blue-500/20 border border-white/20"
              >
                <Share className="w-6 h-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 transition-all ${
                  isBookmarked 
                    ? 'text-yellow-400 hover:bg-yellow-500/20 border-yellow-500/40' 
                    : 'text-white hover:bg-yellow-500/20'
                }`}
              >
                <Bookmark className={`w-6 h-6 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Scene Counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30">
          <span className="text-white text-sm font-mono">
            Scene {currentSceneIndex + 1} of {scenes.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieEpisodeViewer;