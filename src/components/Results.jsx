import React, { useState, useEffect } from "react";
import { fetchMovies } from "../utils/api";
import { useLocation, Link } from "react-router-dom";

function Results() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const data = await fetchMovies(query, null, page, type);
        if (data.Response === "True") {
          setMovies(data.Search);
          setError(null);
        } else {
          setError(data.Error);
        }
      } catch (error) {
        setError("Failed to fetch data.");
      }
    };

    if (query) fetchMovieData();
  }, [query, page, type]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Search Results for "{query}"</h2>
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <select
          value={type}
          onChange={handleTypeChange}
          className="w-full sm:w-auto border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.slice(0, 9).map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="bg-white p-4 shadow rounded-lg">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{movie.Title}</h3>
              <p className="text-gray-500">{movie.Year}</p>
            </Link>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md disabled:bg-gray-200 disabled:text-gray-500"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Results;
