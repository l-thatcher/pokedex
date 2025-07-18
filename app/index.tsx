import ResultsList from "@/components/ResultsList";
import SearchBar from "@/components/SearchBar";
import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

async function fetchPokemon(pokemonName: string) {
  const response = await fetch(`/pokemon_search?name=${pokemonName}`);
  const data = await response.json();
  return data;
}

export default function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (pokemonName.trim()) {
        const data = await fetchPokemon(pokemonName);

        console.log(JSON.stringify(data)); // Log the data for debugging purposes
        if (data) {
          setPokemonData(data);
        }
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [pokemonName]);

  return (
    <View className="flex-1 mt-5">
      <SearchBar
        placeholder="Search for a pokemon"
        value={pokemonName}
        onChangeText={(text: string) => setPokemonName(text)}
      />

      {pokemonData ? (
        <>
          <ResultsList results={pokemonData} />
        </>
      ) : (
        <Text className="text-white mt-5">No Pokemon data found</Text>
      )}
    </View>
  );
}
