'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from '@/src/components/DashboardLayout'
import { StatsCards } from '@/src/components/StatsCards'
import { PokemonGrid } from '@/src/features/pokemon/components/PokemonGrid'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao Centro Pokémon Manager
          </p>
        </div>

        <StatsCards />
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Pokédex Administrativa</h2>
          <PokemonGrid />
        </div>
      </motion.div>
    </DashboardLayout>
  )
}
