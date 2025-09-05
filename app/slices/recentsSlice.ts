import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecentsState {
  recents: string[];
}

const initialState: RecentsState = {
  recents: [],
};

const RECENTS_KEY = "recents";

const saveRecents = async (recents: string[]) => {
  await AsyncStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
};

const recentsSlice = createSlice({
  name: "recents",
  initialState,
  reducers: {
    setRecents: (state, action: PayloadAction<string[]>) => {
      state.recents = action.payload;
    },
    addRecent: (state, action: PayloadAction<string>) => {
      if (!state.recents.includes(action.payload)) {
        state.recents.push(action.payload);
        saveRecents(state.recents);
      }
    },
    removeRecent: (state, action: PayloadAction<string>) => {
      state.recents = state.recents.filter((name) => name !== action.payload);
      saveRecents(state.recents);
    },
    clearRecents: (state) => {
      state.recents = [];
      saveRecents(state.recents);
    },
  },
});

export const { setRecents, addRecent, removeRecent, clearRecents } =
  recentsSlice.actions;
export const selectRecents = (state: { recents: RecentsState }) =>
  state.recents.recents;
export default recentsSlice.reducer;
