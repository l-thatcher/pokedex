import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link } from "expo-router";
import { Text, View } from "react-native";

type ResultsListProps = {
  results: PokemonData[];
};

const resultsList = ({ results }: ResultsListProps) => {
  return (
    <View>
      {results.map((pokemon) => (
        <View key={pokemon.name}>
          <Link
            key={pokemon.name}
            href={{
              pathname: "/pokemonDetails/[name]",
              params: { name: pokemon.name },
            }}
          >
            <Text>{pokemon.name}</Text>
          </Link>
        </View>
      ))}
    </View>
  );
};
export default resultsList;
