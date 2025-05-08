import tmdbAPI from '../tmdbAPI';

export const getPopularSeries = async () => {
  const res = await tmdbAPI.get('/tv/popular');
  console.log('Popular series:', res.data.results);
  return res.data.results;
};

export const getTopRatedSeries = async () => {
  const res = await tmdbAPI.get('/tv/top_rated');
  return res.data.results;
};

export const getUpcomingSeries = async () => {
  const res = await tmdbAPI.get('/tv/on_the_air');
  return res.data.results;
};

export const getNowPlayingSeries = async () => {
  const res = await tmdbAPI.get('/tv/airing_today');
  return res.data.results;
};

export const getSerieDetails = async (tvId: string | number) => {
  const res = await tmdbAPI.get(`/tv/${tvId}`);
  return res.data;
};

export const getSerieCredits = async (tvId: string | number) => {
  const res = await tmdbAPI.get(`/tv/${tvId}/credits`);
  console.log('CREDITS SERIE:', res.data);
  return res.data;
};

export const getSerieRecommendations = async (tvId: string | number) => {
  const res = await tmdbAPI.get(`/tv/${tvId}/recommendations`);
  return res.data.results;
};

export const getSerieVideos = async (tvId: string | number) => {
  const res = await tmdbAPI.get(`/tv/${tvId}/videos`);
  const limitedResults = res.data.results.slice(0, 10);
  console.log('VIDEOS MOVIE:', limitedResults);
  return limitedResults;
};

export const getSerieImages = async (tvId: string | number) => {
  const res = await tmdbAPI.get(`/tv/${tvId}/images`);
  return res.data;
};

export const getSimilarSeries = async (tvId: string | number) => {
  const res = await tmdbAPI.get(`/tv/${tvId}/similar`);
  console.log('SIMILAR SERIES:', res.data.results);
  return res.data.results;
};
