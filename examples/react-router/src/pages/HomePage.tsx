import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <main>
      <h1>NavLens — React Router Demo</h1>
      <p>Navigate to products to see history tracking in action.</p>
      <Link to="/products">Browse Products</Link>
    </main>
  )
}
