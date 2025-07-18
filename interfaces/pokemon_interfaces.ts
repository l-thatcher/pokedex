export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Ability {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface Cry {
  latest: string;
  legacy: string;
}

export interface Form extends NamedAPIResource {}

export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface HeldItemVersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

export interface HeldItem {
  item: NamedAPIResource;
  version_details: HeldItemVersionDetail[];
}

export interface MoveLearnMethod extends NamedAPIResource {}

export interface VersionGroup extends NamedAPIResource {}

export interface MoveVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  order: number | null;
  version_group: VersionGroup;
}

export interface Move {
  move: NamedAPIResource;
  version_group_details: MoveVersionGroupDetail[];
}

export interface PastAbility {
  abilities: {
    ability: NamedAPIResource | null;
    is_hidden: boolean;
    slot: number;
  }[];
  generation: NamedAPIResource;
}

export interface Species extends NamedAPIResource {}

export interface SpriteOther {
  dream_world: {
    front_default: string;
    front_female: string | null;
  };
  home: {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };
  "official-artwork": {
    front_default: string;
    front_shiny: string;
  };
  showdown: {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };
}

export interface SpriteVersions {
  [generation: string]: {
    [game: string]: any; // You can expand this for stricter typing if needed
  };
}

export interface Sprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: SpriteOther;
  versions: SpriteVersions;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface TypeSlot {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonData {
  abilities: Ability[];
  base_experience: number;
  cries: Cry;
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: PastAbility[];
  past_types: any[]; // Expand if needed
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: TypeSlot[];
  weight: number;
}

export interface PokemonArray {
  results: PokemonData[];
}