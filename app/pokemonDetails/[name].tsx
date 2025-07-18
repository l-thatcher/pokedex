import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { fetchPokemonDetailsAPI } from "../api/pokemonDetailsAPI";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectFavourites, toggleFavourite } from "../slices/favouritesSlice";

export default function DetailsScreen() {
  const { name } = useLocalSearchParams();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonData | null>(
    null
  );
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectFavourites);

  useEffect(() => {
    if (name) {
      fetchPokemonDetailsAPI(name as string).then(setPokemonDetails);
    }
  }, [name]);

  return (
    <View>
      <Text>Details of pokemon {name}</Text>
      {pokemonDetails ? (
        <View>
          <Text>Name: {pokemonDetails.name}</Text>
          <Text>Height: {pokemonDetails.height}</Text>
          <Text>Weight: {pokemonDetails.weight}</Text>
          <Text>Base Experience: {pokemonDetails.base_experience}</Text>
          <Text>Abilities:</Text>
          {pokemonDetails.abilities.map((ability) => (
            <Text key={ability.ability.name}>{ability.ability.name}</Text>
          ))}

          <Text onPress={() => dispatch(toggleFavourite(pokemonDetails.name))}>
            Add to favourites
          </Text>

          <Text>Favourites:</Text>
          {favourites.map((favourite) => (
            <Text key={favourite}>{favourite}</Text>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
