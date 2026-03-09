'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import type { Pokemon } from '../types'
import { Button } from '@/components/ui/button'

interface DeleteConfirmModalProps {
  pokemon: Pokemon | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmModal({ pokemon, isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!pokemon) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-sm bg-card rounded-2xl shadow-2xl overflow-hidden p-6">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4"
                >
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </motion.div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  Excluir Pokémon?
                </h3>

                <p className="text-muted-foreground mb-6">
                  Tem certeza que deseja excluir <strong className="text-foreground capitalize">{pokemon.name}</strong>? Esta ação não pode ser desfeita.
                </p>

                {pokemon.imageUrl && (
                  <motion.img
                    src={pokemon.imageUrl}
                    alt={pokemon.name}
                    className="w-20 h-20 object-contain mb-6 opacity-50"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                <div className="flex gap-3 w-full">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={onConfirm}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
