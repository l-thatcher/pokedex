import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import FavouriteTile from "../components/FavouriteTile";
import { useAppSelector } from "./hooks";
import { selectFavourites } from "./slices/favouritesSlice";

export default function Favourites() {
  const favourites = useAppSelector(selectFavourites);

  return (
    <View className="flex-1 pt-20 px-6 rounded-md bg-[#131313]">
      <Text
        onPress={() => router.back()}
        className="text-white text-lg mb-4 font-bold"
        style={{ textDecorationLine: "underline", alignSelf: "flex-end" }}
      >
        ← Back
      </Text>
      <Text className="text-white text-2xl font-bold mb-4">Favourites</Text>
      {favourites.length > 0 ? (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <FavouriteTile name={item} />}
          className="w-full"
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white w-3/4 text-center">
            No favourites yet! Add some Pokémon to your favourites to see them
            here.
          </Text>
        </View>
      )}
    </View>
  );
}
