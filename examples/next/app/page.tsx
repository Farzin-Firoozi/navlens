import Link from 'next/link'

export default function HomePage() {
  return (
    <main>
      <h1>NavLens — Next.js Demo</h1>
      <p>Navigate to products to see history tracking in action.</p>
      <Link href="/products">Browse Products</Link>
    </main>
  )
}
