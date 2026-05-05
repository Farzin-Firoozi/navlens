<script lang="ts">
  import { products } from '$lib/data'
</script>

<main>
  <a href="/">← Home</a>
  <h1>Products</h1>
  <ul>
    {#each products as p}
      <li><a href="/products/{p.id}">{p.name} — ${p.price}</a></li>
    {/each}
  </ul>
</main>
