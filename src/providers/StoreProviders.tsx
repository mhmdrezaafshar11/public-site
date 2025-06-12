'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuthStore()
  const { loadCart } = useCartStore()

  useEffect(() => {
    // Check authentication status on app load
    checkAuth()
    
    // Load cart from localStorage
    loadCart()
  }, [])

  return <>{children}</>
}