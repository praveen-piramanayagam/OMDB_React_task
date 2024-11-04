import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length < 2) {
      alert("Please enter at least 2 characters to search.");
      return;
    }
    navigate(`/results?search=${query}&year=${year}&type=${type}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">OMDB Movie Search</h1>
      
      <form onSubmit={handleSearch} className="flex flex-col items-center w-full max-w-md space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Search for movies or series..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Home;
