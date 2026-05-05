<script setup lang="ts">
import { products } from '../../data'
</script>

<template>
  <main>
    <NuxtLink to="/">← Home</NuxtLink>
    <h1>Products</h1>
    <ul>
      <li v-for="p in products" :key="p.id">
        <NuxtLink :to="`/products/${p.id}`">
          {{ p.name }} — ${{ p.price }}
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>
