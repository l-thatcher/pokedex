import { PokemonData } from "@/interfaces/pokemon_interfaces"; // adjust path as needed
import { Text, View } from "react-native";

type ResultsListProps = {
  results: PokemonData;
};

const resultsList = ({ results }: ResultsListProps) => {
  return (
    <View>
      <Text>{results.name}</Text>
      <Text>{results.weight}</Text>
      <Text>{results.height}</Text>
    </View>
  );
};
export default resultsList;
