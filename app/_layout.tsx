import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { useAppDispatch } from "./hooks";
import { setFavourites } from "./slices/favouritesSlice";
import { store } from "./store";

function FavouritesLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    AsyncStorage.getItem("favourites").then((data) => {
      if (data) {
        dispatch(setFavourites(JSON.parse(data)));
      }
    });
  }, [dispatch]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <FavouritesLoader>
        <Stack />
      </FavouritesLoader>
    </Provider>
  );
}
