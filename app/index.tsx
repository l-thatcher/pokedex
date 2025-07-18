import ResultsList from "@/components/ResultsList";
import SearchBar from "@/components/SearchBar";
import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
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
        <Text>No Pokemon data found</Text>
      )}
      <Text>POKEMON:</Text>
      {pokemon.results.map((p) => (
        <Link
          key={p.name}
          href={{
            pathname: "/pokemonDetails/[name]",
            params: { name: p.name },
          }}
        >
          <Text>{p.name}</Text>
        </Link>
      ))}
      <Text>Favourites:</Text>
      {favourites.map((favourite) => (
        <Text key={favourite}>{favourite}</Text>
      ))}
    </View>
  );
}
