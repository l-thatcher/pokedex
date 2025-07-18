import { PokemonData } from '@/interfaces/pokemon_interfaces';

export async function fetchPokemonDetailsAPI(name: string): Promise<PokemonData> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
}