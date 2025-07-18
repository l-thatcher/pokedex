import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { fetchPokemonDetailsAPI } from "../api/pokemonDetailsAPI";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectFavourites, toggleFavourite } from "../slices/favouritesSlice";

export default function DetailsScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams();
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
    }
  }, [name]);

  return (
    <View className="flex-1 bg-primary px-4 py-6">
      <Text
        onPress={() => router.back()}
        className="text-white text-lg mb-4 font-bold"
        style={{ textDecorationLine: "underline", alignSelf: "flex-end" }}
      >
        ← Back
      </Text>
      {pokemonDetails ? (
        <View className="w-full bg-secondary rounded-xl py-4 px-6 shadow-md shadow-primary relative">
          {/* Star icon in top right */}
          <Text
            onPress={() => dispatch(toggleFavourite(pokemonDetails.name))}
            className={`absolute right-4 top-4 text-3xl ${
              isFavourite ? "text-yellow-400" : "text-white"
            }`}
            style={{ zIndex: 10 }}
          >
            {isFavourite ? "★" : "☆"}
          </Text>
          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: pokemonDetails.sprites.front_default }}
              alt={`${pokemonDetails.name} sprite`}
              style={{ width: 100, height: 100 }}
            />
            <View className="ml-4 flex-1">
              <Text className="text-2xl text-white font-bold capitalize mb-1">
                {pokemonDetails.name}
              </Text>
              <Text className="text-base text-white">
                Species:{" "}
                <Text className="font-semibold">
                  {pokemonDetails.species.name}
                </Text>
              </Text>
              <Text className="text-base text-white">
                Height:{" "}
                <Text className="font-semibold">{pokemonDetails.height}</Text>
              </Text>
              <Text className="text-base text-white">
                Weight:{" "}
                <Text className="font-semibold">{pokemonDetails.weight}</Text>
              </Text>
            </View>
          </View>
          <View className="mb-2">
            <Text className="text-lg text-white font-bold mb-1">
              Base Stats:
            </Text>
            {pokemonDetails.stats.map((stat) => (
              <Text key={stat.stat.name} className="text-white ml-2">
                {stat.stat.name}:{" "}
                <Text className="font-semibold">{stat.base_stat}</Text>
              </Text>
            ))}
          </View>
          <Text className="text-base text-white mb-2">
            Number of games:{" "}
            <Text className="font-semibold">
              {pokemonDetails.game_indices.length}
            </Text>
          </Text>
          <View className="mt-2">
            <Text className="text-base text-white font-bold mb-1">
              Favourites:
            </Text>
            <View className="flex-row flex-wrap">
              {favourites.length === 0 ? (
                <Text className="text-white">None</Text>
              ) : (
                favourites.map((favourite) => (
                  <Link
                    key={favourite}
                    href={`/pokemonDetails/${favourite}`}
                    className="text-white mr-2 mb-1 px-2 py-1 bg-primary rounded"
                  >
                    {favourite}
                  </Link>
                ))
              )}
            </View>
          </View>
        </View>
      ) : (
        <View className="w-full bg-secondary rounded-xl py-4 px-6 shadow-md shadow-primary flex-row items-center justify-center">
          <Text className="text-lg text-white font-bold">Loading...</Text>
        </View>
      )}
    </View>
  );
}
