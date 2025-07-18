import { fetchPokemonDetailsAPI } from "@/app/api/pokemonDetailsAPI";
import { PokemonData } from "@/interfaces/pokemon_interfaces";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface FavouriteTileProps {
  name: string;
}

const FavouriteTile = ({ name }: FavouriteTileProps) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonData | null>(
    null
  );

  useEffect(() => {
    if (name) {
      fetchPokemonDetailsAPI(name).then(setPokemonDetails);
    }
  }, [name]);

  return pokemonDetails ? (
    <Link href={`/pokemonDetails/${name}`} asChild>
      <TouchableOpacity
        className="bg-[#232323] rounded-md m-1 flex-1 items-center p-4"
        style={{ minWidth: 140, maxWidth: "48%" }}
      >
        <Image
          source={{ uri: pokemonDetails.sprites.front_default }}
          alt={`${pokemonDetails.name} sprite`}
          style={{ width: 80, height: 80 }}
          resizeMode="contain"
        />
        <Text className="text-white text-lg mt-2 capitalize">{name}</Text>
      </TouchableOpacity>
    </Link>
  ) : (
    <View
      className="bg-[#232323] rounded-md m-1 flex-1 items-center p-4"
      style={{ minWidth: 140, maxWidth: "48%" }}
    >
      <Text className="text-white text-lg mt-2 capitalize">Loading...</Text>
    </View>
  );
};

export default FavouriteTile;
