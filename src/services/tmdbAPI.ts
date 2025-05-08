import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3';
export const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

const TMDB_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmQ0NDE1MzU2MWE4ZDI2NGE0YTRjNjk3ZTk2OWU4MyIsIm5iZiI6MTc0NjYyOTIxOC43OTMsInN1YiI6IjY4MWI3MjYyZjE0M2Q5ODY3ZWU2NjUxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7NyvIGMNz_BbNEF0CBdU-IKlDoP-yowK1orj621gyc';

const tmdbAPI = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export default tmdbAPI;
