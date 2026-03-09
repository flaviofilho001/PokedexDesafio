'use client'

import { motion } from 'framer-motion'
import { Pencil, Trash2, Zap, Heart } from 'lucide-react'
import type { Pokemon } from '../types'
import { pokemonTypeColors } from '../types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PokemonCardProps {
  pokemon: Pokemon
  onEdit: (pokemon: Pokemon) => void
  onDelete: (pokemon: Pokemon) => void
  onClick: (pokemon: Pokemon) => void
}

export function PokemonCard({ pokemon, onEdit, onDelete, onClick }: PokemonCardProps) {
  const typeColors = pokemonTypeColors[pokemon.type]
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group cursor-pointer"
      onClick={() => onClick(pokemon)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${typeColors.gradient} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-xl`} />
      
      <div className="relative bg-card border border-border rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
            <line x1="5" y1="50" x2="30" y2="50" stroke="currentColor" strokeWidth="3" />
            <line x1="70" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" />
          </svg>
        </div>

        {/* Pokemon Image */}
        <div className="relative w-full aspect-square mb-4 flex items-center justify-center">
          <div className={`absolute inset-0 bg-gradient-to-br ${typeColors.gradient} opacity-10 rounded-xl`} />
          {pokemon.imageUrl ? (
            <motion.img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className="w-32 h-32 object-contain drop-shadow-lg z-10"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="w-32 h-32 bg-muted rounded-xl flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Pokedex Number */}
        <span className="absolute top-3 left-3 text-xs font-mono text-muted-foreground">
          #{String(pokemon.pokedexNumber).padStart(3, '0')}
        </span>

        {/* Pokemon Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground capitalize">{pokemon.name}</h3>
            <Badge className={`${typeColors.bg} text-white capitalize`}>
              {pokemon.type}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-muted-foreground">Nv. {pokemon.level}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-muted-foreground">HP {pokemon.hp}</span>
            </div>
          </div>

          {/* HP Bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((pokemon.hp / 150) * 100, 100)}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(pokemon)
            }}
          >
            <Pencil className="w-4 h-4 mr-1" />
            Editar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(pokemon)
            }}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Excluir
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
