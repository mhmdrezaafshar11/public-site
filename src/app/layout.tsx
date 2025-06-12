import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import StoreProvider from '@/providers/StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'فروشگاه آنلاین',
    template: '%s | فروشگاه آنلاین'
  },
  description: 'بهترین محصولات با قیمت مناسب و ارسال سریع',
  keywords: ['فروشگاه', 'خرید آنلاین', 'محصولات', 'ارسال سریع'],
  authors: [{ name: 'فروشگاه آنلاین' }],
  openGraph: {
    title: 'فروشگاه آنلاین',
    description: 'بهترین محصولات با قیمت مناسب',
    type: 'website',
    locale: 'fa_IR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <StoreProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </StoreProvider>
      </body>
    </html>
  )
}