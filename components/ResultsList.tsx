import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Text, View } from "react-native";

type ResultsListProps = {
  results: PokemonData[];
};

const resultsList = ({ results }: ResultsListProps) => {
  return (
    <View>
      {results.map((pokemon) => (
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
        </View>
      ))}
    </View>
  );
};
export default resultsList;
