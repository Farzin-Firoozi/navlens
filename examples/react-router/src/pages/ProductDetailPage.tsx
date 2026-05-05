import { useParams, useNavigate } from 'react-router-dom'
import { getPreviousPath } from 'navlens'
import { products } from '../data'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)

  function handleBack() {
    const prev = getPreviousPath()
    if (prev) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  if (!product) {
    return <main><p>Product not found.</p></main>
  }

  return (
    <main>
      <button onClick={handleBack}>← Back</button>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </main>
  )
}
