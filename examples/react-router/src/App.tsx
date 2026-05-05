import { Routes, Route } from 'react-router-dom'
import { ReactNavigationTracker } from 'navlens'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'

export default function App() {
  return (
    <>
      <ReactNavigationTracker adapter="react-router" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  )
}
