'use client'

import { create } from 'zustand'
import type { User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: async (email: string, _password: string) => {
    // Simulando autenticação
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0],
      email,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email
    }
    
    set({
      user: mockUser,
      token: 'mock-jwt-token',
      isAuthenticated: true
    })
    
    return true
  },
  
  register: async (name: string, email: string, _password: string) => {
    // Simulando registro
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email
    }
    
    set({
      user: mockUser,
      token: 'mock-jwt-token',
      isAuthenticated: true
    })
    
    return true
  },
  
  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false
    })
  }
}))
