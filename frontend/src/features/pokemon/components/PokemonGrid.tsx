'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Plus, Grid3X3, List } from 'lucide-react'
import { usePokemonStore } from '../hooks/usePokemonStore'
import { PokemonCard } from './PokemonCard'
import { PokemonExpandedCard } from './PokemonExpandedCard'
import { PokemonForm } from './PokemonForm'
import { DeleteConfirmModal } from './DeleteConfirmModal'
import type { Pokemon, PokemonType } from '../types'
import { pokemonTypeColors } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'

const pokemonTypes: PokemonType[] = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]

export function PokemonGrid() {
  const { pokemons, searchTerm, setSearchTerm, typeFilter, setTypeFilter, addPokemon, updatePokemon, deletePokemon } = usePokemonStore()
  
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null)
  const [deletingPokemon, setDeletingPokemon] = useState<Pokemon | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = !typeFilter || typeFilter === 'all' || pokemon.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [pokemons, searchTerm, typeFilter])

  const handleCreatePokemon = (data: Omit<Pokemon, 'id' | 'imageUrl'>) => {
    addPokemon(data)
    toast.success('Pokémon criado com sucesso!')
  }

  const handleUpdatePokemon = (data: Omit<Pokemon, 'id' | 'imageUrl'>) => {
    if (editingPokemon) {
      updatePokemon({ ...data, id: editingPokemon.id })
      setEditingPokemon(null)
      toast.success('Pokémon atualizado com sucesso!')
    }
  }

  const handleDeletePokemon = () => {
    if (deletingPokemon) {
      deletePokemon(deletingPokemon.id)
      setDeletingPokemon(null)
      toast.success('Pokémon excluído com sucesso!')
    }
  }

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon)
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-card border border-border rounded-xl p-4"
      >
        <div className="flex flex-1 gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Type Filter */}
          <Select value={typeFilter || 'all'} onValueChange={(value) => setTypeFilter(value === 'all' ? null : value)}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              {pokemonTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${pokemonTypeColors[type].bg}`} />
                    <span className="capitalize">{type}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Add Pokemon Button */}
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Pokémon
          </Button>
        </div>
      </motion.div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        {filteredPokemons.length} Pokémon{filteredPokemons.length !== 1 ? 's' : ''} encontrado{filteredPokemons.length !== 1 ? 's' : ''}
      </p>

      {/* Pokemon Grid */}
      <motion.div
        layout
        className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'flex flex-col gap-4'
        }
      >
        <AnimatePresence mode="popLayout">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onEdit={setEditingPokemon}
              onDelete={setDeletingPokemon}
              onClick={handleCardClick}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredPokemons.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhum Pokémon encontrado
          </h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar os filtros ou adicione um novo Pokémon
          </p>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Pokémon
          </Button>
        </motion.div>
      )}

      {/* Expanded Card Modal */}
      <PokemonExpandedCard
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />

      {/* Create/Edit Form Modal */}
      <PokemonForm
        pokemon={editingPokemon}
        isOpen={isFormOpen || !!editingPokemon}
        onClose={() => {
          setIsFormOpen(false)
          setEditingPokemon(null)
        }}
        onSubmit={editingPokemon ? handleUpdatePokemon : handleCreatePokemon}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        pokemon={deletingPokemon}
        isOpen={!!deletingPokemon}
        onClose={() => setDeletingPokemon(null)}
        onConfirm={handleDeletePokemon}
      />
    </div>
  )
}
