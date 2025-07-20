import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './slices/favouritesSlice';
import pokemonReducer from './slices/pokemonAPISlice';
import recentsReducer from './slices/recentsSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    favourites: favouritesReducer,
    recents: recentsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store