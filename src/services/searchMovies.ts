import tmdbAPI from './tmdbAPI';

export const searchMoviesByTitle = async (query: string) => {
  const res = await tmdbAPI.get('/search/movie', {
    params: {query},
  });
  return res.data.results;
};

export const searchMoviesByYear = async (query: string, year: number) => {
  const res = await tmdbAPI.get('/search/movie', {
    params: {query, primary_release_year: year},
  });
  return res.data.results;
};

export const getMoviesGenres = async () => {
  const res = await tmdbAPI.get('/genre/movie/list');
  console.log('Movie genres:', res.data.genres);
  return res.data.genres;
};

export const discoverMovies = async ({
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
  const res = await tmdbAPI.get('/discover/movie', {
    params: {
      with_genres: genreId,
      primary_release_year: year,
      language,
      sort_by: sortBy,
    },
  });
  return res.data.results;
};
