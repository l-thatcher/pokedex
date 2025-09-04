import { Stack } from "expo-router";
import { useEffect } from "react";
import { Image, Platform, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import "./global.css";
import { useAppDispatch } from "./hooks";
// import { setFavourites } from "./slices/favouritesSlice";
import { login } from "./api/authAPI";
import { fetchAllPokemon } from "./slices/pokemonAPISlice";
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
    // AsyncStorage.getItem("favourites").then((data) => {
    //   if (data) {
    //     dispatch(setFavourites(JSON.parse(data)));
    //   }
    // });
    dispatch(fetchAllPokemon());
    login("louis@email.com", "password");
  }, [dispatch]);

  return <>{children}</>;
}

export default function RootLayout() {
  const isWeb = Platform.OS === "web";
  const content = (
    <>
      <StatusBar hidden />
      <View className="pl-[30px] pr-[27px] pt-[45px] pb-[30px] flex-1">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <Image
        source={require("../assets/images/border.png")}
        style={styles.border}
      />
    </>
  );
  return (
    <Provider store={store}>
      <FavouritesLoader>
        {isWeb ? (
          <View className="web-portrait-wrapper">
            <View
              style={{
                aspectRatio: 0.462,
                flex: 1,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              {content}
            </View>
          </View>
        ) : (
          content
        )}
      </FavouritesLoader>
    </Provider>
  );
}
