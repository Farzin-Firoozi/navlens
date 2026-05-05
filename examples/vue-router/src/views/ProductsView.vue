<script setup lang="ts">
import { products } from '../data'
</script>

<template>
  <main>
    <RouterLink to="/">← Home</RouterLink>
    <h1>Products</h1>
    <ul>
      <li v-for="p in products" :key="p.id">
        <RouterLink :to="`/products/${p.id}`">
          {{ p.name }} — ${{ p.price }}
        </RouterLink>
      </li>
    </ul>
  </main>
</template>
