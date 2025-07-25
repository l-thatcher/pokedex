import FavouriteTile from "@/components/FavouriteTile";
import ResultsTile from "@/components/ResultsTile";
import SearchBar from "@/components/SearchBar";
import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "./hooks";
import { clearRecents, selectRecents } from "./slices/recentsSlice";

export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonData[] | null>(null);

  const dispatch = useAppDispatch();
  const pokemon = useAppSelector((state) => state.pokemon.all);
  const recents = useAppSelector(selectRecents);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (pokemonName.trim()) {
        const filtered = pokemon.results.filter((p) =>
          p.name.toLowerCase().includes(pokemonName.toLowerCase())
        );
        setPokemonData(filtered);
      } else {
        setPokemonData(null);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [pokemonName, pokemon]);

  return (
    <View className="flex-1 pt-20 px-6 rounded-md bg-[#131313]">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white text-2xl font-bold">Pokédex</Text>
        <Link href="/favourites" asChild>
          <TouchableOpacity className="bg-secondary px-4 py-2 rounded-md">
            <Text className="text-white font-semibold">Favourites</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <SearchBar
        placeholder="Search for a pokemon"
        value={pokemonName}
        onChangeText={(text: string) => setPokemonName(text)}
      />

      {pokemonData ? (
        pokemonData.length > 0 ? (
          <FlatList
            data={pokemonData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <ResultsTile name={item.name} />}
            className="mt-4"
          />
        ) : (
          <Text className="text-white mt-4">No Pokémon found</Text>
        )
      ) : (
        <View className="flex-1 items-center mt-4">
          <View className="w-full flex-row justify-between">
            <Text className="text-white text-lg font-semibold mb-2">
              Recently Viewed Pokémon:
            </Text>
            <Text
              className="text-white text-sm font-semibold mb-2"
              onPress={() => dispatch(clearRecents())}
            >
              Clear
            </Text>
          </View>
          {recents.length === 0 ? (
            <View className="w-full h-full items-center justify-center">
              <Text className="text-white">No recently viewed Pokémon</Text>
            </View>
          ) : (
            <FlatList
              data={recents}
              keyExtractor={(item) => item}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item }) => <FavouriteTile name={item} />}
              className="w-full"
            />
          )}
        </View>
      )}
    </View>
  );
}
