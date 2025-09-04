import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addFavourite,
  getFavourites,
  removeFavourite,
} from "../api/favouritesAPI";

interface Favourite {
  id: number;
  user_id: number;
  pokemon_name: string;
  created_at: string;
  updated_at: string;
}

interface FavouritesState {
  items: Favourite[];
  loading: boolean;
  error: string | null;
}

const initialState: FavouritesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchFavourites = createAsyncThunk(
  "favourites/fetchFavourites",
  async () => {
    const response = await getFavourites();
    return response.favorites;
  }
);

export const addFavouriteAsync = createAsyncThunk(
  "favourites/addFavourite",
  async (name: string) => {
    const newFavourite = await addFavourite(name);
    return newFavourite;
  }
);

export const removeFavouriteAsync = createAsyncThunk(
  "favourites/removeFavourite",
  async (name: string) => {
    await removeFavourite(name);
    return name;
  }
);

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch favourites";
      })
      .addCase(addFavouriteAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFavouriteAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (fav) => fav.pokemon_name !== action.payload
        );
      });
  },
});

export default favouritesSlice.reducer;
export const selectFavourites = (state: { favourites: FavouritesState }) =>
  state.favourites.items;
