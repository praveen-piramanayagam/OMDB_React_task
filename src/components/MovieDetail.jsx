import React, { useEffect, useState } from "react";
import { fetchMovieDetails } from "../utils/api";
import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovieDetails(id);
      if (data.Response === "True") setMovie(data);
      else setError(data.Error);
    };
    fetchData();
  }, [id]);
  if (error) return <p className="text-red-500">{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
            alt={movie.Title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col justify-start">
          <h2 className="text-3xl font-bold mb-4">{movie.Title}</h2>
          <p className="text-lg mb-2"><strong>Year:</strong> {movie.Year}</p>
          <p className="text-lg mb-2"><strong>Genre:</strong> {movie.Genre}</p>
          <p className="text-lg mb-2"><strong>Director:</strong> {movie.Director}</p>
          <p className="text-lg mb-2"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="text-lg mb-2"><strong>IMDB Rating:</strong> {movie.imdbRating} / 10</p>
          <p className="text-lg"><strong>Plot:</strong> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
