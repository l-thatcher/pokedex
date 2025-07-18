import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
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
  const isFavourite = pokemonDetails
    ? favourites.includes(pokemonDetails.name)
    : false;

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
          <Text>Species: {pokemonDetails.species.name}</Text>
          <Text>
            Base Stats:{" "}
            {pokemonDetails.stats.map((stat) => (
              <Text key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </Text>
            ))}
          </Text>
          <Image
            source={{ uri: pokemonDetails.sprites.front_default }}
            alt={`${pokemonDetails.name} sprite`}
            style={{ width: 100, height: 100 }}
          />
          <Text>Number of games: {pokemonDetails.game_indices.length}</Text>

          <Text
            onPress={() => dispatch(toggleFavourite(pokemonDetails.name))}
            style={{ color: isFavourite ? "green" : "red" }}
          >
            favourite
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
