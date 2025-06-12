export interface Product {
    _id: string
    name: string
    slug: string
    description: string
    price: number
    salePrice?: number
    images: string[]
    category: Category
    brand?: string
    inStock: boolean
    stockQuantity: number
    sizes?: string[]
    colors?: string[]
    features?: string[]
    tags?: string[]
    rating: number
    reviewCount: number
    isActive: boolean
    isFeatured: boolean
    createdAt: string
    updatedAt: string
  }
  
  export interface Category {
    _id: string
    name: string
    slug: string
    description?: string
    image?: string
    parent?: string
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  
  export interface ProductFilter {
    category?: string
    brand?: string
    minPrice?: number
    maxPrice?: number
    inStock?: boolean
    featured?: boolean
    search?: string
    sortBy?: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'rating' | 'popular'
    page?: number
    limit?: number
  }
  
  export interface ProductResponse {
    products: Product[]
    totalProducts: number
    totalPages: number
    currentPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }