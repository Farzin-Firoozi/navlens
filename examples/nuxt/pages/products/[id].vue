<script setup lang="ts">
import { getPreviousPath } from 'navlens'
import { products } from '../../data'

const route = useRoute()
const router = useRouter()
const product = products.find((p) => p.id === route.params.id)

function handleBack() {
  const prev = getPreviousPath()
  if (prev) {
    router.back()
  } else {
    navigateTo('/')
  }
}
</script>

<template>
  <main>
    <button @click="handleBack">← Back</button>
    <template v-if="product">
      <h1>{{ product.name }}</h1>
      <p>${{ product.price }}</p>
      <p>{{ product.description }}</p>
    </template>
    <p v-else>Product not found.</p>
  </main>
</template>
