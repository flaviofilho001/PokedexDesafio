'use client'

import { create } from 'zustand'
import type { Pokemon, CreatePokemonDTO, UpdatePokemonDTO } from '../types'

interface PokemonState {
  pokemons: Pokemon[]
  selectedPokemon: Pokemon | null
  isLoading: boolean
  searchTerm: string
  typeFilter: string | null
  setPokemons: (pokemons: Pokemon[]) => void
  addPokemon: (pokemon: CreatePokemonDTO) => void
  updatePokemon: (data: UpdatePokemonDTO) => void
  deletePokemon: (id: string) => void
  selectPokemon: (pokemon: Pokemon | null) => void
  setSearchTerm: (term: string) => void
  setTypeFilter: (type: string | null) => void
}

// Dados mockados para demonstração
const mockPokemons: Pokemon[] = [
  { id: '1', name: 'Pikachu', type: 'electric', level: 25, hp: 35, pokedexNumber: 25, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
  { id: '2', name: 'Charizard', type: 'fire', level: 50, hp: 78, pokedexNumber: 6, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
  { id: '3', name: 'Blastoise', type: 'water', level: 45, hp: 79, pokedexNumber: 9, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png' },
  { id: '4', name: 'Venusaur', type: 'grass', level: 48, hp: 80, pokedexNumber: 3, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png' },
  { id: '5', name: 'Gengar', type: 'ghost', level: 40, hp: 60, pokedexNumber: 94, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
  { id: '6', name: 'Dragonite', type: 'dragon', level: 55, hp: 91, pokedexNumber: 149, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png' },
  { id: '7', name: 'Alakazam', type: 'psychic', level: 42, hp: 55, pokedexNumber: 65, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png' },
  { id: '8', name: 'Machamp', type: 'fighting', level: 38, hp: 90, pokedexNumber: 68, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png' },
]

export const usePokemonStore = create<PokemonState>((set) => ({
  pokemons: mockPokemons,
  selectedPokemon: null,
  isLoading: false,
  searchTerm: '',
  typeFilter: null,
  
  setPokemons: (pokemons) => set({ pokemons }),
  
  addPokemon: (pokemonData) => set((state) => {
    const newPokemon: Pokemon = {
      ...pokemonData,
      id: Date.now().toString(),
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.pokedexNumber}.png`
    }
    return { pokemons: [...state.pokemons, newPokemon] }
  }),
  
  updatePokemon: (data) => set((state) => ({
    pokemons: state.pokemons.map((p) => 
      p.id === data.id ? { ...p, ...data, imageUrl: data.pokedexNumber ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.pokedexNumber}.png` : p.imageUrl } : p
    )
  })),
  
  deletePokemon: (id) => set((state) => ({
    pokemons: state.pokemons.filter((p) => p.id !== id)
  })),
  
  selectPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  
  setTypeFilter: (type) => set({ typeFilter: type }),
}))
