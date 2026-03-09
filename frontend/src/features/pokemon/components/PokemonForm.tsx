'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Pokemon, PokemonType } from '../types'
import { pokemonTypeColors } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const pokemonSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  level: z.coerce.number().min(1, 'Nível mínimo é 1').max(100, 'Nível máximo é 100'),
  hp: z.coerce.number().min(1, 'HP mínimo é 1').max(999, 'HP máximo é 999'),
  pokedexNumber: z.coerce.number().min(1, 'Número mínimo é 1').max(1010, 'Número máximo é 1010'),
})

type PokemonFormData = z.infer<typeof pokemonSchema>

interface PokemonFormProps {
  pokemon?: Pokemon | null
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PokemonFormData) => void
}

const pokemonTypes: PokemonType[] = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
]

export function PokemonForm({ pokemon, isOpen, onClose, onSubmit }: PokemonFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<PokemonFormData>({
    resolver: zodResolver(pokemonSchema),
    defaultValues: {
      name: pokemon?.name || '',
      type: pokemon?.type || '',
      level: pokemon?.level || 1,
      hp: pokemon?.hp || 50,
      pokedexNumber: pokemon?.pokedexNumber || 1,
    }
  })

  const selectedType = watch('type') as PokemonType
  const pokedexNumber = watch('pokedexNumber')

  const handleFormSubmit = (data: PokemonFormData) => {
    onSubmit(data)
    reset()
    onClose()
  }

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
            <div className="relative w-full max-w-lg bg-card rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className={`relative p-6 ${selectedType ? `bg-gradient-to-br ${pokemonTypeColors[selectedType]?.gradient || ''}` : 'bg-gradient-to-br from-red-500 to-orange-500'}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </Button>

                <h2 className="text-2xl font-bold text-white">
                  {pokemon ? 'Editar Pokémon' : 'Criar Pokémon'}
                </h2>
                <p className="text-white/80 text-sm mt-1">
                  {pokemon ? 'Atualize os dados do Pokémon' : 'Adicione um novo Pokémon à Pokédex'}
                </p>

                {/* Preview Image */}
                {pokedexNumber && (
                  <motion.div
                    className="absolute -bottom-12 right-6"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={pokedexNumber}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedexNumber}.png`}
                      alt="Pokemon Preview"
                      className="w-24 h-24 object-contain drop-shadow-lg"
                    />
                  </motion.div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 pt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Pokémon</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Pikachu"
                    {...register('name')}
                    className="h-11"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={selectedType}
                    onValueChange={(value) => setValue('type', value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
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
                  {errors.type && (
                    <p className="text-sm text-destructive">{errors.type.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Nível</Label>
                    <Input
                      id="level"
                      type="number"
                      min={1}
                      max={100}
                      {...register('level')}
                      className="h-11"
                    />
                    {errors.level && (
                      <p className="text-sm text-destructive">{errors.level.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hp">HP</Label>
                    <Input
                      id="hp"
                      type="number"
                      min={1}
                      max={999}
                      {...register('hp')}
                      className="h-11"
                    />
                    {errors.hp && (
                      <p className="text-sm text-destructive">{errors.hp.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pokedexNumber">Nº Pokédex</Label>
                    <Input
                      id="pokedexNumber"
                      type="number"
                      min={1}
                      max={1010}
                      {...register('pokedexNumber')}
                      className="h-11"
                    />
                    {errors.pokedexNumber && (
                      <p className="text-sm text-destructive">{errors.pokedexNumber.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Salvando...' : pokemon ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
