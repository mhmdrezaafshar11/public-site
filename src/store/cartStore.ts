import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/product'

export interface CartItem {
  id: string
  product: Product
  quantity: number
  size?: string
  color?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  totalItems: number
  totalPrice: number
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  loadCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      totalItems: 0,
      totalPrice: 0,

      // Add item to cart
      addItem: (product: Product, quantity = 1, size?: string, color?: string) => {
        const { items } = get()
        const itemId = `${product._id}-${size || 'default'}-${color || 'default'}`
        
        const existingItem = items.find(item => item.id === itemId)

        if (existingItem) {
          // Update quantity if item exists
          set(state => ({
            items: state.items.map(item =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          }))
        } else {
          // Add new item
          const newItem: CartItem = {
            id: itemId,
            product,
            quantity,
            size,
            color
          }
          
          set(state => ({
            items: [...state.items, newItem]
          }))
        }

        // Recalculate totals
        get().calculateTotals()
      },

      // Remove item from cart
      removeItem: (itemId: string) => {
        set(state => ({
          items: state.items.filter(item => item.id !== itemId)
        }))
        get().calculateTotals()
      },

      // Update item quantity
      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set(state => ({
          items: state.items.map(item =>
            item.id === itemId
              ? { ...item, quantity }
              : item
          )
        }))
        get().calculateTotals()
      },

      // Clear entire cart
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        })
      },

      // Toggle cart drawer
      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }))
      },

      // Load cart (for initialization)
      loadCart: () => {
        get().calculateTotals()
      },

      // Calculate totals (not exposed, internal use)
      calculateTotals: () => {
        const { items } = get()
        
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = items.reduce((sum, item) => {
          const price = item.product.salePrice || item.product.price
          return sum + (price * item.quantity)
        }, 0)

        set({ totalItems, totalPrice })
      }
    } as any),
    {
      name: 'cart-storage',
      partialize: (state) => ({ 
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice
      })
    }
  )
)