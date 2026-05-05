'use client'

import { useRouter } from 'next/navigation'
import { getPreviousPath } from 'navlens'
import { products } from '../../data'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = products.find((p) => p.id === params.id)

  function handleBack() {
    const prev = getPreviousPath()
    if (prev) {
      router.back()
    } else {
      router.push('/')
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
