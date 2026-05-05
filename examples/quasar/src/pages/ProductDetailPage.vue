<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getPreviousPath } from 'navlens'
import { products } from '../data'

const route = useRoute()
const router = useRouter()
const product = products.find((p) => p.id === route.params.id)

function handleBack() {
  const prev = getPreviousPath()
  if (prev) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <q-page padding>
    <q-btn flat icon="arrow_back" label="Back" @click="handleBack" />
    <template v-if="product">
      <h1>{{ product.name }}</h1>
      <p>${{ product.price }}</p>
      <p>{{ product.description }}</p>
    </template>
    <p v-else>Product not found.</p>
  </q-page>
</template>
