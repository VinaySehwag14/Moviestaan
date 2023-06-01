import { configureStore } from '@reduxjs/toolkit';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';
import { tmdbApi } from '../services/TMBD';
import authUserReducer from '../features/auth';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    currentUser: authUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
