export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}
