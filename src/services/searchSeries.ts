import tmdbAPI from './tmdbAPI';

export const searchSeriesByTitle = async (query: string) => {
  const res = await tmdbAPI.get('/search/tv', {
    params: {query},
  });
  return res.data.results;
};

export const searchSeriesByYear = async (query: string, year: number) => {
  const res = await tmdbAPI.get('/search/tv', {
    params: {
      query,
      first_air_date_year: year,
    },
  });
  return res.data.results;
};

export const getSeriesGenres = async () => {
  const res = await tmdbAPI.get('/genre/tv/list');
  return res.data.genres;
};

export const discoverSeries = async ({
  genreId,
  year,
  language,
  sortBy = 'popularity.desc',
}: {
  genreId?: number;
  year?: number;
  language?: string;
  sortBy?: string;
}) => {
  const res = await tmdbAPI.get('/discover/tv', {
    params: {
      with_genres: genreId,
      first_air_date_year: year,
      language,
      sort_by: sortBy,
    },
  });
  return res.data.results;
};
