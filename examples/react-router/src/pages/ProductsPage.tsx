import { Link } from 'react-router-dom'
import { products } from '../data'

export default function ProductsPage() {
  return (
    <main>
      <Link to="/">← Home</Link>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/products/${p.id}`}>
              {p.name} — ${p.price}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
