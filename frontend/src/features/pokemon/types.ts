export type PokemonType = 
  | 'fire' 
  | 'water' 
  | 'grass' 
  | 'electric' 
  | 'ice' 
  | 'fighting' 
  | 'poison' 
  | 'ground' 
  | 'flying' 
  | 'psychic' 
  | 'bug' 
  | 'rock' 
  | 'ghost' 
  | 'dragon' 
  | 'dark' 
  | 'steel' 
  | 'fairy' 
  | 'normal'

export interface Pokemon {
  id: string
  name: string
  type: PokemonType
  level: number
  hp: number
  pokedexNumber: number
  imageUrl?: string
}

export interface CreatePokemonDTO {
  name: string
  type: PokemonType
  level: number
  hp: number
  pokedexNumber: number
}

export interface UpdatePokemonDTO extends Partial<CreatePokemonDTO> {
  id: string
}

export const pokemonTypeColors: Record<PokemonType, { bg: string; text: string; gradient: string }> = {
  fire: { bg: 'bg-orange-500', text: 'text-orange-500', gradient: 'from-orange-400 to-red-500' },
  water: { bg: 'bg-blue-500', text: 'text-blue-500', gradient: 'from-blue-400 to-cyan-500' },
  grass: { bg: 'bg-green-500', text: 'text-green-500', gradient: 'from-green-400 to-emerald-500' },
  electric: { bg: 'bg-yellow-400', text: 'text-yellow-500', gradient: 'from-yellow-300 to-amber-500' },
  ice: { bg: 'bg-cyan-400', text: 'text-cyan-500', gradient: 'from-cyan-300 to-blue-400' },
  fighting: { bg: 'bg-red-700', text: 'text-red-700', gradient: 'from-red-600 to-orange-700' },
  poison: { bg: 'bg-purple-500', text: 'text-purple-500', gradient: 'from-purple-400 to-fuchsia-500' },
  ground: { bg: 'bg-amber-600', text: 'text-amber-600', gradient: 'from-amber-500 to-yellow-700' },
  flying: { bg: 'bg-indigo-400', text: 'text-indigo-400', gradient: 'from-indigo-300 to-sky-400' },
  psychic: { bg: 'bg-pink-500', text: 'text-pink-500', gradient: 'from-pink-400 to-rose-500' },
  bug: { bg: 'bg-lime-500', text: 'text-lime-500', gradient: 'from-lime-400 to-green-500' },
  rock: { bg: 'bg-stone-500', text: 'text-stone-500', gradient: 'from-stone-400 to-amber-600' },
  ghost: { bg: 'bg-violet-600', text: 'text-violet-600', gradient: 'from-violet-500 to-purple-700' },
  dragon: { bg: 'bg-indigo-600', text: 'text-indigo-600', gradient: 'from-indigo-500 to-violet-600' },
  dark: { bg: 'bg-zinc-700', text: 'text-zinc-700', gradient: 'from-zinc-600 to-slate-800' },
  steel: { bg: 'bg-slate-400', text: 'text-slate-400', gradient: 'from-slate-300 to-zinc-500' },
  fairy: { bg: 'bg-pink-400', text: 'text-pink-400', gradient: 'from-pink-300 to-rose-400' },
  normal: { bg: 'bg-gray-400', text: 'text-gray-400', gradient: 'from-gray-300 to-slate-400' },
}
