import axios from "axios";

const API_KEY = "f5028d31";

export const fetchMovies = async (query, year, page, type) => {
  let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`;
  
  if (year) {
    url += `&y=${year}`;
  }
  if (type) {
    url += `&type=${type}`;
  }

  const response = await axios.get(url);
  
  if (response.data.Error === "Too many results.") {
    return { Response: "False", Error: "Too many results. Please refine your search." };
  }

  return response.data;
};

export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);
  return response.data;
};
