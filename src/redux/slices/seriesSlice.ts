import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getPopularSeries,
  getTopRatedSeries,
  getUpcomingSeries,
  getNowPlayingSeries,
  getSerieCredits,
  getSerieVideos,
  getSimilarSeries,
} from '../../services/series';
import {
  discoverSeries,
  getSeriesGenres,
  searchSeriesByTitle,
} from '../../services/searchSeries';

export const fetchPopularSeries = createAsyncThunk(
  'series/fetchPopular',
  async (_, {rejectWithValue}) => {
    try {
      return await getPopularSeries();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTopRatedSeries = createAsyncThunk(
  'series/fetchTopRated',
  async (_, {rejectWithValue}) => {
    try {
      return await getTopRatedSeries();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUpcomingSeries = createAsyncThunk(
  'series/fetchUpcoming',
  async (_, {rejectWithValue}) => {
    try {
      return await getUpcomingSeries();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchNowPlayingSeries = createAsyncThunk(
  'series/fetchNowPlaying',
  async (_, {rejectWithValue}) => {
    try {
      return await getNowPlayingSeries();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSeriesGenres = createAsyncThunk(
  'series/fetchSeriesGenres',
  async (_, {rejectWithValue}) => {
    try {
      return await getSeriesGenres();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSeriesByGenre = createAsyncThunk(
  'series/fetchSeriesByGenre',
  async (genreId: number, {rejectWithValue}) => {
    try {
      return await discoverSeries({genreId});
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSeriesByTitle = createAsyncThunk(
  'series/fetchSeriesByTitle',
  async (query: string, {rejectWithValue}) => {
    try {
      return await searchSeriesByTitle(query);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSerieCredits = createAsyncThunk(
  'series/fetchCredits',
  async (tvId: string | number, {rejectWithValue}) => {
    try {
      return await getSerieCredits(tvId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSerieVideos = createAsyncThunk(
  'series/fetchVideos',
  async (tvId: string | number, {rejectWithValue}) => {
    try {
      return await getSerieVideos(tvId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSimilarSeries = createAsyncThunk(
  'series/fetchSimilar',
  async (tvId: string | number, {rejectWithValue}) => {
    try {
      return await getSimilarSeries(tvId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

interface TVState {
  popular: any[];
  topRated: any[];
  upcoming: any[];
  nowPlaying: any[];
  selectedSerie: any | null;
  genres: any[];
  filteredByTitle: any[];
  credits: any | null;
  videos: any[];
  similarSeries: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TVState = {
  popular: [],
  topRated: [],
  upcoming: [],
  nowPlaying: [],
  selectedSerie: null,
  genres: [],
  filteredByTitle: [],
  credits: null,
  videos: [],
  similarSeries: [],
  loading: false,
  error: null,
};

const tvSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    setSelectedSerie: (state, action) => {
      state.selectedSerie = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPopularSeries.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularSeries.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.loading = false;
      })
      .addCase(fetchPopularSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al obtener populares';
      })
      .addCase(fetchTopRatedSeries.fulfilled, (state, action) => {
        state.topRated = action.payload;
      })
      .addCase(fetchUpcomingSeries.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })
      .addCase(fetchNowPlayingSeries.fulfilled, (state, action) => {
        state.nowPlaying = action.payload;
      })
      .addCase(fetchSeriesGenres.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.loading = false;
      })
      .addCase(fetchSeriesGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error al obtener géneros';
      })
      .addCase(fetchSeriesByGenre.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Series by genre:', action.payload);
        state.popular = action.payload;
      })
      .addCase(fetchSeriesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Error al obtener series por género';
      })
      .addCase(fetchSeriesByTitle.pending, state => {
        state.loading = true;
      })
      .addCase(fetchSeriesByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredByTitle = action.payload;
      })
      .addCase(fetchSeriesByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSerieCredits.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSerieCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload;
      })
      .addCase(fetchSerieCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSerieVideos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSerieVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchSerieVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSimilarSeries.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.similarSeries = action.payload;
      })
      .addCase(fetchSimilarSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {setSelectedSerie} = tvSlice.actions;
export default tvSlice.reducer;
