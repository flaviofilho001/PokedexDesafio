'use client'

import { motion } from 'framer-motion'
import { Boxes, TrendingUp, Flame, Droplets, Leaf, Zap } from 'lucide-react'
import { useMemo } from 'react'
import { usePokemonStore } from '@/src/features/pokemon/hooks/usePokemonStore'
import type { PokemonType } from '@/src/features/pokemon/types'
import { pokemonTypeColors } from '@/src/features/pokemon/types'

const typeIcons: Partial<Record<PokemonType, React.ElementType>> = {
  fire: Flame,
  water: Droplets,
  grass: Leaf,
  electric: Zap,
}

export function StatsCards() {
  const { pokemons } = usePokemonStore()

  const stats = useMemo(() => {
    const total = pokemons.length
    const avgLevel = total > 0 ? Math.round(pokemons.reduce((sum, p) => sum + p.level, 0) / total) : 0
    
    // Contar tipos
    const typeCounts = pokemons.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Pegar os 3 tipos mais comuns
    const topTypes = Object.entries(typeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type, count]) => ({ type: type as PokemonType, count }))

    return { total, avgLevel, topTypes }
  }, [pokemons])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {/* Total de Pokémons */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="bg-card border border-border rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Boxes className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total de Pokémons</p>
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
          </div>
        </div>
      </motion.div>

      {/* Média de Nível */}
      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        className="bg-card border border-border rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Nível Médio</p>
            <p className="text-3xl font-bold text-foreground">{stats.avgLevel}</p>
          </div>
        </div>
      </motion.div>

      {/* Tipos Mais Comuns */}
      {stats.topTypes.slice(0, 2).map((typeData, index) => {
        const IconComponent = typeIcons[typeData.type] || Flame
        const colors = pokemonTypeColors[typeData.type]
        
        return (
          <motion.div
            key={typeData.type}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {index === 0 ? 'Tipo Mais Comum' : '2º Tipo Mais Comum'}
                </p>
                <p className="text-xl font-bold text-foreground capitalize">{typeData.type}</p>
                <p className="text-xs text-muted-foreground">{typeData.count} Pokémon{typeData.count !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
