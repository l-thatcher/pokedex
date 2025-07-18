import { fetchPokemonDetailsAPI } from "@/app/api/pokemonDetailsAPI";
import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ResultsTileProps {
  name: string;
}

const ResultsTile = ({ name }: ResultsTileProps) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonData | null>(
    null
  );

  useEffect(() => {
    if (name) {
      fetchPokemonDetailsAPI(name as string).then(setPokemonDetails);
    }
  }, [name]);

  return pokemonDetails ? (
    <Link href={`/pokemonDetails/${name}`} asChild>
      <TouchableOpacity className="w-full bg-secondary rounded-xl py-2 px-2 my-1 shadow-md shadow-primary flex-row items-center">
        <Image
          source={{ uri: pokemonDetails.sprites.front_default }}
          alt={`${pokemonDetails.name} sprite`}
          style={{ width: 50, height: 50 }}
        />
        <Text className="text-lg text-white font-bold flex-1">{name}</Text>
      </TouchableOpacity>
    </Link>
  ) : (
    <View className="w-full bg-secondary rounded-xl py-4 px-6 mb-3 shadow-md shadow-primary flex-row items-center">
      <Text className="text-lg text-white font-bold">Loading...</Text>
    </View>
  );
};

export default ResultsTile;
