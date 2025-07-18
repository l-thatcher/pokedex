import ResultsList from "@/components/ResultsList";
import SearchBar from "@/components/SearchBar";
import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
    <SafeAreaProvider>
      <View className="flex-1 bg-blue">
        <SearchBar
          placeholder="Search for a pokemon"
          value={pokemonName}
          onChangeText={(text: string) => setPokemonName(text)}
        />

        {pokemonData ? (
          <ResultsList results={pokemonData} />
        ) : (
          <Text>No Pokemon data found</Text>
        )}

        <Text>POKEMON:</Text>
        <FlatList
          data={pokemon.results}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Link
              key={item.name}
              href={{
                pathname: "/pokemonDetails/[name]",
                params: { name: item.name },
              }}
            >
              <Text>{item.name}</Text>
            </Link>
          )}
          style={{ maxHeight: 200 }} // adjust or remove as needed
        />

        <Text>Favourites:</Text>
        <FlatList
          data={favourites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </View>
    </SafeAreaProvider>
  );
}
