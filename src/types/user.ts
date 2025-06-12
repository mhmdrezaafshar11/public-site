export interface User {
    _id: string
    name: string
    email: string
    phone?: string
    avatar?: string
    role: 'user' | 'admin'
    addresses?: Address[]
    wishlist?: string[]
    isEmailVerified: boolean
    createdAt: string
    updatedAt: string
  }
  
  export interface Address {
    _id?: string
    title: string
    fullName: string
    phone: string
    province: string
    city: string
    address: string
    postalCode: string
    isDefault: boolean
  }