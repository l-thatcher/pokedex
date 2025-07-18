import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import "./global.css";
import { useAppDispatch } from "./hooks";
import { setFavourites } from "./slices/favouritesSlice";
import { store } from "./store";

const styles = StyleSheet.create({
  border: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: "none",
  },
});

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
        <StatusBar hidden />
        <View className="pl-[30px] pr-[27px] pt-[50px] pb-[30px] flex-1">
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        <Image
          source={require("../assets/images/border.png")}
          style={styles.border}
        />
      </FavouritesLoader>
    </Provider>
  );
}
