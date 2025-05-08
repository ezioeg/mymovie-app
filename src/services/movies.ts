import tmdbAPI from './tmdbAPI';

export const getPopularMovies = async () => {
  const res = await tmdbAPI.get('/movie/popular');
  console.log('Popular movies:', res.data.results);
  return res.data.results;
};

export const getTopRatedMovies = async () => {
  const res = await tmdbAPI.get('/movie/top_rated');
  return res.data.results;
};

export const getUpcomingMovies = async () => {
  const res = await tmdbAPI.get('/movie/upcoming');
  return res.data.results;
};

export const getNowPlayingMovies = async () => {
  const res = await tmdbAPI.get('/movie/now_playing');
  return res.data.results;
};

export const getMovieDetails = async (movieId: string | number) => {
  const res = await tmdbAPI.get(`/movie/${movieId}`);
  return res.data;
};

export const getMovieCredits = async (movieId: string | number) => {
  const res = await tmdbAPI.get(`/movie/${movieId}/credits`);
  console.log('CREDITS MOVIE:', res.data);
  return res.data;
};

export const getMovieRecommendations = async (movieId: string | number) => {
  const res = await tmdbAPI.get(`/movie/${movieId}/recommendations`);
  return res.data.results;
};

export const getMovieVideos = async (movieId: string | number) => {
  const res = await tmdbAPI.get(`/movie/${movieId}/videos`);
  const limitedResults = res.data.results.slice(0, 10);
  console.log('VIDEOS MOVIE:', limitedResults);
  return limitedResults;
};

export const getMovieImages = async (movieId: string | number) => {
  const res = await tmdbAPI.get(`/movie/${movieId}/images`);
  return res.data;
};

export const getSimilarMovies = async (movieId: string | number) => {
  const res = await tmdbAPI.get(`/movie/${movieId}/similar`);
  console.log('SIMILAR MOVIES:', res.data.results);
  return res.data.results;
};
