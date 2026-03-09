'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Heart, Hash, Swords } from 'lucide-react'
import type { Pokemon } from '../types'
import { pokemonTypeColors } from '../types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface PokemonExpandedCardProps {
  pokemon: Pokemon | null
  onClose: () => void
}

export function PokemonExpandedCard({ pokemon, onClose }: PokemonExpandedCardProps) {
  if (!pokemon) return null
  
  const typeColors = pokemonTypeColors[pokemon.type]

  return (
    <AnimatePresence>
      {pokemon && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Card Expandido */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div 
              className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header com gradiente */}
              <div className={`relative h-48 bg-gradient-to-br ${typeColors.gradient}`}>
                {/* Pokeball Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="2" />
                    <line x1="5" y1="50" x2="35" y2="50" stroke="white" strokeWidth="2" />
                    <line x1="65" y1="50" x2="95" y2="50" stroke="white" strokeWidth="2" />
                  </svg>
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Pokedex Number */}
                <span className="absolute top-4 left-4 text-white/80 font-mono text-lg font-bold">
                  #{String(pokemon.pokedexNumber).padStart(3, '0')}
                </span>

                {/* Pokemon Image com animação pulsante */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${typeColors.gradient} blur-2xl opacity-50 scale-110`} />
                    
                    {pokemon.imageUrl ? (
                      <img
                        src={pokemon.imageUrl}
                        alt={pokemon.name}
                        className="relative w-48 h-48 object-contain drop-shadow-2xl"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-muted rounded-full flex items-center justify-center">
                        <span className="text-muted-foreground">Sem imagem</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-20 pb-6 px-6">
                {/* Name and Type */}
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-foreground capitalize mb-2">
                    {pokemon.name}
                  </h2>
                  <Badge className={`${typeColors.bg} text-white capitalize text-sm px-4 py-1`}>
                    {pokemon.type}
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-muted/50 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Nível</p>
                      <p className="text-xl font-bold text-foreground">{pokemon.level}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-muted/50 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">HP</p>
                      <p className="text-xl font-bold text-foreground">{pokemon.hp}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-muted/50 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Hash className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pokédex</p>
                      <p className="text-xl font-bold text-foreground">#{pokemon.pokedexNumber}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-muted/50 rounded-xl p-4 flex items-center gap-3"
                  >
                    <div className={`w-10 h-10 rounded-full ${typeColors.bg}/20 flex items-center justify-center`}>
                      <Swords className={`w-5 h-5 ${typeColors.text}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tipo</p>
                      <p className="text-xl font-bold text-foreground capitalize">{pokemon.type}</p>
                    </div>
                  </motion.div>
                </div>

                {/* HP Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Pontos de Vida</span>
                    <span className="font-bold text-foreground">{pokemon.hp}/150</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((pokemon.hp / 150) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
