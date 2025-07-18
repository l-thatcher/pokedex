import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouritesState {
  favourites: string[];
}

const initialState: FavouritesState = {
  favourites: [],
};

const FAVOURITES_KEY = "favourites";

const saveFavourites = async (favourites: string[]) => {
  await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, action: PayloadAction<string[]>) => {
      state.favourites = action.payload;
    },
    addFavourite: (state, action: PayloadAction<string>) => {
      if (!state.favourites.includes(action.payload)) {
        state.favourites.push(action.payload);
        saveFavourites(state.favourites);
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(name => name !== action.payload);
      saveFavourites(state.favourites);
    },
    clearFavourites: (state) => {
      state.favourites = [];
      saveFavourites(state.favourites);
    },
    toggleFavourite: (state, action: PayloadAction<string>) => {
      if (state.favourites.includes(action.payload)) {
        state.favourites = state.favourites.filter(name => name !== action.payload);
      } else {
        state.favourites.push(action.payload);
      }
      saveFavourites(state.favourites);
    },
  },
});

export const { setFavourites, addFavourite, removeFavourite, clearFavourites, toggleFavourite } = favouritesSlice.actions;
export const selectFavourites = (state: { favourites: FavouritesState }) => state.favourites.favourites;
export default favouritesSlice.reducer;