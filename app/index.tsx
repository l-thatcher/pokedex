import { Button } from "react-native";

async function fetchPokemon() {
  // Pokemon name that you can change here
  const pokemonName = "snorlax";

  const response = await fetch(`/pokemon_search?name=${pokemonName}`);
  const data = await response.json();
  alert(data.name); // Display the Pokemon's name from the individual Pokemon data
}

export default function App() {
  return <Button onPress={() => fetchPokemon()} title="Fetch Pokemon" />;
}
