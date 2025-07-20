import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { fetchPokemonDetailsAPI } from "../api/pokemonDetailsAPI";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectFavourites, toggleFavourite } from "../slices/favouritesSlice";
import { addRecent } from "../slices/recentsSlice";

export default function DetailsScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<"info" | "stats">("info");
  const [pokemonDetails, setPokemonDetails] = useState<PokemonData | null>(
    null
  );
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectFavourites);
  const isFavourite = pokemonDetails
    ? favourites.includes(pokemonDetails.name)
    : false;

  useEffect(() => {
    if (name) {
      fetchPokemonDetailsAPI(name as string).then(setPokemonDetails);
      dispatch(addRecent(name as string));
    }
  }, [name]);

  return (
    <View className="flex-1 pt-20 px-6 rounded-md bg-[#131313]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          onPress={() => router.back()}
          className="text-white text-lg mb-4 font-bold underline self-end"
          style={{ textDecorationLine: "underline", alignSelf: "flex-end" }}
        >
          ← Back
        </Text>
        {pokemonDetails ? (
          <View className="flex">
            <View className="flex-row h-64 bg-[#232323] rounded-xl mb-4 relative overflow-hidden">
              <View className="absolute left-4 top-4 flex-row items-center z-10">
                <Text className="text-white text-xl font-mono font-extrabold">
                  #{pokemonDetails.id}
                </Text>
              </View>
              <Image
                source={{ uri: pokemonDetails.sprites.front_default }}
                alt={`${pokemonDetails.name} sprite`}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                className="flex-1"
              />
              <Text
                onPress={() => dispatch(toggleFavourite(pokemonDetails.name))}
                className={`absolute right-4 top-4 text-4xl font-mono ${
                  isFavourite ? "text-yellow-400" : "text-white"
                } z-20`}
              >
                {isFavourite ? "★" : "☆"}
              </Text>
            </View>

            <View className="flex-row justify-center mb-4">
              <Text
                onPress={() => setSelectedTab("info")}
                className={`px-6 py-2 rounded-t-lg font-mono font-bold text-lg ${
                  selectedTab === "info"
                    ? "bg-[#232323] text-secondary"
                    : "bg-[#232323] text-gray-400"
                } mx-1`}
              >
                Info
              </Text>
              <Text
                onPress={() => setSelectedTab("stats")}
                className={`px-6 py-2 rounded-t-lg font-mono font-bold text-lg ${
                  selectedTab === "stats"
                    ? "bg-[#232323] text-secondary"
                    : "bg-[#232323] text-gray-400"
                } mx-1`}
              >
                Base Stats
              </Text>
            </View>

            <View className="bg-[#232323] rounded-xl p-4 mb-4">
              {selectedTab === "info" ? (
                <View className="flex-1">
                  <Text className="text-2xl text-white font-mono font-extrabold capitalize mb-2">
                    {pokemonDetails.name}
                  </Text>
                  <Text className="text-base text-white font-mono mb-1">
                    <Text className="font-bold">Species:</Text>{" "}
                    <Text className="font-semibold">
                      {pokemonDetails.species.name}
                    </Text>
                  </Text>
                  <Text className="text-base text-white font-mono mb-1">
                    <Text className="font-bold">Height:</Text>{" "}
                    <Text className="font-semibold">
                      {pokemonDetails.height}
                    </Text>
                  </Text>
                  <Text className="text-base text-white font-mono mb-1">
                    <Text className="font-bold">Weight:</Text>{" "}
                    <Text className="font-semibold">
                      {pokemonDetails.weight}
                    </Text>
                  </Text>
                  <Text className="text-base text-white font-mono mb-1">
                    <Text className="font-bold">Number of games:</Text>{" "}
                    <Text className="font-semibold">
                      {pokemonDetails.game_indices.length}
                    </Text>
                  </Text>
                </View>
              ) : (
                <View className="mb-2">
                  <Text className="text-lg text-white font-mono font-bold mb-2">
                    Base Stats:
                  </Text>
                  <View className="flex-row flex-wrap">
                    {pokemonDetails.stats.map((stat) => (
                      <View
                        key={stat.stat.name}
                        className="bg-[#131313] rounded-lg px-3 py-1 m-1 min-w-[110px]"
                      >
                        <Text className="text-white font-mono font-bold text-base capitalize">
                          {stat.stat.name}
                        </Text>
                        <Text className="text-white font-mono text-base">
                          {stat.base_stat}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>

            <View className="bg-[#232323] rounded-xl p-4 mb-8 mt-2">
              <Text className="text-lg text-white font-mono font-bold mb-2">
                Favourites:
              </Text>
              <View className="flex-row flex-wrap">
                {favourites.length === 0 ? (
                  <Text className="text-white font-mono">None</Text>
                ) : (
                  favourites.map((favourite) => (
                    <Link
                      key={favourite}
                      href={`/pokemonDetails/${favourite}`}
                      className="text-white font-mono mr-2 mb-2 px-3 py-1 bg-[#232323] rounded text-base"
                    >
                      {favourite}
                    </Link>
                  ))
                )}
              </View>
            </View>
          </View>
        ) : (
          <View className="w-full bg-[#232323] rounded-xl py-8 px-8 flex-row items-center justify-center mt-12">
            <Text className="text-2xl text-white font-mono font-bold">
              Loading...
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
