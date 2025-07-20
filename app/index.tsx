import FavouriteTile from "@/components/FavouriteTile";
import ResultsTile from "@/components/ResultsTile";
import SearchBar from "@/components/SearchBar";
import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "./hooks";
import { selectRecents } from "./slices/recentsSlice";

export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonData[] | null>(null);

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
        <FlatList
          className="w-full mt-2"
          data={pokemonData}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <ResultsTile name={item.name} />}
        />
      ) : (
        <View className="flex-1 items-center mt-4">
          <Text className="text-white text-lg font-semibold mb-2">
            Recently Viewed Pokémon
          </Text>
          <FlatList
            data={recents}
            keyExtractor={(item) => item}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => <FavouriteTile name={item} />}
            className="w-full"
          />
        </View>
      )}
    </View>
  );
}
