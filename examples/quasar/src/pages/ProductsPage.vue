<script setup lang="ts">
import { products } from '../data'
</script>

<template>
  <q-page padding>
    <router-link to="/">← Home</router-link>
    <h1>Products</h1>
    <q-list>
      <q-item
        v-for="p in products"
        :key="p.id"
        clickable
        :to="`/products/${p.id}`"
      >
        <q-item-section>{{ p.name }} — ${{ p.price }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>
