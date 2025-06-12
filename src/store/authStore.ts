import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { User } from '@/types/user'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  checkAuth: () => Promise<void>
  updateProfile: (userData: Partial<User>) => Promise<{ success: boolean; message?: string }>
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Configure axios defaults
axios.defaults.baseURL = API_URL
axios.defaults.withCredentials = true

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      // Login
      login: async (email: string, password: string) => {
        try {
          set({ loading: true })
          const response = await axios.post('/auth/login', { email, password })
          const { user, token } = response.data

          // Set token in axios headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false
          })

          return { success: true }
        } catch (error: any) {
          set({ loading: false })
          return { 
            success: false, 
            message: error.response?.data?.message || 'خطا در ورود' 
          }
        }
      },

      // Register
      register: async (userData: RegisterData) => {
        try {
          set({ loading: true })
          const response = await axios.post('/auth/register', userData)
          const { user, token } = response.data

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false
          })

          return { success: true }
        } catch (error: any) {
          set({ loading: false })
          return { 
            success: false, 
            message: error.response?.data?.message || 'خطا در ثبت‌نام' 
          }
        }
      },

      // Logout
      logout: () => {
        delete axios.defaults.headers.common['Authorization']
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false
        })
        
        // Redirect to login if user or admin
        const currentPath = window.location.pathname
        if (currentPath.includes('/profile') || currentPath.includes('/dashboard')) {
          window.location.href = '/auth/login'
        }
      },

      // Check authentication
      checkAuth: async () => {
        const { token } = get()
        if (!token) return

        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const response = await axios.get('/auth/me')
          
          set({
            user: response.data.user,
            isAuthenticated: true
          })
        } catch (error) {
          // Token is invalid
          get().logout()
        }
      },

      // Update profile
      updateProfile: async (userData: Partial<User>) => {
        try {
          set({ loading: true })
          const response = await axios.put('/auth/profile', userData)
          
          set({
            user: response.data.user,
            loading: false
          })

          return { success: true }
        } catch (error: any) {
          set({ loading: false })
          return { 
            success: false, 
            message: error.response?.data?.message || 'خطا در بروزرسانی پروفایل' 
          }
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)