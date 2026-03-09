'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/src/components/DashboardLayout'
import { PokemonGrid } from '@/src/features/pokemon/components/PokemonGrid'

export default function PokemonsPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Pokémons</h1>
          <p className="text-muted-foreground mt-1">
            Adicione, edite ou remova Pokémons da Pokédex
          </p>
        </div>

        <PokemonGrid />
      </motion.div>
    </DashboardLayout>
  )
}
