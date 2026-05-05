<script lang="ts">
  import { goto } from '$app/navigation'
  import { getPreviousPath } from 'navlens'
  import { products } from '$lib/data'
  import { page } from '$app/stores'

  $: product = products.find((p) => p.id === $page.params.id)

  function handleBack() {
    const prev = getPreviousPath()
    if (prev) {
      history.back()
    } else {
      goto('/')
    }
  }
</script>

<main>
  <button on:click={handleBack}>← Back</button>
  {#if product}
    <h1>{product.name}</h1>
    <p>${product.price}</p>
    <p>{product.description}</p>
  {:else}
    <p>Product not found.</p>
  {/if}
</main>
