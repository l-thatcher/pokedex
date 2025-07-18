import { PokemonArray } from '@/interfaces/pokemon_interfaces';

export async function fetchAllPokemonAPI(): Promise<PokemonArray> {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  return response.json();
}