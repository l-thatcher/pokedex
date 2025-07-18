import ResultsTile from "@/components/ResultsTile";
import SearchBar from "@/components/SearchBar";
import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "./hooks";
import { selectFavourites } from "./slices/favouritesSlice";
import { fetchAllPokemon } from "./slices/pokemonAPISlice";

export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonData[] | null>(null);

  const pokemon = useAppSelector((state) => state.pokemon.all);
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, [dispatch]);

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
        <View className="flex-1 justify-center items-center">
          <Text className="text-white w-3/4 text-center">
            No Pokemon data to show, use the search bar to look one up!
          </Text>
        </View>
      )}
    </View>
  );
}
