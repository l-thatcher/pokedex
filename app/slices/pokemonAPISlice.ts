import { PokemonArray } from '@/interfaces/pokemon_interfaces';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface PokemonState {
  all: PokemonArray;
  count: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PokemonState = {
  all: { results: [] },
  count: 0,
  status: 'idle',
};

export const fetchAllPokemon = createAsyncThunk<PokemonArray>(
  'pokemon/fetchAll',
  async () => {
    const response = await fetch(`/pokemon_search`);
    return (await response.json()) as PokemonArray;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPokemon.fulfilled, (state, action: PayloadAction<PokemonArray>) => {
        state.status = 'succeeded';
        state.all = action.payload;
      })
      .addCase(fetchAllPokemon.rejected, (state) => {
        state.status = 'failed';
      });
  },
});


export const selectAllPokemon = (state: RootState) => state.pokemon.all;
export const selectStatus = (state: RootState) => state.pokemon.status;

export default pokemonSlice.reducer;