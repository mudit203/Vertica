"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import TVShowCarousel from './TVShowCarousel';

const TopRated = () => {
  const [theme, setTheme] = useState('dark');
  const [topRatedContent, setTopRatedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Fetch top rated movies from TMDB API
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        
        // Map API response to match TVShowCard props
        const mappedMovies = response.data.results.map((movie) => ({
          id: movie.id.toString(),
          title: movie.title,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          year: new Date(movie.release_date).getFullYear().toString(),
          rating: parseFloat(movie.vote_average.toFixed(1)),
          
          genre: "Movie", // TMDB doesn't provide genre names in this endpoint
          description: movie.overview,
          seasons: 1, // Movies don't have seasons
          status: "completed" // Movies are always completed
        }));
        
        setTopRatedContent(mappedMovies);
        setError(null);
      } catch (err) {
        console.error('Error fetching top rated movies:', err);
        setError('Failed to load top rated movies');
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);


  const handleEpisodeViewerOpen = (show) => {
    console.log("Opening episode viewer for:", show.title);
  };

  if (loading) {
    return (
      <section className={`py-4 transition-colors duration-1000 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 px-8">
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-1000 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Top Rated</h2>
            <p className={`text-lg transition-colors duration-1000 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Loading top rated movies...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-4 transition-colors duration-1000 ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 px-8">
            <h2 className={`text-4xl font-bold mb-4 transition-colors duration-1000 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Top Rated</h2>
            <p className={`text-lg transition-colors duration-1000 ${
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`}>
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="movies" className="relative z-10 py-4 transition-colors duration-1000">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 px-8">
          <h2 className={`text-4xl font-bold mb-4 transition-colors duration-1000 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>Top Rated</h2>
          <p className={`text-lg transition-colors duration-1000 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Highest rated movies of all time
          </p>
        </div>
        
        <TVShowCarousel
          title=""
          shows={topRatedContent}
          onShowClick={handleEpisodeViewerOpen}
        />
      </div>
    </section>
  );
};

export default TopRated;