import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
} from '../../services/movies';
import {
  discoverMovies,
  getMoviesGenres,
  searchMoviesByTitle,
} from '../../services/searchMovies';

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (_, {rejectWithValue}) => {
    try {
      return await getPopularMovies();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async (_, {rejectWithValue}) => {
    try {
      return await getTopRatedMovies();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async (_, {rejectWithValue}) => {
    try {
      return await getUpcomingMovies();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchNowPlayingMovies = createAsyncThunk(
  'movies/fetchNowPlaying',
  async (_, {rejectWithValue}) => {
    try {
      return await getNowPlayingMovies();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMoviesGenres = createAsyncThunk(
  'movies/fetchMoviesGenres',
  async (_, {rejectWithValue}) => {
    try {
      return await getMoviesGenres();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchMoviesByGenre',
  async (genreId: number, {rejectWithValue}) => {
    try {
      return await discoverMovies({genreId});
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMoviesByTitle = createAsyncThunk(
  'series/fetchMoviesByTitle',
  async (query: string, {rejectWithValue}) => {
    try {
      return await searchMoviesByTitle(query);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMovieCredits = createAsyncThunk(
  'movies/fetchCredits',
  async (movieId: string | number, {rejectWithValue}) => {
    try {
      return await getMovieCredits(movieId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMovieVideos = createAsyncThunk(
  'movies/fetchVideos',
  async (movieId: string | number, {rejectWithValue}) => {
    try {
      return await getMovieVideos(movieId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSimilarMovies = createAsyncThunk(
  'movies/fetchSimilar',
  async (movieId: string | number, {rejectWithValue}) => {
    try {
      return await getSimilarMovies(movieId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

interface MovieState {
  popular: any[];
  topRated: any[];
  upcoming: any[];
  nowPlaying: any[];
  selectedMovie: any | null;
  genres: any[];
  filteredByTitle: any[];
  credits: any | null;
  videos: any[];
  similarMovies: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  popular: [],
  topRated: [],
  upcoming: [],
  nowPlaying: [],
  selectedMovie: null,
  genres: [],
  filteredByTitle: [],
  credits: null,
  videos: [],
  similarMovies: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPopularMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.loading = false;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al obtener populares';
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated = action.payload;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.nowPlaying = action.payload;
      })
      .addCase(fetchMoviesGenres.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al obtener géneros';
      })
      .addCase(fetchMoviesByGenre.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Movies by genre:', action.payload);
        state.popular = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Error al obtener movies por género';
      })
      .addCase(fetchMoviesByTitle.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMoviesByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredByTitle = action.payload;
      })
      .addCase(fetchMoviesByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMovieCredits.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload;
      })
      .addCase(fetchMovieCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMovieVideos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchMovieVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSimilarMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.similarMovies = action.payload;
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setSelectedMovie} = moviesSlice.actions;
export default moviesSlice.reducer;
